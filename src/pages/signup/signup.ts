import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Country } from '../../models/country';
import { User } from '../../models/user';
import { NationalityPage } from '../nationality/nationality';
import { SetupPage } from '../setup/setup';
 

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
  signupType: string = '';
  data = {
    email: '',
    password: '',
    otpCode: '',
    phonenumber: '',
    code: '',
    dob: '',
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
    this.signupType =  this.navParams.get('signupType'); // 'emailAddress'//
    console.log(this.signupType);
  }

  signupWithPhoneNumber() {
    console.log(this.data);
  }

  signupWithEmailAndPassword() {
    this.navCtrl.push(SetupPage, {data: this.data});
  }

  cancelSignup() {
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
      console.log(data);
      
      if (data) {
        this.data.phone.number = data.number;
        this.data.phone.code = data.dial_code;
        this.data.phone.flag = data.flag;
      }
    });
    modal.present();
  }
}
