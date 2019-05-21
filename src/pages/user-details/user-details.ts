import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ChatPage } from '../chat/chat';
import { COLLECTION } from '../../utils/consts';
import { User } from '../../models/user';
import { Rating } from '../../models/rating';
import { Requester } from '../../models/requester';
import { RateUserPage } from '../rate-user/rate-user';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { Subject } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  profile: User;
  user: User;
  rating: string;
  chats: User[] = [];
  raters: Rating[] = [];
  requesters: Requester[] = [];
  users: User[] = [];

  unsubscribe$ = new Subject<void>();
  // openMenu: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public modalCtrl: ModalController,
    public feedbackCtrl: FeedbackProvider,
  ) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    this.profile = this.navParams.get('profile');

    this.dataProvider.getCollectionByKeyValuePair(COLLECTION.ratings, 'uid', this.user.uid).subscribe(raters => {
      this.rating = this.dataProvider.calculateRating(raters);
      this.raters = raters;
    });

    this.dataProvider.getCollectionByKeyValuePair(COLLECTION.requesters, 'uid', this.user.uid).subscribe(requesters => {
      this.requesters = requesters;
    });

    this.dataProvider.getAllFromCollection(COLLECTION.users).subscribe(users => {
      this.users = users;
    });
  }

  getAge(date: string): string {
    return this.dataProvider.getAgeFromDate(date);
  }

  getDistance(geo) {
    return this.dataProvider.getLocationFromGeo(geo);
  }

  chatWithUser(user) {
    this.navCtrl.push(ChatPage, { user, profile: this.profile });
  }

  canRateUser(user): boolean {
    for (let i = 0; i < this.requesters.length; i++) {
      if (this.requesters[i].rid === this.profile.uid && this.requesters[i].uid === user.uid) {
        return true;
      } else {
        return false;
      }
    }
  }

  rateUser(user) {
    const modal = this.modalCtrl.create(RateUserPage, { user });
    this.dataProvider.openModal = true;

    modal.onDidDismiss(data => {
      this.updateUserRating(data);
    })

    modal.present();
  }


  updateUserRating(data) {
    const rating: Rating = {
      uid: data.user.uid,
      rid: this.profile.uid,
      rating: data.rating,
      date: this.dataProvider.getDateTime()
    }
    // this.feedbackCtrl.presentLoading();
    this.dataProvider.findCollectionByUidAndRid(COLLECTION.ratings, data.user.uid, this.profile.uid).takeUntil(this.unsubscribe$).subscribe(res => {
      // this.feedbackCtrl.dismissLoading();
      if (res.length > 0) {
        this.updateRating(rating, res[0].id);
        this.unsubscribe$.complete();
      } else {
        this.addNewRating(rating);
        this.unsubscribe$.complete();
      }
    }, err => {
      this.feedbackCtrl.dismissLoading();
    });
  }

  addNewRating(ratingData) {
    this.dataProvider.addNewItem(COLLECTION.ratings, ratingData).then(() => {
      this.feedbackCtrl.presentToast('User rated successfully');
    }).catch(err => {
      this.feedbackCtrl.presentAlert('User not rated', 'An error occured while rating the user');
    });
  }
  updateRating(ratingData, id) {
    this.dataProvider.updateItem(COLLECTION.ratings, ratingData, id).then(() => {
      this.feedbackCtrl.presentToast('User rated successfully');
    }).catch(err => {
      this.feedbackCtrl.presentAlert('User not rated', 'An error occured while rating the user');
    });
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


}
