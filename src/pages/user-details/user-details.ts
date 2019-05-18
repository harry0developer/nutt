import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ChatPage } from '../chat/chat';
import { COLLECTION } from '../../utils/consts';
import { User } from '../../models/user';
import { Rating } from '../../models/rating';
import { Requester } from '../../models/requester';
import { ChatsPage } from '../chats/chats';
import { RatersPage } from '../raters/raters';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  profile: User;
  rating: string;
  chats: User[] = [];
  raters: Rating[] = [];
  requesters: Requester[] = [];
  users: User[] = [];
  // openMenu: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.profile = this.navParams.get('user');

    this.dataProvider.getCollectionByKeyValuePair(COLLECTION.ratings, 'uid', this.profile.uid).subscribe(raters => {
      this.rating = this.dataProvider.calculateRating(raters);
      this.raters = raters;
    });

    this.dataProvider.getCollectionByKeyValuePair(COLLECTION.requesters, 'uid', this.profile.uid).subscribe(requesters => {
      this.requesters = requesters;
    });

    this.dataProvider.getAllFromCollection(COLLECTION.users).subscribe(users => {
      this.users = users;
    });
  }


  viewChats() {
    this.navCtrl.push(ChatsPage, { page: 'chats' });
  }

  viewRaters() {
    this.navCtrl.push(RatersPage, { page: 'raters' });
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

  // togglePopupMenu() {
  //   return this.openMenu = !this.openMenu;
  // }

  // followUser(user) {
  //   console.log(user);
  // }
  // likeUser(user) {
  //   console.log(user);
  // }
  // chatWithUser(user) {
  //   this.openMenu = false;
  //   this.navCtrl.push(ChatPage, { user });
  // }

}
