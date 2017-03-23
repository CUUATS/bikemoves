import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { Map } from '../../app/map';
import { TripDetailPage } from '../trip-detail/trip-detail';

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  private trips: Trip[] = [];
  private hasTrips: boolean;
  private map: Map;
  private pendingImages = 0;

  constructor(public navCtrl: NavController, private tripManager: Trips) {

  }

  ionViewWillEnter() {
    this.tripManager.all('start_time DESC').then((trips) => {
      if (trips.length) {
        this.hasTrips = true;
        this.trips = trips;
        this.loadTripImages();
      } else {
        this.hasTrips = false;
      }
    });
  }

  goToMap() {
    this.navCtrl.parent.select(0);
  }

  loadTripImages() {
    this.trips.forEach((trip) => {
      if (!trip.imageUrl) this.createTripImage(trip);
    });
  }

  createTripImage(trip) {
    this.pendingImages++;
    if (!this.map) this.map = new Map('trip-image-map', {
      interactive: false
    });
    trip.getLocations()
      .then((locations) => this.map.createPathImage(locations))
      .then((blob) => trip.saveImageFile(blob))
      .then(() => {
        if (this.pendingImages-- === 0) {
          this.map.remove();
          this.map = null;
        }
      });
  }

  goToTripDetail(trip: Trip) {
    this.navCtrl.push(TripDetailPage, trip);
  }
}
