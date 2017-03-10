import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geo, Location } from '../../app/geo';
import { Map } from '../../app/map';

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

  constructor(public navCtrl: NavController, private geo: Geo) {
    geo.motion.subscribe(this.onMotion.bind(this));
    geo.locations.subscribe(this.onLocation.bind(this));
  }

  ionViewDidLoad() {
    this.map = new Map('map', {
      interactive: true
    });
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
    console.log('Map got location', location);
    this.map.center = location;
    this.map.marker = location;
    if (this.isRecording()) this.map.addLocation(location);
  }

  private onMotion(moving) {
    console.log('Map got motion change', moving);
    this.state = (moving) ? MapPage.STATE_RECORDING : MapPage.STATE_STOPPED;
  }

  startRecording() {
    this.geo.startRecording();
  }

  stopRecording() {
    this.geo.stopRecording();
  }

}
