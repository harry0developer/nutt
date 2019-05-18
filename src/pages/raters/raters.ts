import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Rating } from '../../models/rating';
import { DataProvider } from '../../providers/data/data';
import { COLLECTION, USER_TYPE } from '../../utils/consts';
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
  mappedRaters: User[] = [];
  users: User[] = [];
  page: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
    public appCtrl: App

  ) {
  }

  ionViewDidLoad() {
    this.page = this.navParams.get('page');

    this.dataProvider.getItemById(COLLECTION.users, this.authProvider.getStoredUserId()).subscribe(profile => {
      this.profile = profile;
      const id = this.profile.userType === USER_TYPE.seller ? 'uid' : 'rid';
      this.dataProvider.getCollectionByKeyValuePair(COLLECTION.ratings, id, this.profile.uid).subscribe(raters => {
        this.raters = raters;
        this.dataProvider.getAllFromCollection(COLLECTION.users).subscribe(users => {
          this.users = users;
          this.mappedRaters = this.mapRaters(this.raters, this.users, id);
        });
      });
    });
  }

  mapRaters(raters, users, type): User[] {
    let userz = [];
    raters.map(r => {
      users.map(u => {
        if (type === 'uid') {
          if (r.rid === u.uid) {
            userz.push(Object.assign(u, { rater: r }));
          }
        } else {
          if (r.uid === u.uid) {
            userz.push(Object.assign(u, { rater: r }));
          }
        }
      })
    });
    return userz;
  }


}
