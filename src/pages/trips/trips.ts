import { Component } from '@angular/core';
import { ActionSheetController, ModalController, NavController, ToastController } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { Map } from '../../app/map';
import { TripDetailPage } from '../trip-detail/trip-detail';
import { TripFormPage } from '../trip-form/trip-form';
import { notify } from '../../app/utils';

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  private trips: Trip[] = [];
  private hasTrips: boolean;
  private map: Map;
  private pendingImages = 0;

  constructor(
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private tripManager: Trips,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController) {}

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

  private goToMap() {
    this.navCtrl.parent.select(0);
  }

  private loadTripImages() {
    this.trips.forEach((trip) => {
      if (!trip.imageUrl) this.createTripImage(trip);
    });
  }

  private createTripImage(trip) {
    this.pendingImages++;
    if (!this.map) this.map = new Map('trip-image-map', {
      interactive: false
    });
    this.tripManager.getLocations(trip)
      .then((locations) => this.map.createPathImage(locations))
      .then((blob) => this.tripManager.saveImage(trip, blob))
      .then(() => {
        if (this.pendingImages-- === 0) {
          this.map.remove();
          this.map = null;
        }
      });
  }

  private goToTripDetail(trip: Trip) {
    this.navCtrl.push(TripDetailPage, trip);
  }

  private showTripForm(trip) {
    let modal = this.modalCtrl.create(TripFormPage, trip);
    modal.present();
  }

  private pressFix() {
    // Do not remove. This allows the press action to work correctly
    // on Android.
  }

  private showTripOptions(trip: Trip) {
    let buttons = [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => this.deleteTrip(trip)
      },
      {
        text: 'Cancel',
        role: 'cancel',
        icon: 'close'
      }
    ];

    if (!trip.submitted) buttons.unshift({
      text: 'Upload',
      role: 'upload',
      icon: 'cloud-upload',
      handler: () => this.showTripForm(trip)
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Trip Options',
      buttons: buttons
    });
    actionSheet.present();
  }

  private deleteTrip(trip) {
    this.tripManager.delete(trip)
      .then(() => {
        // TODO: Update the trips badge.
        this.trips.splice(this.trips.indexOf(trip), 1);
        notify(this.toastCtrl, 'Trip deleted.');
      });
  }
}
