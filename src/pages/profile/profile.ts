import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any = {
    nickname: "Mia Mommy Tee Low",
    id: 1,
    rating: "3.5",
    dob: "1991-02-22",
    gender: "female",
    race: "black",
    bodyType: "slim-thick",
    location: {
      address: "123 Arcadia, Pretoria",
      geo: {
        lat: -25.950187,
        lng: 28.998042
      }
    }
  };
  img: string;

  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.img = `assets/imgs/users/user${this.user.id}.jpg`;
  }

  getAge(date: string): string {
    return this.dataProvider.getAgeFromDate(date);
  }

  getDistance(geo) {
    return this.dataProvider.getLocationFromGeo(geo);
  }


}
