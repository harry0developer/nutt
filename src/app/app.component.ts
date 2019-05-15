import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';

import * as firebase from 'firebase';
import { UsersPage } from '../pages/users/users';
import { RequestsPage } from '../pages/requests/requests';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = UsersPage;

  pages: any;
  user;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.user = {
      nickname: "Jon Snow",
      id: 113,
      dob: "1992-01-02",
      gender: "male",
      race: "white"

    }


    this.pages = {
      usersPage: UsersPage,
      requestsPage: RequestsPage,
      profilePage: ProfilePage
    }

  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getProfilePic(user) {
    return `assets/imgs/users/${user.gender}.svg`;
  }
}
