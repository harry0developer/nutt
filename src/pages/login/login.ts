import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { take } from 'rxjs/operators';
import { AuthProvider } from '../../providers/auth/auth';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { COLLECTION, EVENTS } from '../../utils/consts';
import { DataProvider } from '../../providers/data/data';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { UserData } from '../../models/userData';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import firebase from 'firebase/app';

declare var window;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  data = {
    email: '',
    password: '',
    phone: '',
    otp: ''
  }
  type = 'password';
  showPass = false;

  user: any;

  verificationId: any;
  otpCode: string = '';

  loginType: string = 'EmailAndPassword';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ionEvents: Events,
    private dataProvider: DataProvider,
    private feedbackProvider: FeedbackProvider,
    private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    // if (this.authProvider.isLoggedIn()) {
    //   this.navigate(this.authProvider.getStoredUser());
    // }
  }

  switchTologinWithPhoneNumber() {
    this.loginType = 'PhoneNumber';
  }

  switchTologinWithEmailAndPassword() {
    this.loginType = 'EmailAndPassword';
  }

  loginWithEmailAndPassword() {
    console.log('EmailAndPassword login ...');
  }

  loginWithPhoneNumber() {
    this.loginType = 'otp';
    const phoneNumber = '+27' + this.data.phone;
    (<any>window).FirebasePlugin.verifyPhoneNumber(phoneNumber, 60, function (credential) {
      this.verificationId = credential.verificationId;
      console.log('success otp:', this.verificationId);
    }, (error) => {
      console.error('XXXXXXX ' + error);
    });
  }

  verify() {
    let signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.data.otp);
    firebase.auth().signInWithCredential(signInCredential).then((info) => { console.log(info); }, (error) => {
      console.log(error);
      this.feedbackProvider.presentAlert('Succees', 'You have successfully logged in with Phone number :)');
    }).catch(err => {
      console.log('xxxxxx', err);
    });
  }

  // signinWithEmailAndPassword() {
  //   this.feedbackProvider.presentLoading();
  //   this.authProvider.signInWithEmailAndPassword(this.data.email, this.data.password).then(res => {
  //     this.dataProvider.getItemById(COLLECTION.users, res.user.uid).subscribe(u => {
  //       this.feedbackProvider.dismissLoading();
  //       this.navigate(u);
  //     });
  //   }).catch(err => {
  //     this.feedbackProvider.dismissLoading();
  //     if (err.code === USER_NOT_FOUND || err.code == INVALID_PASSWORD) {
  //       this.feedbackProvider.presentErrorAlert('Login failed', 'Username an password do not match');
  //     }
  //     console.log(err);
  //   });
  // }

  // signInWithFacebook() {
  //   this.feedbackProvider.presentLoading();
  //   this.authProvider.signInWithFacebook().then((res) => {
  //     this.dataProvider.getItemById(COLLECTION.users, res.user.uid).subscribe(u => {
  //       this.feedbackProvider.dismissLoading();
  //       this.navigate(u);
  //     });
  //   }).catch(err => {
  //     this.feedbackProvider.dismissLoading();
  //     if (err.code === USER_NOT_FOUND || err.code == INVALID_PASSWORD) {
  //       this.feedbackProvider.presentErrorAlert('Login failed', 'Username an password do not match');
  //     }
  //     console.log(err);
  //   });
  // }

  // signInWithTwitter() {
  //   this.feedbackProvider.presentLoading();
  //   this.authProvider.signInWithFacebook().then((res) => {
  //     this.dataProvider.getItemById(COLLECTION.users, res.user.uid).subscribe(u => {
  //       this.feedbackProvider.dismissLoading();
  //       this.navigate(u);
  //     });
  //   }).catch(err => {
  //     this.feedbackProvider.dismissLoading();
  //     if (err.code === USER_NOT_FOUND || err.code == INVALID_PASSWORD) {
  //       this.feedbackProvider.presentErrorAlert('Login failed', 'Username an password do not match');
  //     }
  //     console.log(err);
  //   });
  // }


  // navigate(user) {
  //   this.feedbackProvider.presentLoading();
  //   this.authProvider.storeUser(user);
  //   forkJoin(
  //     this.dataProvider.getAllFromCollection(COLLECTION.users).pipe(take(1))
  //   ).subscribe(([users, jobs, appointments, ratings, viewedJobs, appliedJobs, sharedJobs]) => {
  //     this.feedbackProvider.dismissLoading();
  //     const data = { users, jobs, appointments, ratings, viewedJobs, appliedJobs, sharedJobs };
  //     this.dataProvider.updateUserData(new UserData(data));
  //     this.ionEvents.publish(EVENTS.loggedIn, user);
  //   });
  // }

  // goToSignup() {
  //   this.navCtrl.setRoot(SignupPage);
  // }

  // goToForgotPassword() {
  //   this.navCtrl.setRoot(ForgotPasswordPage);
  // }

  // showPassword() {
  //   this.showPass = !this.showPass;
  //   if (this.showPass) {
  //     this.type = 'text';
  //   } else {
  //     this.type = 'password';
  //   }
  // }

}
