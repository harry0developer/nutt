import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DataProvider } from '../data/data';
import { COLLECTION, EVENTS } from '../../utils/consts';

@Injectable()
export class ImageProvider {
  myPhoto: any[] = [];
  myPhotosRef: any;
  myPhotoURL: any;
 
  constructor(public camera: Camera, private dataProvider: DataProvider) {
    // this.myPhotosRef = this.dataProvider.getAllFromCollection('users').subscribe()

  }


  takePhoto(): Promise<any>  {
    return this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    });
  }
 
  selectPhoto(): Promise<any> {
    return this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    });
  }
 
  uploadImage(user, newImageData){ 
    this.dataProvider.addItemToUserDB(COLLECTION.images, user, newImageData);
  }
  
  // private uploadPhoto(photoUrl: string): void {
  //   this.myPhotosRef.child(this.generateUUID()).child(photoUrl)
  //     .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
  //     .then((savedPicture) => {
  //       this.myPhotoURL = savedPicture.downloadURL;
  //     });
  // }
 
  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}

