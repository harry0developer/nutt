import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  user: any;
  img: string = "";
  category: string = 'info';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    this.img = `assets/imgs/users/user${this.user.id}.jpg`;
  }

  getAge(date: string): string {
    return this.dataProvider.getAgeFromDate(date);
  }

}
