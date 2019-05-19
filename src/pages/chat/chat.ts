import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';



@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  user: User
  data = {
    message: {},
    user: {}
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    this.data.message = {
      text: "text me",
      date: '2019/04/15'
    }
    this.data.user = this.user;
  }
  // this.data.message = "text me";

  sendMessage() {
    console.log('Send messages');
  }

}
