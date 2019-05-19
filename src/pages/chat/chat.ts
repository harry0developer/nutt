import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';
import { COLLECTION, USER_TYPE } from '../../utils/consts';



@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  user: User;
  profile: User;

  chatData: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public authProvider: AuthProvider,
  ) { }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    // this.data.message = {
    //   text: "text me",
    //   date: '2019/04/15'
    // }
    // this.data.user = this.user;

    this.dataProvider.getItemById(COLLECTION.users, this.authProvider.getStoredUserId()).subscribe(user => {
      this.profile = user;
      const senderId = this.profile.userType === USER_TYPE.buyer ? this.profile.uid : this.user.uid;
      const receiverId = this.profile.userType === USER_TYPE.buyer ? this.user.uid : this.profile.uid;
      this.dataProvider.getChats(COLLECTION.messages, receiverId, senderId).subscribe(messages => {
        this.buildChats(messages);
      });
    });
  }

  buildChats(messages) {
    const data = {
      message: {},
      user: {}
    };
    this.chatData = [];
    messages.map(m => {
      data.message = m;
      data.user = this.profile.uid === m.sid ? this.profile : this.user;
      this.chatData.push(data);
    });
    console.log(this.chatData);

    return this.chatData;
  }

  sendByMe(chatData) {
    return chatData.user && chatData.user.sid === this.profile.uid;
  }

  sendMessage() {
    console.log('Send messages');
  }

}
