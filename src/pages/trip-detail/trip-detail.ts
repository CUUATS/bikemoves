import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { Map } from '../../app/map';
import { Path } from '../../app/path';
import { TripFormPage } from '../trip-form/trip-form';

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  trip: Trip;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private tripManager: Trips,
    private map: Map) {
    this.trip = navParams.data;
  }

  ionViewDidEnter() {
    console.log('Trip Detail Page: entered view');
    this.map.assign('trip-detail-map', {
      interactive: false
    });
    this.tripManager.getLocations(this.trip).then((locations) => {
      this.map.path = new Path(locations);
      this.map.zoomToPath();
      this.map.icons = [
        {
          type: 'origin',
          location: locations[0]
        },
        {
          type: 'destination',
          location: locations[locations.length - 1]
        }
      ];
    });
  }

  ionViewWillLeave() {
    console.log('Trip Detail Page: will leave view');
    this.map.unassign();
    this.map.icons = [];
  }

  showTripForm() {
    let modal = this.modalCtrl.create(TripFormPage, this.trip);
    modal.present();
  }
}
