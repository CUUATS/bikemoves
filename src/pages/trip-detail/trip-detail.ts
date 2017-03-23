import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { Map } from '../../app/map';

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  trip: Trip;
  map: Map;

  constructor(public navParams: NavParams, public tripManager: Trips) {
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
}
