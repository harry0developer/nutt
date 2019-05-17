import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Rating } from '../../models/rating';
import { DataProvider } from '../../providers/data/data';
import { COLLECTION } from '../../utils/consts';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-raters',
  templateUrl: 'raters.html',
})
export class RatersPage {
  raters: Rating[] = [];
  profile: User;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
  ) {
  }

  ionViewDidLoad() {
    const raters = this.navParams.get('raters');
    const users = this.navParams.get('users');
    this.raters = this.mapRequesters(raters, users);


    this.dataProvider.getItemById(COLLECTION.users, this.authProvider.getStoredUserId()).subscribe(user => {
      this.profile = user;
      // this.dataProvider.getCollectionByKeyValuePair(COLLECTION.ratings, 'uid', this.profile.uid).subscribe(raters => {
      //   this.raters = raters;
      //   console.log(raters);
      // });
    });
  }

  mapRequesters(raters, users) {
    let userz = [];
    raters.map(r => {
      users.map(u => {
        if (r.rid === u.uid) {
          userz.push(Object.assign(u, { rater: r }));
        }
      })
    });
    return userz;
  }


}
