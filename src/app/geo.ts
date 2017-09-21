import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Device } from '@ionic-native/device';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Service } from './service';
import { Location } from './location';
import { Locations } from './locations';
import { Log } from './log';
import { Trip } from './trip';
import { Trips } from './trips';
import { Settings } from './settings';
import { DEBUG } from './config';
import { bikemoves as messages } from './messages';
import * as moment from 'moment';

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

  public locations = new Subject();
  public motion = new Subject();
  public currentLocation: Location;
  public highAccuracy = true;
  private highSpeedCount = 0;
  private isWatching = false;
  private canAutoStop = true;
  private didAutoStop = false;
  private stopTimer: number;

  constructor(
      private device: Device,
      private events: Events,
      private locationAccuracy: LocationAccuracy,
      private log: Log,
      private settings: Settings) {
    super();
  }

  private getState() {
    return new Promise(
      (resolve, reject) => this.bgGeo.getState(resolve, reject));
  }

  private getActivity(position) {
    if (!position.activity.type) return messages.ActivityType.UNKNOWN;

    // iOS is not reporting the correct activity for biking most of the time,
    // so we guess the activity based on speed. Speeds > 5 MPH and < 25 MPH
    // are considered biking.
    if (this.device.platform == 'iOS' &&
        position.speed > 2.24 &&
        position.speed < 11.18) messages.ActivityType.BICYCLE;

    return Geo.ACTIVITIES[position.activity.type];
  }

  private makeLocation(position) {
    return new Location(
      position.coords.longitude,
      position.coords.latitude,
      position.coords.accuracy,
      position.coords.altitude,
      position.coords.heading,
      position.coords.speed,
      moment(position.timestamp),
      position.is_moving,
      (position.event) ? Geo.EVENTS[position.event] : null,
      this.getActivity(position),
      position.activity.confidence,
      position.sample === true,
      position.extras && position.extras.watch)
  }

  private onLocation(position) {
    let location = this.makeLocation(position);
    this.log.write('geo', `location: accuracy=${location.accuracy} ` +
      `speed=${location.speed} moving=${location.moving} ` +
      `event=${location.event} activity=${location.activity} ` +
      `confidence=${location.confidence} sample=${location.sample} ` +
      `watch=${location.watch}`)
    this.currentLocation = location;
    if (this.canAutoStop) this.checkAutoStopConditions(location);
    this.locations.next(location);
  }

  private onMotionChange(moving, position) {
    this.motion.next({
      moving: moving,
      automatic: this.didAutoStop
    });
    this.didAutoStop = false;
  }

  private autoStop() {
    this.didAutoStop = true;
    this.setMoving(false);
  }

  private checkAutoStopConditions(location) {
    if (location.speed > 13.41) this.highSpeedCount += 1;
    if (this.highSpeedCount >= 5) {
      this.highSpeedCount = 0;
      this.autoStop();
    } else if (location.activity != messages.ActivityType.BICYCLE) {
      this.stopTimer = window.setTimeout(() => this.autoStop(), 18000);
    } else if (this.stopTimer) {
      clearTimeout(this.stopTimer);
    }
  }

  private getSettings() {
    return {
      activityRecognitionInterval: 10000,
  		activityType: 'Fitness',
      debug: false,
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
      logLevel: (DEBUG) ?
        this.bgGeo.LOG_LEVEL_VERBOSE : this.bgGeo.LOG_LEVEL_OFF,
      maxRecordsToPersist: 0,
  		stationaryRadius: 20,
  		stopTimeout: 3,
      triggerActivities: 'on_bicycle'
  	};
  }

  public clearLogs() {
    if (!DEBUG) return;
    return this.ready().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Removing logs');
        this.bgGeo.destroyLog(resolve, reject);
      });
    });
  }

  public sendLogs(address: string) {
    if (!DEBUG) return;
    return this.ready().then(() => {
      return new Promise((resolve, reject) => {
        this.bgGeo.emailLog(address, resolve);
      });
    });
  }

  public init() {
    this.requestAccuracy();
    this.bgGeo = (<any>window).BackgroundGeolocation;
    if (this.bgGeo) this.bgGeo.configure(
      this.getSettings(), () => {
        this.bgGeo.on('location', this.onLocation.bind(this));
        this.bgGeo.on('motionchange', this.onMotionChange.bind(this));
        this.setReady();
      });
    this.getCurrentLocation();
    this.settings.getPreferences()
      .then((prefs) => this.setGeolocationEnabled(prefs.autoRecord));
    this.events.subscribe('settings:preferences',
      (prefs) => this.setGeolocationEnabled(prefs.autoRecord));
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

  public getCurrentLocation(options?) {
    return this.ready()
      .then(() => {
        return new Promise((resolve, reject) => {
          this.bgGeo.getCurrentPosition(resolve, reject, options);
        });
      }).then((position) => this.makeLocation(position));
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
    this.canAutoStop = !moving;
    if (this.stopTimer) clearTimeout(this.stopTimer);

    return this.ready().then(() => this.getState()).then((state) => {
      return new Promise((resolve, reject) => {
        if ((<any>state).enabled) {
          // Geolocation is enabled (i.e. automatic recording is active).
          if ((<any>state).isMoving === moving) {
            resolve();
          } else {
            this.bgGeo.changePace(moving, resolve, reject);
          }
        } else {
          // Geolocation is disabled, so we need to use watchPosition.
          if (this.isWatching === moving) return resolve();
          this.isWatching = moving;

          if (moving) {
            let settings = this.getSettings();
            this.bgGeo.watchPosition(this.onLocation.bind(this), () => {}, {
              interval: settings.fastestLocationUpdateInterval,
              desiredAccuacy: settings.desiredAccuracy,
              persist: false,
              extras: {
                watch: true
              }
            });
            this.onMotionChange(true, null);
            resolve();
          } else {
            this.bgGeo.stopWatchPosition(() => {
              this.onMotionChange(false, null);
              resolve();
            }, reject);
          }
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
        if (!first) this.onLocation(position);
        if (first || last)
          this.onMotionChange(position.is_moving, position);
        if (first) this.onLocation(position);
      }, (err) => console.log(err));
  }

}
