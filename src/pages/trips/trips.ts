import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Location } from '../../app/location';
import { pad } from '../../app/utils';
import { File } from '@ionic-native/file';
import { Map } from '../../app/map';

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  private trips: Trip[] = [];
  private hasTrips: boolean;
  private map: Map;

  constructor(public navCtrl: NavController, private file: File) {

  }

  ionViewWillEnter() {
    Trip.objects.all('start_time DESC').then((trips) => {
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
    this.file.createDir(this.file.dataDirectory, 'images', false)
      .catch((err) => {if (err.code !== 12) console.log(err);})
      .then(() => {
        this.trips.forEach((trip) => {
          if (!trip.imageUrl) this.createTripImage(trip);
        });
      });
  }

  createTripImage(trip) {
    if (!this.map) this.map = new Map('trip-image-map', {
      interactive: false
    });
    trip.getLocations()
      .then((locations) => this.map.createPathImage(locations))
      .then((blob) =>
        this.file.writeFile(
          this.file.dataDirectory, `images/trip-${trip.id}.jpg`, blob))
      .then((entry) => {
        trip.imageUrl = entry.nativeURL;
        trip.save();
        // this.assignTripImage(trip);
      });
  }

  // assignTripImage(trip, entry) {
  //   (document.getElementById(`trip-${trip.id}-image`) as HTMLImageElement).src =
  //     trip.imageUrl;
  // }

}
