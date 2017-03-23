import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { Map } from '../../app/map';
import { TripFormPage } from '../trip-form/trip-form';

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  trip: Trip;
  map: Map;

  constructor(private navParams: NavParams, private modalCtrl: ModalController, private tripManager: Trips) {
    this.trip = navParams.data;
  }

  ionViewDidEnter() {
    this.map = new Map('trip-detail-map', {
      interactive: false
    });
    this.tripManager.getLocations(this.trip).then((locations) => {
      this.map.path = locations;
      this.map.zoomToPath();
    });
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  showTripForm() {
    let modal = this.modalCtrl.create(TripFormPage, this.trip);
    modal.present();
  }
}
