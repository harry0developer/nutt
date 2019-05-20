import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';
import { COLLECTION, USER_TYPE } from '../../utils/consts';
import { Message } from '../../models/message';



@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  user: User;
  profile: User;

  chatData: any[] = [];
  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public authProvider: AuthProvider,
  ) { }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    this.profile = this.navParams.get('profile');
    const senderId = this.profile.userType === USER_TYPE.buyer ? this.profile.uid : this.user.uid;
    const receiverId = this.profile.userType === USER_TYPE.buyer ? this.user.uid : this.profile.uid;
    this.dataProvider.getChats(COLLECTION.messages, receiverId, senderId).subscribe(messages => {
      console.log(messages);
      this.chatData = this.buildChats(messages);
    });

  }

  buildChats(messages) {
    const chatData = [];
    messages.forEach(message => {
      const user = this.profile.uid === message.sid ? this.profile : this.user;
      chatData.push(Object.assign({}, { message }, { user }))
    });
    return chatData;
  }

  sentByMe(chat) {
    return chat.user && chat.user.uid === this.profile.uid;
  }

  sendMessage() {

    const messageData: Message = {
      uid: this.user.uid,
      sid: this.profile.uid,
      message: this.message,
      date: this.dataProvider.getDateTime(),
      isRead: false
    }

    this.message = '';
    this.dataProvider.addNewMessage(COLLECTION.messages, messageData.uid, messageData.sid, messageData).then(() => {
      console.log('Message sent');
    }).catch(err => {
      console.log('Error sending message', err);
    })
  }

}
