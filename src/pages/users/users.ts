import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { DataProvider } from '../../providers/data/data';



@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users: any = [
    {
      nickname: "Mia Mommy Tee Low",
      id: 1,
      dob: "1991-02-22",
      gender: "female",
      race: "black",
      location: {
        address: "123 Arcadia, Pretoria",
        geo: {
          lat: 23.900,
          lng: -18.3883
        }
      }
    },
    {
      nickname: "Kitty Mami",
      id: 2,
      dob: "1993-07-19",
      gender: "female",
      race: "black",
      location: {
        address: "9090 Heart street, Menlyn, Pretoria",
        geo: {
          lat: 24.900,
          lng: -18.3883
        }
      }
    },
    {
      nickname: "Queen Slay",
      id: 3,
      dob: "1993-07-18",
      gender: "female",
      race: "coloured",
      location: {
        address: "900 Sunnyside, Pretoria,",
        geo: {
          lat: 28.900,
          lng: -15.3883
        }
      }
    },
    {
      nickname: "Mia Low",
      id: 4,
      dob: "1996-03-20",
      gender: "female",
      race: "indian",
      location: {
        address: "891 Centurion, Pretoria",
        geo: {
          lat: 33.900,
          lng: -28.3883
        }
      }
    },
    {
      nickname: "Sally Sea",
      id: 5,
      dob: "1990-12-24",
      gender: "female",
      race: "black",
      location: {
        address: "123 Arcadia, Pretoria",
        geo: {
          lat: 23.900,
          lng: -18.3883
        }
      }
    }
  ];
  constructor(public navCtrl: NavController, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {

  }

  getAge(date: string): string {
    return this.dataProvider.getAgeFromDate(date);
  }

}
