import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { LoginPage } from '../login/login';

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
    this.navCtrl.push(LoginPage, {loginType: 'phoneNumber'});
  }

  loginWithPhoneNumber() {
    this.navCtrl.push(LoginPage, {loginType: 'emailAddress'});
  }

  signupWithEmailAddress() {
    this.navCtrl.push(LoginPage);
  }

  signupWithPhoneNumber() {
    this.navCtrl.push(LoginPage);
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
}
