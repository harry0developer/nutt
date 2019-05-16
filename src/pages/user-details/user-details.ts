import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ChatPage } from '../chat/chat';
import { COLLECTION } from '../../utils/consts';
import { User } from '../../models/user';
import { Follower } from '../../models/followers';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  profile: User;
  rating: string;
  followers: Follower[] = [];
  category: string = 'info';
  openMenu: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.profile = this.navParams.get('user');

    this.dataProvider.getCollectionByKeyValuePair(COLLECTION.ratings, 'uid', this.profile.uid).subscribe(ratingData => {
      this.rating = this.dataProvider.calculateRating(ratingData);
    });

    this.dataProvider.getCollectionByKeyValuePair(COLLECTION.followers, 'uid', this.profile.uid).subscribe(followers => {
      this.followers = followers;
      console.log(followers);
    });
  }



  getAge(date: string): string {
    return this.dataProvider.getAgeFromDate(date);
  }

  getDistance(geo) {
    return this.dataProvider.getLocationFromGeo(geo);
  }

  requestUser(user) {
    console.log(user);
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  followUser(user) {
    console.log(user);
  }
  likeUser(user) {
    console.log(user);
  }
  chatWithUser(user) {
    this.openMenu = false;
    this.navCtrl.push(ChatPage, { user });
  }

}
