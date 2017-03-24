import { Component } from '@angular/core';
import { App, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Location } from '../../app/location';
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
  private locationTypeOptions = getOptions(Location.LOCATION_TYPES);

  constructor(
      private appCtrl: App,
      private navParams: NavParams,
      private viewCtrl: ViewController,
      private toastCtrl: ToastController,
      private tripManager: Trips,
      private remote: Remote) {
    this.trip = navParams.data;
  }

  ionViewWillLeave() {
    if (!this.isUploading) this.tripManager.save(this.trip);
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }

  private uploadTrip() {
    this.isUploading = true;
    this.remote.postTrip(this.trip)
      .then(() => {
        notify(this.toastCtrl, 'Trip uploaded successfully!');
        this.trip.submitted = true;
      })
      .catch(() =>
        notify(this.toastCtrl, 'Trip upload failed. Please try again later.'))
      .then(() => this.tripManager.save(this.trip))
      .then(() =>
        this.appCtrl.getRootNav().first().instance.updateTripsBadge());
    this.closeModal();
  }
}
