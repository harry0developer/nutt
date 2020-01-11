import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { SellerDetailsPage } from '../seller-details/seller-details';
import { COLLECTION, USER_TYPE } from '../../utils/consts';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { MediaProvider } from '../../providers/media/media';
 

@IonicPage()
@Component({
  selector: 'page-sellers',
  templateUrl: 'sellers.html',
})
export class SellersPage {
  sellers: any 
  profile: User;

  constructor(
    public navCtrl: NavController,
    public dataProvider: DataProvider,
    public authProvider: AuthProvider,
    public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    this.profile = this.authProvider.getStoredUser();
    this.dataProvider.getAllFromCollection(COLLECTION.users).subscribe(users => {
      this.sellers = users.filter(u => u.userType === USER_TYPE.seller);
    }); 
  } 


  selectPhoto() {
    this.mediaProvider.selectPhoto();
  }
  takePhoto() {
    this.mediaProvider.takePhoto();
  }
  ran() {
    return Math.floor((Math.random() * 16) + 1);
  }

  viewUserProfile(user) {
    this.navCtrl.push(SellerDetailsPage, { user });
  }

  getAge(date: string): string {
    return this.dataProvider.getAgeFromDate(date);
  }

  getDistance(geo) {
    return this.dataProvider.getLocationFromGeo(geo);
  }
}
