import { Component, ChangeDetectorRef } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Geo } from '../../app/geo';
import { Location } from '../../app/location';
import { Map, MapOptions } from '../../app/map';
import { Marker } from '../../app/marker';
import { IncidentFormPage } from '../incident-form/incident-form';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  static STATE_STOPPED = 'stopped';
  static STATE_RECORDING = 'recording';
  static STATE_REPORTING = 'reporting';

  private map: Map;
  private state = MapPage.STATE_STOPPED;
  private currentMarker: Marker;
  private incidentMarker: Marker;

  constructor(public navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private geo: Geo,
    private modalCtrl: ModalController) {
    geo.motion.subscribe(this.onMotion.bind(this));
    geo.locations.subscribe(this.onLocation.bind(this));
    geo.getMoving().then((moving) => this.setStateFromMoving(moving));
  }

  ionViewDidLoad() {
    let options: MapOptions = {};
    options.interactive = true;
    if (this.geo.currentLocation) {
      options.center = this.geo.currentLocation;
      options.marker = this.geo.currentLocation;
    }
    this.map = new Map('map', options);
    this.map.click.subscribe(this.onClick.bind(this));
  }

  ionViewWillEnter() {
    if (this.isStopped() && this.geo.currentLocation)
      this.onLocation(this.geo.currentLocation);
  }

  ionViewCanLeave(): boolean {
    return this.isStopped();
  }

  private isStopped() {
    return this.state === MapPage.STATE_STOPPED;
  }

  private isRecording() {
    return this.state === MapPage.STATE_RECORDING;
  }

  private isReporting() {
    return this.state === MapPage.STATE_REPORTING;
  }

  private onLocation(location) {
    if (!this.map) return;
    this.map.center = location;
    if (this.currentMarker) {
      this.currentMarker.location = location;
    } else {
      this.currentMarker = this.map.addMarker(location, Marker.CURRENT);
    }
    if (this.isRecording()) this.map.addLocation(location);
  }

  private onMotion(moving) {
    this.setStateFromMoving(moving);
    if (!moving) this.map.path = [];
  }

  private setStateFromMoving(moving) {
    this.state = (moving) ? MapPage.STATE_RECORDING : MapPage.STATE_STOPPED;
    // Force the UI to update.
    this.cdr.detectChanges();
  }

  private onClick(location: Location) {
    if (!this.isReporting()) return;
    if (this.incidentMarker) {
      this.incidentMarker.location = location;
    } else {
      this.incidentMarker = this.map.addMarker(location, Marker.INCIDENT);
    }
  }

  startRecording() {
    this.geo.startRecording();
  }

  stopRecording() {
    this.geo.stopRecording();
  }

  startReporting() {
    this.state = MapPage.STATE_REPORTING;
    this.map.interactive = false;
    if (this.currentMarker) this.currentMarker.hide();
  }

  stopReporting() {
    this.state = MapPage.STATE_STOPPED;
    this.map.interactive = true;
    if (this.incidentMarker) {
      this.map.removeMarker(this.incidentMarker);
      this.incidentMarker = null;
    }
    if (this.currentMarker) this.currentMarker.show();
  }

  showIncidentForm() {
    let incidentModal = this.modalCtrl.create(
      IncidentFormPage, this.incidentMarker.location);
    incidentModal.onWillDismiss(() => this.stopReporting());
    incidentModal.present();
  }

}
