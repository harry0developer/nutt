import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { DataProvider } from '../../providers/data/data';
import { User } from '../../models/user';
import { COLLECTION } from '../../utils/consts';
import { AuthProvider } from '../../providers/auth/auth';
import { Requester } from '../../models/requester';

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  profile: User;
  requesters: Requester[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
  ) {
  }

  ionViewDidLoad() {
    const requesters = this.navParams.get('requesters');
    const users = this.navParams.get('users');
    this.requesters = this.mapRequesters(requesters, users);

    this.dataProvider.getItemById(COLLECTION.users, this.authProvider.getStoredUserId()).subscribe(user => {
      this.profile = user;
      // this.dataProvider.getCollectionByKeyValuePair(COLLECTION.requesters, 'uid', this.profile.uid).subscribe(requesters => {
      //   this.requesters = requesters;
      //   console.log(requesters);
      // });
    });
  }

  viewChats(user) {
    this.navCtrl.push(ChatPage, { user });
  }

  getDistance(geo) {
    return this.dataProvider.getLocationFromGeo(geo);
  }

  mapRequesters(requesters, users) {
    let userz = [];
    requesters.map(r => {
      users.map(u => {
        if (r.rid === u.uid) {
          userz.push(Object.assign(u, { request: r }));
        }
      })
    });
    return userz;
  }
}
