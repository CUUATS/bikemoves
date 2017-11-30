import { Component } from '@angular/core';
import { AlertController, Events, ModalController, NavController,
  PopoverController, ToastController, normalizeURL } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { Log } from '../../app/log';
import { Map } from '../../app/map';
import { Path } from '../../app/path';
import { Preferences, Settings } from '../../app/settings';
import { TripDetailPage } from '../trip-detail/trip-detail';
import { TripFormPage } from '../trip-form/trip-form';
import { TripsOptionsPage } from '../trips-options/trips-options';
import { notify } from '../../app/utils';

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  private trips: Trip[] = [];
  private isActiveTab = false;
  private listView: boolean;
  private hasImage = [];
  private hasTrips: boolean;
  private imagesLoaded = false;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private events: Events,
    private file: File,
    private log: Log,
    private tripManager: Trips,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private settings: Settings,
    private toastCtrl: ToastController,
    private map: Map) {
      this.events.subscribe('state:active', this.onActiveChange.bind(this));
      this.events.subscribe('settings:preferences', this.updateView.bind(this));
      this.settings.getPreferences().then(this.updateView.bind(this));
      this.loadTripImages();
    }

  ionViewWillEnter() {
    this.isActiveTab = true;
    this.updateTrips();
  }

  ionViewWillLeave() {
    this.isActiveTab = false;
  }

  private onActiveChange(active: boolean) {
    if (active && this.isActiveTab) this.updateTrips();
  }

  private updateTrips() {
    this.log.write('trips page', `updating trips`);
    let getTrips = this.tripManager.all('start_time DESC').then((trips) => {
        this.trips = trips;
        this.hasTrips = trips.length > 0;
      }).then(() => {
        if (this.imagesLoaded) this.createTripImages();
      });
  }

  public goToMap() {
    this.navCtrl.parent.select(0);
  }

  private loadTripImages() {
    this.log.write('trips page', `loading trip images`);
    return this.file.listDir(this.file.dataDirectory, 'images')
      .catch((err) => {
        if (err.code !== 1) throw err;
      }).then((entries) => {
        if (!entries) return;
        entries.forEach((entry) => {
          let matches = entry.name.match(/trip-(\d+)\.jpg/);
          if (matches) this.hasImage[parseInt(matches[1])] = true;
        });
        this.imagesLoaded = true;
      });
  }

  public getImageURL(trip: Trip, defaultURL?: string) {
    let hasImage = this.hasImage[trip.id];
    return (hasImage) ? normalizeURL(this.file.dataDirectory +
      'images/trip-' + trip.id + '.jpg') : defaultURL || null;
  }

  private createTripImages() {
    if (this.hasTrips) {
      this.trips.forEach((trip) => {
        if (!this.hasImage[trip.id]) this.createTripImage(trip);
      });
    }
  }

  private createTripImage(trip: Trip) {
    this.log.write('trips page', `creating image for trip: id=${trip.id}`);
    this.map.assign('trip-image-map', {
      interactive: false
    });
    this.tripManager.getLocations(trip)
      .then((locations) => this.map.createPathImage(new Path(locations)))
      .then((blob) => this.tripManager.saveImage(trip, blob))
      .then((entry) => this.hasImage[trip.id] = true);
  }

  public goToTripDetail(trip: Trip) {
    this.navCtrl.push(TripDetailPage, {
      trip: trip,
      imageURL: this.getImageURL(trip)
    });
  }

  public showTripForm(trip) {
    let modal = this.modalCtrl.create(TripFormPage, {
      trip: trip,
      imageURL: this.getImageURL(trip)
    });
    modal.present();
  }

  public confirmDelete(trip: Trip) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this trip?',
      message: 'Deleting a trip cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deleteTrip(trip)
        }
      ]
    });
    confirm.present();
  }

  private deleteTrip(trip) {
    this.log.write('trips page', `deleting trip: id=${trip.id}`);
    this.tripManager.delete(trip)
      .then(() => {
        if (this.hasImage[trip.id]) delete this.hasImage[trip.id];
        this.updateTrips();
        notify(this.toastCtrl, 'Trip deleted.');
      });
  }

  public showOptions() {
    let optionsPopover = this.popoverCtrl.create(TripsOptionsPage);
    optionsPopover.present();
  }

  private updateView(prefs: Preferences) {
    this.listView = prefs.tripsListView;
  }
}
