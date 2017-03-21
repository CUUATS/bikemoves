import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Location } from '../../app/location';
import { pad } from '../../app/utils';

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  private trips: Trip[] = [];
  private hasTrips: boolean;

  constructor(public navCtrl: NavController) {

  }

  ionViewWillEnter() {
    Trip.objects.all('start_time DESC').then((trips) => {
      if (trips.length) {
        this.hasTrips = true;
        this.trips = trips;
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

}
