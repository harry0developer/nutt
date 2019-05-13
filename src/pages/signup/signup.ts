import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';
import { UsersPage } from '../users/users';
import * as moment from 'moment'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupType = 'EmailAndPassword';
  data = {
    email: "",
    password: "",
    nickname: "",
    avatar: "",
    dob: "",
    gender: "",
    race: "",
    dateCreated: ""
  };
  minYear: string;
  constructor(public navCtrl: NavController,
    public dataProvider: DataProvider,
    public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    const date = this.dataProvider.getNowDate();
    const year = +date.split('/')[0] - 17;
    this.minYear = year.toString()
  }

  signupWithEmailAndPassword() {
    this.data.avatar = `assets/imgs/users/${this.data.gender}.svg`;
    this.data.dateCreated = this.dataProvider.getNowDate();
    this.authProvider.signUpWithEmailAndPassword(this.data).then(() => {
      this.authProvider.updateUser(this.data).then(() => {
        this.navCtrl.setRoot(UsersPage);
      }).catch(err => {
        console.log(err);
      })
    });
  }

}
