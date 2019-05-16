import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';

import { UsersPage } from '../pages/users/users';
import { RequestsPage } from '../pages/requests/requests';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';
import { User } from '../models/user';
import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: any;
  profile: User;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
  ) {
    this.initializeApp();
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
      this.setProfile();
    });
  }

  setProfile() {
    if (this.authProvider.isLoggedIn()) {

      this.dataProvider.getUserById(this.authProvider.getStoredUser()).subscribe(user => {
        this.profile = user;
      });
    }
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
