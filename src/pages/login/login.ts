import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Country } from '../../models/country';
import { User } from '../../models/user';
 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  loginType: string = 'emailAddress';
  data = {
    email: '',
    password: '',
    otpCode: '',
    phonenumber: '',
    code: ''
  }
  type = 'password';
  showPass = false;
  showOTPPage = false;
  verificationId: string = '';

  // user: any;
  applicationVerifier: any;
  windowRef: any;
  verificationCode: string;
  countries: any = [];
  users: User[] = [];


  country: Country = {
    name: "South Africa",
    flag: "🇿🇦",
    code: "ZA",
    dialCode: "+27"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // this.loginType = this.navParams.get('loginType')
  }

  loginWithPhoneNumber() {
    console.log('loginWithPhoneNumber');
  }

  signinWithEmailAndPassword() {
    console.log('signinWithEmailAndPassword');
  }

  cancelLogin() {
    this.navCtrl.pop();
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
}
