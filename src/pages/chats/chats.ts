import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { DataProvider } from '../../providers/data/data';
import { User } from '../../models/user';
import { COLLECTION, USER_TYPE } from '../../utils/consts';
import { AuthProvider } from '../../providers/auth/auth';
import { Requester } from '../../models/requester';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { map, tap } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  profile: User;
  mappedRequesters: User[] = [];
  requesters: Requester[] = [];
  users: User[] = [];
  page: string;
  user: User;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
    private feedbackProvider: FeedbackProvider,
  ) {
  }

  ionViewDidLoad() {
    this.page = this.navParams.get('page');
    this.requesters = this.navParams.get('requesters');
    this.user = this.navParams.get('user');
    this.feedbackProvider.presentLoading();
    this.dataProvider.getItemById(COLLECTION.users, this.authProvider.getStoredUserId()).subscribe(profile => {
      this.profile = profile;
      const id = this.profile.userType === USER_TYPE.seller ? 'uid' : 'rid';


      this.dataProvider.getAllFromCollection(COLLECTION.users).subscribe(users => {
        this.users = users;
        // this.dataProvider.getChats(COLLECTION.messages, receiverId, senderId).subscribe(messages => {
        // console.log(messages);
        this.mappedRequesters = this.dataProvider.mapUsers(this.requesters, this.users, id);
        this.feedbackProvider.dismissLoading();
      }, err => {
        this.feedbackProvider.dismissLoading();
      });
    }, err => {
      this.feedbackProvider.dismissLoading();
    });
  }

  viewChats(user) {
    this.navCtrl.push(ChatPage, { user });
  }

  getDistance(geo) {
    return this.dataProvider.getLocationFromGeo(geo);
  }

  // mapUsers(toBeMapped, users, type) {
  //   let userz = [];
  //   toBeMapped.map(r => {
  //     users.map(u => {
  //       if (type === 'uid') {
  //         if (r.rid === u.uid) {
  //           userz.push(Object.assign(u, { data: r }));
  //         }
  //       } else {
  //         if (r.uid === u.uid) {
  //           userz.push(Object.assign(u, { data: r }));
  //         }
  //       }
  //     })
  //   });
  //   return userz;
  // }



}
