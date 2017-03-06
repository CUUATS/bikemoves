import { Injectable } from '@angular/core';
import { Trip } from './trip';

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

Injectable()
export class Geo {
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
  private ready = false;
  private readyQueue = [];
  private settings = Geo.BG_DEFAULT_SETTINGS;
  public isRecording: boolean = false;
  public currentLocation: Location;
  public trip: Trip;

  init() {
    this.bgGeo = (<any>window).BackgroundGeolocation;
    if (this.bgGeo) this.bgGeo.configure(this.settings, () => {
      this.ready = true;
      this.readyQueue.forEach((callback) => {
        callback();
      });
    });
  }

  private initPlugin() {
    return new Promise((resolve, reject) => {
      if (this.ready) {
        resolve();
      } else {
        this.readyQueue.push(resolve);
      }
    });
  }

  private doGeoTask(fn, options) {
    let task,
      geo = this;
    return this.initPlugin().then(function() {
      return new Promise((resolve, reject) => {
        geo.bgGeo[fn](function(e, taskId) {
          resolve(e);
          geo.bgGeo.finish(task);
        }, (e) => {
          reject(e);
        }, options);
      });
    });
  }

  private getState() {
    let geo = this;
    return new Promise((resolve, reject) => {
      geo.bgGeo.getState(resolve, reject);
    });
  }

  getCurrentLocation(options?) {
    let geo = this;
    return this.doGeoTask('getCurrentPosition', options).then((position) => {
      geo.currentLocation = Location.fromPosition(position);
      return geo.currentLocation;
    });
  }

  setGeolocationEnabled(on) {
    let geo = this;
    return this.initPlugin().then(() => {
      return geo.getState();
    }).then((state) => {
      return new Promise((resolve, reject) => {
        if ((<any>state).enabled === on) {
          resolve();
        } else if (on) {
          geo.bgGeo.start(resolve);
        } else {
          geo.bgGeo.stop(resolve);
        }
      });
    });
  }

  setRecording(recording: boolean) {
    this.isRecording = recording;
    this.setGeolocationEnabled(recording);
    return this.getCurrentLocation();
  }
}
