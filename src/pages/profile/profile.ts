import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { User } from '../../models/user';
import { COLLECTION, USER_TYPE } from '../../utils/consts';
import { AuthProvider } from '../../providers/auth/auth';
import { Rating } from 'ngx-rating';
import { FeedbackProvider } from '../../providers/feedback/feedback';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  img: string;
  profile: User;
  rating: string;
  raters: Rating[] = [];
  constructor(public navCtrl: NavController,
    public dataProvider: DataProvider,
    public authProvider: AuthProvider,
    public feedbackProvider: FeedbackProvider,
  ) {
  }

  ionViewDidLoad() {
    this.feedbackProvider.presentLoading();
    this.dataProvider.getItemById(COLLECTION.users, this.authProvider.getStoredUserId()).subscribe(profile => {
      this.dataProvider.getCollectionByKeyValuePair(COLLECTION.ratings, this.getProfileKeyType(profile), profile.uid).subscribe(raters => {
        this.rating = this.dataProvider.calculateRating(raters);
        this.raters = raters;
        this.profile = profile;
        this.img = this.profile.avatar;
        this.feedbackProvider.dismissLoading();
      }, err => {
        this.feedbackProvider.dismissLoading();
      });
    }, err => {
      this.feedbackProvider.dismissLoading();
    });
  }

  getProfileKeyType(profile): string {
    return profile.userType === USER_TYPE.buyer ? 'rid' : 'uid';
  }

  getAge(date: string): string {
    return this.dataProvider.getAgeFromDate(date);
  }

  getDistance(geo) {
    return this.dataProvider.getLocationFromGeo(geo);
  }


}
