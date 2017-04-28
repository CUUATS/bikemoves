import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { Map } from '../../app/map';
import { Marker } from '../../app/marker';
import { Path } from '../../app/path';
import { TripFormPage } from '../trip-form/trip-form';

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  trip: Trip;
  originMarker: Marker;
  destinationMarker: Marker;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private tripManager: Trips,
    private map: Map) {
    this.trip = navParams.data;
  }

  ionViewDidEnter() {
    this.map.assign('trip-detail-map', {
      interactive: false
    });
    this.tripManager.getLocations(this.trip).then((locations) => {
      this.map.path = new Path(locations);
      this.map.zoomToPath();
      this.originMarker = this.map.addMarker(locations[0], Marker.ORIGIN, 30);
      this.destinationMarker = this.map.addMarker(
        locations[locations.length - 1], Marker.DESTINATION, 30);
    });
  }

  ionViewWillLeave() {
    this.map.unassign();
    if (this.originMarker) this.map.removeMarker(this.originMarker);
    if (this.destinationMarker) this.map.removeMarker(this.destinationMarker);
  }

  showTripForm() {
    let modal = this.modalCtrl.create(TripFormPage, this.trip);
    modal.present();
  }
}
