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

  private state = MapPage.STATE_STOPPED;
  private currentMarker: Marker;
  private incidentMarker: Marker;

  constructor(public navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private geo: Geo,
    private map: Map,
    private modalCtrl: ModalController) {
    map.click.subscribe(this.onClick.bind(this));
    geo.motion.subscribe(this.onMotion.bind(this));
    geo.locations.subscribe(this.onLocation.bind(this));
    geo.getMoving().then((moving) => this.setStateFromMoving(moving));
  }

  ionViewDidEnter() {
    this.initMap();
    if (this.isStopped() && this.geo.currentLocation)
      this.onLocation(this.geo.currentLocation);
  }

  ionViewWillLeave() {
    this.map.unassign();
  }

  ionViewCanLeave(): boolean {
    return this.isStopped();
  }

  private initMap() {
    this.currentMarker = null;
    this.incidentMarker = null;

    let options: MapOptions = {};
    options.interactive = true;
    if (this.geo.currentLocation) options.center = this.geo.currentLocation;

    this.map.assign('map', options);
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

  private addOrMoveMarker(location: Location) {
    if (this.currentMarker) {
      this.currentMarker.location = location;
    } else {
      this.currentMarker = this.map.addMarker(location, Marker.CURRENT);
    }
  }

  private onLocation(location) {
    if (!this.map) return;
    this.map.center = location;
    this.addOrMoveMarker(location);
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
