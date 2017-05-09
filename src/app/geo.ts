import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Service } from './service';
import { Location } from './location';
import { Locations } from './locations';
import { Trip } from './trip';
import { Trips } from './trips';
import { DEBUG } from './config';
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
  public currentActivity: messages.ActivityType;
  public currentLocation: Location;
  public highAccuracy = true;
  private walkTimer: number;

  constructor(
      private locationManager: Locations,
      private tripManager: Trips,
      private locationAccuracy: LocationAccuracy) {
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

  private onActivityChange(activityName) {
    let activity = Geo.ACTIVITIES[activityName],
      bike = messages.ActivityType.BICYCLE;

    if (this.currentActivity == bike && activity != bike) {
      this.walkTimer = window.setTimeout(() => this.setMoving(false), 180000);
    } else if (activity == bike && this.walkTimer) {
      clearTimeout(this.walkTimer);
    }

    this.currentActivity = activity;
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
      return this.locationManager.filterNewLocations()
        .then((locations: Location[]) => {
          if (locations.length === 0) return;
          return this.tripManager.save(Trip.fromLocations(locations))
            .then((trip) => this.locationManager.batchUpdate(
              ['trip_id'], [trip.id], 'trip_id IS NULL'));
        })
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
        titleWhenNotEnabled: 'Location Services are Disabled',
        titleWhenOff: 'Location Services are Off',
        instructions: 'To record trips, you must enable ' +
          '"Always" in the Location Services settings.',
        cancelButton: 'Cancel',
        settingsButton: 'Settings'
      },
  		locationUpdateInterval: 5000,
      maxRecordsToPersist: 0,
  		stationaryRadius: 20,
  		stopTimeout: 3,
      triggerActivities: 'on_bicycle'
  	};
  }

  public init() {
    this.requestAccuracy();
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

  public requestAccuracy() {
    this.locationAccuracy.canRequest()
      .then((canRequest: boolean) => {
        let accuracy = this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY;
        this.locationAccuracy.request(accuracy).then(
          () => this.highAccuracy = true,
          (error) => this.highAccuracy = false
        );
      });
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

  public debugMotion() {
    if (!DEBUG) return;
    let coords = [
      [-88.186468, 40.105718],
      [-88.187242, 40.105729],
      [-88.188610, 40.105704],
      [-88.188728, 40.106352],
      [-88.188728, 40.107164],
      [-88.188744, 40.107939]
    ];
    Observable.timer(1000, 1000).take(coords.length)
      .subscribe((i) => {
        let first = i === 0,
          last = i === coords.length - 1,
          position = {
            coords: {
              longitude: coords[i][0],
              latitude: coords[i][1],
              accuracy: 10,
              altitude: 700,
              heading: -1,
              speed: 10
            },
            timestamp: new Date(),
            is_moving: !last,
            event: (first || last) ? 'motionchange' : null,
            activity: {
              type: 'on_bicycle',
              confidence: 100
            }
          };
        if (!first) this.onLocation(position, null);
        if (first || last)
          this.onMotionChange(position.is_moving, position, null);
        if (first) this.onLocation(position, null);
      }, (err) => console.log(err));
  }

}
