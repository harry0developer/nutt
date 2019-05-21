import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-rate-user',
  templateUrl: 'rate-user.html',
})
export class RateUserPage {
  user: User;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCntrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    console.log(this.user);

  }

  rateUser() {
    this.viewCntrl.dismiss();
  }

}
