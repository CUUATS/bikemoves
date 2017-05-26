import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { Location } from '../../app/location';
import { Locations } from '../../app/locations';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { Remote } from '../../app/remote';
import { getOptions } from '../../app/utils';
import { notify } from '../../app/utils';

@Component({
  selector: 'page-trip-form',
  templateUrl: 'trip-form.html'
})
export class TripFormPage {
  private trip: Trip;
  private isUploading = false;
  private odCache: number[];
  public locationTypeOptions = getOptions(Location.LOCATION_TYPES);
  public imageURL : string;

  constructor(
      private navParams: NavParams,
      private viewCtrl: ViewController,
      private toastCtrl: ToastController,
      private locationManager: Locations,
      private tripManager: Trips,
      private remote: Remote) {
    this.trip = navParams.get('trip');
    this.imageURL = navParams.get('imageURL');
    this.odCache = [this.trip.origin, this.trip.destination];
    this.guessODTypes();
  }

  private setODTypes(types: number[]) {
    this.trip.origin = types[0];
    this.trip.destination = types[1];
  }

  private guessODTypes() {
    this.tripManager.getODLocations(this.trip)
      .then((locations) => this.locationManager.guessLocationTypes(locations))
      .then((locationTypes) => this.setODTypes(locationTypes));
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }

  public uploadTrip() {
    this.isUploading = true;
    this.remote.postTrip(this.trip)
      .then(() => {
        notify(this.toastCtrl, 'Trip uploaded successfully!');
        this.trip.submitted = true;
        return this.tripManager.save(this.trip);
      })
      .catch(() => {
        notify(this.toastCtrl, 'Trip upload failed. Please try again later.');
        this.setODTypes(this.odCache);
      });
    this.closeModal();
  }

  ionViewWillLeave() {
    if (!this.isUploading) this.setODTypes(this.odCache);
  }
}
