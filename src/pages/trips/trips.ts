import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { Location } from '../../app/location';
import { pad } from '../../app/utils';
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

  formatDuration(trip) {
    let duration = trip.getDuration(),
      hours = pad(duration.hours(), 2),
      minutes = pad(duration.minutes(), 2),
      seconds = pad(duration.seconds(), 2);

    return [hours, minutes, seconds].join(':');
  }

  formatDistance(trip) {
    return (trip.distance * 0.000621371).toFixed(1);
  }

  formatLocationType(locationType: number) {
    return Location.LOCATION_TYPES[locationType];
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
