import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PlacesPage } from '../places/places';
import { DataProvider } from '../../providers/data/data';
import { COLLECTION } from '../../utils/consts';
import { User } from '../../models/user';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {

  @ViewChild(Slides) slides: Slides;

  loc: string;
  data = { 
    nickname: '',
    gender: '',
    age: '',
    race: '', 
    bodytype: '',
    height: '',
    email: '',
    phone: '',
    password: '',
    uid: '',
    dateCreated: '',
    userType: '',
    location: {
      address: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  }

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public navParams: NavParams,
    public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
    const data = this.navParams.get('data');
    this.data = {...data};
    this.slides.lockSwipes(true);

  }

  completeSignup() {
    let user = this.data;
    this.data.dateCreated = this.dataProvider.getDateTime();
    // this.dataProvider.addNewItem(COLLECTION.users, user).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })
  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  previousSlide() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  isFirstSlide(): boolean {
    return this.slides.isBeginning();
  }

  isLastSlide(): boolean {
    return this.slides.isEnd();
  }

  selected() {
    console.log(this.data);
  }

  showAddressModal() {
    let modal = this.modalCtrl.create(PlacesPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.loc = data.address;
        this.data.location = data;
      }
    });
    modal.present();
  }
}
