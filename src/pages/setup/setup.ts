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
    gender: '',
    nickname: '',
    email: '',
    phone: '',
    password: '',
    uid: '',
    dateCreated: '',
    age: '',
    race: '',
    bodytype: '',
    userType: '',
    location: {
      address: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  }

  bodyTypes = ['skinny', 'muscular / thick', 'fat'];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public navParams: NavParams,
    public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
    const data = this.navParams.get('data');
    this.data = {...data};
  }

  completeSignup() {
    const user = {
      gender: '',
      nickname: '',
      email: '',
      phone: '',
      password: '',
      uid: '',
      dateCreated: '',
      age: '',
      race: '', 
      userType: '',
      location: {
        address: '',
        lat: '',
        lng: ''
      }
    };
    // this.dataProvider.addNewItem(COLLECTION.users, user).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })
  }

  nextSlide() {
    this.slides.slideNext(); 
  }

  previousSlide() {
    this.slides.slidePrev();
  }

  isFirstSlide(): boolean {
    return this.slides.isBeginning();
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
