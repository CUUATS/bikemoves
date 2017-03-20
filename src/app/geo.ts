import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Service } from './service';
import { Location } from './location';
import { Trip } from './trip';
import { ActivityType, EventType } from './enum';

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
    maxRecordsToPersist: 0, // Disable persistence
		startOnBoot: false, // Do not start tracking on device boot
		stationaryRadius: 20, // Activate the GPS after 20 meters (iOS)
		stopOnTerminate: true, // Stop geolocation tracking on app exit
		stopTimeout: 3 // Keep tracking for 3 minutes while stationary
	};
  static ACTIVITIES = {
    'still': ActivityType.Still,
    'on_foot': ActivityType.Foot,
    'walking': ActivityType.Walk,
    'running': ActivityType.Run,
    'in_vehicle': ActivityType.Vehicle,
    'on_bicycle': ActivityType.Bicycle,
    'unknown': ActivityType.Unknown
  };
  static EVENTS = {
    'motionchange': EventType.Motion,
    'geofence': EventType.Geofence,
    'heartbeat': EventType.Heartbeat,
    'providerchange': EventType.Provider
  };
  private bgGeo: any;
  private settings = Geo.BG_DEFAULT_SETTINGS;

  public activity = new Subject();
  public locations = new Subject();
  public motion = new Subject();
  public currentLocation: Location;

  constructor() {
    super();
  }

  private doGeoTask(fn, options = undefined) {
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

  private onLocation(position, taskId) {
    let location = Location.fromPosition(position);
    this.currentLocation = location;
    this.locations.next(location);

    if (!position.sample &&
        (location.moving || location.event == EventType.Motion)) {
      location.save().then(() => this.finish(taskId));
    } else {
      this.finish(taskId);
    }
  }

  private onMotionChange(moving, position, taskId) {
    if (moving) {
      this.motion.next(moving);
      this.finish(taskId);
    } else {
      Location.objects.filter('trip_id IS NULL')
        .then((locations) => Trip.fromLocations(locations).save())
        .then((trip) => Location.objects.batchUpdate(
          `trip_id = ${trip.id}`, 'trip_id IS NULL'))
        .then(() => {
          this.motion.next(moving);
          this.finish(taskId);
        });
    }
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
    this.getCurrentLocation();
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

  getMoving() {
    return this.ready().then(() => this.getState())
      .then((state) => (<any>state).isMoving);
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
