import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PlacesPage } from '../places/places';



@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  data = {
    dob: '',
    myGender: '',
    otherGender: '',
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
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
    this.data = this.navParams.get('data');
    console.log(this.data);
    
  }

  completeSignup() {
    console.log(this.data);
  }

  showAddressModal() {
    let modal = this.modalCtrl.create(PlacesPage);
    modal.onDidDismiss(data => {
      console.log(data);
      
      if (data) {
        this.data.location.address = data.address;
        this.data.location.geo = {
          lat: data.lat,
          lng: data.lat
        }
      }
    });
    modal.present();
  }
}
