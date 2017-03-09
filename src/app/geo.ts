import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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
    public time: number,
    public locationType: number = null) {}

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

  public activity = new Subject();
  public locations = new Subject();
  public motion = new Subject();

  constructor() {
    super();

    this.activity.subscribe((activity) => console.log('Activity', activity));
    this.locations.subscribe((location) => console.log('Location', location));
    this.motion.subscribe((moving) => console.log('Motion', moving));
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

  private onActivityChange(activity) {
    this.activity.next(activity);
  }

  private onLocation(location, taskId) {
    this.locations.next(Location.fromPosition(location));
    this.finish(taskId);
  }

  private onMotionChange(isMoving, location, taskId) {
    this.motion.next(isMoving);
    this.finish(taskId);
  }

  init() {
    this.bgGeo = (<any>window).BackgroundGeolocation;
    if (this.bgGeo) this.bgGeo.configure(
      this.settings, () => {
        this.bgGeo.on('location', this.onLocation.bind(this));
        this.bgGeo.on('motionchange', this.onMotionChange.bind(this));
        this.bgGeo.on('activitychange', this.onActivityChange.bind(this));
        this.setReady();
      });
  }

  finish(taskId) {
    this.bgGeo.finish(taskId);
  }

  getCurrentLocation(options?) {
    return this.doGeoTask('getCurrentPosition', options).then((position) => {
      return Location.fromPosition(position);
    });
  }

  setGeolocationEnabled(on) {
    return this.ready().then(() => this.getState()).then((state) => {
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

  setMoving(moving) {
    return this.ready().then(() => this.getState()).then((state) => {
      return new Promise((resolve, reject) => {
        if ((<any>state).isMoving === moving) {
          resolve();
        } else {
          this.bgGeo.changePace(moving, resolve, reject);
        }
      });
    });
  }

  startRecording() {
    return this.setGeolocationEnabled(true)
      .then(() => this.setMoving(true));
  }

  stopRecording() {
    return this.setMoving(false)
      .then(() => this.setGeolocationEnabled(false));
  }

}
