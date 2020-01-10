import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { SellerDetailsPage } from '../seller-details/seller-details';
import { COLLECTION } from '../../utils/consts';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
 

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
    public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    this.profile = this.authProvider.getStoredUser();
    console.log(this.profile);
    
    // this.dataProvider.getAllFromCollection(COLLECTION.users).subscribe(users => {
    //   this.sellers = users;
    //   console.log(users);
    // });
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
