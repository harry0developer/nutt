import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ChatPage } from '../chat/chat';
import { RateUserPage } from '../rate-user/rate-user';
import { COLLECTION, MESSAGES } from '../../utils/consts';
import { Ratings } from '../../models/ratings';
import { Observable } from 'rxjs';
import { FeedbackProvider } from '../../providers/feedback/feedback';

@IonicPage()
@Component({
  selector: 'page-seller-details',
  templateUrl: 'seller-details.html',
})
export class SellerDetailsPage {
  profile: any;
  img: string = "";
  category: string = 'info';
  openMenu: boolean = false;
  userRating = 0.0;
  allRatings: any[] = [];
  isLoading: boolean = false;
  allRatingsSubscription$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public feedbackProvider: FeedbackProvider,
    public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.profile = this.navParams.get('user');
    this.img = `assets/imgs/users/user3.jpg`;
    console.log(this.profile);
    
    // this.dataProvider.getDocumentFromCollectionById(COLLECTION.ratings, this.profile.id).subscribe(ratingsFromCollection => {
    //   const ratingsArray = this.dataProvider.getArrayFromObjectList(ratingsFromCollection);
    //   this.allRatings = ratingsArray;
    //   this.userRating = parseFloat(this.dataProvider.calculateRating(ratingsArray).toFixed(1));
    //   this.isLoading = false;
    // }, err => {
    //   this.isLoading = false;
    //   this.feedbackProvider.presentToast(MESSAGES.oops);
    // });
  }

  getAge(date: string): string {
    return this.dataProvider.getAgeFromDate(date);
  }

  getDistance(geo) {
    return this.dataProvider.getLocationFromGeo(geo);
  }

  requestUser(user) {
    console.log(user);
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  followUser(user) {
    console.log(user);
  }
  likeUser(user) {
    console.log(user);
  }
  chatWithUser(user) {
    this.openMenu = false;
    this.navCtrl.push(ChatPage, { user });
  }

  rateUser() {
    const modal = this.modalCtrl.create(RateUserPage, { company: this.profile });
    modal.onDidDismiss(data => {
      if (data) {
        this.updateCompanyRating(data);
      }
    });
    modal.present();
  }

  updateCompanyRating(data) {
    const newRatingData: Ratings = {
      id: data.company.id,
      rid: this.profile.uid,
      rating: data.rating,
      dateRated: this.dataProvider.getDateTime()
    };
    this.dataProvider.addUserActionToCollection(COLLECTION.ratings, this.allRatings, newRatingData, this.profile.uid);
  }

}
