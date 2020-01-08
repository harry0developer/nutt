import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { TermsPage } from '../terms/terms';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  loginWithEmailAddress() {
    console.log('Email');
    
    this.navCtrl.push(LoginPage, {loginType: 'emailAddress'});
  }

  loginWithPhoneNumber() {
    console.log('Phone');
    
    this.navCtrl.push(LoginPage, {loginType: 'phoneNumber'});
  }

  signupWithEmailAddress() {
    this.navCtrl.push(SignupPage, {signupType: 'emailAddress'});
  }

  signupWithPhoneNumber() {
    this.navCtrl.push(SignupPage, {signupType: 'phoneNumber'});
  }

  presentLoginActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Login with',
      buttons: [
        {
          text: 'Phone number',
          icon: 'call',
          handler: () => {
            this.loginWithPhoneNumber();
          }
        },
        {
          text: 'Email address',
          icon: 'mail',
          handler: () => {
            this.loginWithEmailAddress();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  presentSignupActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Signup with',
      buttons: [
        {
          text: 'Phone number',
          icon: 'call',
          handler: () => {
            this.signupWithPhoneNumber();
          }
        },
        {
          text: 'Email address',
          icon: 'mail',
          handler: () => {
            this.signupWithEmailAddress();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  showTermsAndConditions() {
    this.navCtrl.push(TermsPage);
  }
}
