import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Rating } from '../../models/rating';
import { DataProvider } from '../../providers/data/data';
import { COLLECTION, USER_TYPE } from '../../utils/consts';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { UserDetailsPage } from '../user-details/user-details';

@IonicPage()
@Component({
  selector: 'page-raters',
  templateUrl: 'raters.html',
})
export class RatersPage {
  raters: Rating[] = [];
  profile: User;
  mappedRaters: User[] = [];
  users: User[] = [];
  page: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
    private feedbackProvider: FeedbackProvider,
  ) {
  }

  ionViewDidLoad() {
    this.page = this.navParams.get('page');
    this.raters = this.navParams.get('raters');

    this.feedbackProvider.presentLoading();
    this.dataProvider.getItemById(COLLECTION.users, this.authProvider.getStoredUserId()).subscribe(profile => {
      this.profile = profile;
      const id = this.profile.userType === USER_TYPE.seller ? 'uid' : 'rid';
      this.dataProvider.getAllFromCollection(COLLECTION.users).subscribe(users => {
        this.users = users;
        this.mappedRaters = this.dataProvider.mapUsers(this.raters, this.users, id);
        this.feedbackProvider.dismissLoading();
      }, err => {
        this.feedbackProvider.dismissLoading();
      });
      // this.dataProvider.getCollectionByKeyValuePair(COLLECTION.ratings, id, this.profile.uid).subscribe(raters => {
      //   this.raters = raters;
      //   this.dataProvider.getAllFromCollection(COLLECTION.users).subscribe(users => {
      //     this.users = users;
      //     this.mappedRaters = this.mapRaters(this.raters, this.users, id);
      //     this.feedbackProvider.dismissLoading();
      //   }, err => {
      //     this.feedbackProvider.dismissLoading();
      //   });
      // }, err => {
      //   this.feedbackProvider.dismissLoading();
      // });
    }, err => {
      this.feedbackProvider.dismissLoading();
    });
  }

  viewSeller(user) {
    this.navCtrl.push(UserDetailsPage, { user });
  }

}
