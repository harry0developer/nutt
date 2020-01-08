import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Country } from '../../models/country';
import { User } from '../../models/user';
import { NationalityPage } from '../nationality/nationality';
 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  loginType: string = '';
  data = {
    email: '',
    password: '',
    otpCode: '',
    phonenumber: '',
    phone: {
      flag: "🇿🇦",
      code: "+27",
      number: ''
    },
    location: { address: '' }
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.loginType = this.navParams.get('loginType');
    console.log(this.loginType);
  }

  loginWithPhoneNumber() {
    console.log('loginWithPhoneNumber');
  }

  loginWithEmailAndPassword() {
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

  getCountryCode() {
    let modal = this.modalCtrl.create(NationalityPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.data.phone.number = data.number;
        this.data.phone.code = data.dial_code;
        this.data.phone.flag = data.flag;
      }
    });
    modal.present();
  }
}
