import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Service } from './service';
import { Location } from './location';
import { Locations } from './locations';
import { Trip } from './trip';
import { Trips } from './trips';
import { bikemoves as messages } from './messages';

@Injectable()
export class Geo extends Service {
  static ACTIVITIES = {
    'still': messages.ActivityType.STILL,
    'on_foot': messages.ActivityType.FOOT,
    'walking': messages.ActivityType.WALK,
    'running': messages.ActivityType.RUN,
    'in_vehicle': messages.ActivityType.VEHICLE,
    'on_bicycle': messages.ActivityType.BICYCLE,
    'unknown': messages.ActivityType.UNKNOWN
  };
  static EVENTS = {
    'motionchange': messages.EventType.MOTION,
    'geofence': messages.EventType.GEOFENCE,
    'heartbeat': messages.EventType.HEARTBEAT,
    'providerchange': messages.EventType.PROVIDER
  };
  private bgGeo: any;

  public activity = new Subject();
  public locations = new Subject();
  public motion = new Subject();
  public currentLocation: Location;

  constructor(
      private locationManager: Locations,
      private tripManager: Trips) {
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
        (location.moving || location.event == messages.EventType.MOTION)) {
      this.locationManager.save(location).then(() => this.finish(taskId));
    } else {
      this.finish(taskId);
    }
  }

  private onMotionChange(moving, position, taskId) {
    if (moving) {
      this.motion.next(moving);
      this.finish(taskId);
    } else {
      this.locationManager.filter('trip_id IS NULL')
        .then((locations) =>
          this.tripManager.save(Trip.fromLocations(locations)))
        .then((trip) => this.locationManager.batchUpdate(
          ['trip_id'], [trip.id], 'trip_id IS NULL'))
        .then(() => {
          this.motion.next(moving);
          this.finish(taskId);
        });
    }
  }

  private getSettings() {
    return {
      activityRecognitionInterval: 10000,
  		activityType: 'OtherNavigation',
  		desiredAccuracy: 0,
  		distanceFilter: 20,
  		disableElasticity: true,
  		fastestLocationUpdateInterval: 5000,
      locationAuthorizationRequest: 'Always',
      locationAuthorizationAlert: {
        instructions: 'To record trips, you must enable ' +
          '"Always" in the Location Services settings.'
      },
  		locationUpdateInterval: 5000,
      maxRecordsToPersist: 0,
  		stationaryRadius: 20,
  		stopTimeout: 3,
      triggerActivities: 'on_bicycle'
  	};
  }

  public init() {
    this.bgGeo = (<any>window).BackgroundGeolocation;
    if (this.bgGeo) this.bgGeo.configure(
      this.getSettings(), () => {
        this.bgGeo.on('location', this.onLocation.bind(this));
        this.bgGeo.on('motionchange', this.onMotionChange.bind(this));
        this.bgGeo.on('activitychange', this.onActivityChange.bind(this));
        this.setReady();
      });
    this.getCurrentLocation();
  }

  public finish(taskId) {
    this.bgGeo.finish(taskId);
  }

  public getCurrentLocation(options?) {
    return this.doGeoTask('getCurrentPosition', options).then((position) => {
      return Location.fromPosition(position);
    });
  }

  public setGeolocationEnabled(on) {
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

  public getMoving() {
    return this.ready().then(() => this.getState())
      .then((state) => (<any>state).isMoving);
  }

  public setMoving(moving) {
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

}
