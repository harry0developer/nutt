import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { FeedbackProvider } from '../feedback/feedback';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { COLLECTION } from '../../utils/consts';
import { User } from '../../models/user';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class MediaProvider {

  someTextUrl;
  selectedPhoto;
  loading;
  currentImage;
  myPhotosRef;

  photoUrl: string;
  profile: User;

  constructor(
    private afStorage: AngularFireStorage,
    private feedbackProvider: FeedbackProvider,
    private authProvider: AuthProvider,
    public camera: Camera,
    private db: AngularFireDatabase) { 
      this.myPhotosRef =  this.db.list('images');
      this.profile = this.authProvider.getStoredUser();
  }
    

  takePhoto() {
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.PNG,
        saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then(imageData => {
      const photo = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
      this.uploadPhoto(photo, this.profile.uid);
      console.log('Photo url: ', imageData.DATA_URL);
      
    }).catch(err => {
      console.log(err);
    });
  }
  
  selectPhoto(){
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }
   this.camera.getPicture(options).then(imageData => {
      const photo = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
      this.uploadPhoto(photo, this.profile.uid);
      console.log('Photo url: ', imageData.DATA_URL);
      
    }).catch(err => {
      console.log(err);
    });
  }
 

  private dataURItoBlob(dataURI) {
    // codej adapted from:
    //  http://stackoverflow.com/questions/33486352/
    //cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };

  public uploadPhoto(photo, uid: string): void {
    const path: string = `photos/${uid}`;
    this.myPhotosRef.child(path)
      .putString(photo, 'base64', { contentType: 'image/png' })
      .then((uploadedImage) => {
        console.log("Uploaded.....: ", uploadedImage);
      });
  }

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
