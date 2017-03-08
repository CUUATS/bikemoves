import { Injectable } from '@angular/core';
import { Trip } from './trip';
import { Storage } from './storage';
import { Service } from './service';

export class Location {
  constructor(
    public accuracy: number,
    public altitude: number,
    public heading: number,
    public latitude: number,
    public longitude: number,
    public moving: boolean,
    public speed: number,
    public time: number) {}

  static fromPosition(position) {
    return new Location(
      position.coords.accuracy,
      position.coords.altitude,
      position.coords.heading,
      position.coords.latitude,
      position.coords.longitude,
      position.coords.moving,
      position.coords.speed,
      position.coords.time)
  }
}

@Injectable()
export class Geo extends Service {
  static BG_DEFAULT_SETTINGS = {
		activityType: 'OtherNavigation', // iOS activity type
		autoSync: false, // Do not automatically post to the server
		debug: false, // Disable debug notifications
		desiredAccuracy: 0, // Overridden by settings.
		distanceFilter: 20, // Generate update events every 20 meters
		disableElasticity: false, // Auto-adjust distanceFilter
		fastestLocationUpdateInterval: 1000, // Prevent updates more than once per second (Android)
		locationUpdateInterval: 5000, // Request updates every 5 seconds (Android)
		startOnBoot: false, // Do not start tracking on device boot
		stationaryRadius: 20, // Activate the GPS after 20 meters (iOS)
		stopOnTerminate: true, // Stop geolocation tracking on app exit
		stopTimeout: 3 // Keep tracking for 3 minutes while stationary
	};
  private bgGeo: any;
  private settings = Geo.BG_DEFAULT_SETTINGS;
  public isRecording: boolean = false;
  public currentLocation: Location;
  public trip: Trip;

  constructor(private storage: Storage) {
    super();
  }

  private doGeoTask(fn, options) {
    let task;
    return this.ready().then(() => {
      return new Promise((resolve, reject) => {
        this.bgGeo[fn]((e, taskId) => {
          resolve(e);
          this.bgGeo.finish(task);
        }, (e) => {
          reject(e);
        }, options);
      });
    });
  }

  private getState() {
    return new Promise(
      (resolve, reject) => this.bgGeo.getState(resolve, reject));
  }

  private setRecording(recording: boolean) {
    this.isRecording = recording;
    this.setGeolocationEnabled(recording);
    return this.getCurrentLocation();
  }

  init() {
    this.bgGeo = (<any>window).BackgroundGeolocation;
    if (this.bgGeo) this.bgGeo.configure(
      this.settings, this.setReady.bind(this));
  }

  getCurrentLocation(options?) {
    return this.doGeoTask('getCurrentPosition', options).then((position) => {
      this.currentLocation = Location.fromPosition(position);
      return this.currentLocation;
    });
  }

  setGeolocationEnabled(on) {
    return this.ready().then(this.getState.bind(this)).then((state) => {
      return new Promise((resolve, reject) => {
        if ((<any>state).enabled === on) {
          resolve();
        } else if (on) {
          this.bgGeo.start(resolve);
        } else {
          this.bgGeo.stop(resolve);
        }
      });
    });
  }

  startTrip() {
    this.trip = new Trip();
    return this.setRecording(true);
  }

  endTrip() {
    return this.setRecording(false);
  }

  saveTrip() {
    this.storage.ready()
      .then(this.trip.save.bind(this.trip))
      .then(this.clearTrip.bind(this));
  }

  clearTrip() {
    this.trip = undefined;
  }

}
