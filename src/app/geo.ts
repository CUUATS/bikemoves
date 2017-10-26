import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Device } from '@ionic-native/device';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Service } from './service';
import { Location } from './location';
import { Log } from './log';
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
  private lastLocation: Location;
  private lastActivity: messages.ActivityType = messages.ActivityType.STILL;
  private highAccuracy = true;
  private highSpeedCount = 0;
  private enabled = false;
  private moving = false;
  private bgMoving = false;
  private activityTimer: number;

  constructor(
      private device: Device,
      private events: Events,
      private locationAccuracy: LocationAccuracy,
      private log: Log,
      private settings: Settings) {
    super();
  }

  private guessActivity(position) {
    if (!position.activity.type) return messages.ActivityType.UNKNOWN;

    // iOS is not reporting the correct activity for biking most of the time,
    // so we guess the activity based on speed. Speeds > 5 MPH and < 25 MPH
    // are considered biking.
    if (this.device.platform == 'iOS' &&
        position.speed > 2.24 &&
        position.speed < 11.18) return messages.ActivityType.BICYCLE;

    return Geo.ACTIVITIES[position.activity.type];
  }

  private onBike(position) {
    return this.guessActivity(position) === messages.ActivityType.BICYCLE;
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
      (position.activity.type) ? Geo.ACTIVITIES[position.activity.type] : null,
      position.activity.confidence,
      position.sample === true)
  }

  private onLocation(position) {
    let location = this.makeLocation(position);
    this.log.write('geo', `location: accuracy=${location.accuracy} ` +
      `speed=${location.speed} moving=${location.moving} ` +
      `event=${location.event} activity=${location.activity} ` +
      `confidence=${location.confidence} sample=${location.sample}`)
    this.lastLocation = location;
    this.lastActivity = this.guessActivity(position);
    this.events.publish('geo:location', location);
    if (this.moving && this.enabled) this.checkAutoStopConditions(location);
  }

  private onMotionChange(moving, position) {
    this.log.write('geo',
      `bg motion change: prev=${this.moving} moving=${moving}`);
    this.bgMoving = moving;
    if (!this.moving && moving && this.onBike(position)) {
      this.clearActivityTimer();
      this.setMoving(true, true);
    } else if (this.moving && !moving) {
      this.setActivityTimer();
    }
  }

  private setActivityTimer() {
    if (this.activityTimer)
      return this.log.write('geo', 'activity timer: already set');

    this.activityTimer = window.setTimeout(() => {
      this.log.write('geo', 'auto stop: activity timer');
      this.setMoving(false, true);
    }, 18000);

    this.log.write('geo', 'activity timer: set');
  }

  private clearActivityTimer() {
    if (!this.activityTimer)
      return this.log.write('geo', 'activity timer: does not exist');
    clearTimeout(this.activityTimer);
    this.activityTimer = undefined;
    this.log.write('geo', 'activity timer: cleared');
  }

  private checkAutoStopConditions(position) {
    let onBike = this.onBike(position);
    if (position.coords.speed > 13.41) {
      this.highSpeedCount += 1;
      this.log.write('geo', 'high speed count: ' + this.highSpeedCount);
    }
    if (this.highSpeedCount >= 5) {
      this.highSpeedCount = 0;
      this.log.write('geo', 'auto stop: high speed count');
      this.setMoving(false, true);
    } else if (onBike) {
      this.clearActivityTimer();
    } else if (!onBike) {
      this.setActivityTimer();
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

  // public clearLogs() {
  //   if (!DEBUG) return;
  //   return this.ready().then(() => {
  //     return new Promise((resolve, reject) => {
  //       this.bgGeo.destroyLog(resolve, reject);
  //     });
  //   });
  // }
  //
  // public sendLogs(address: string) {
  //   if (!DEBUG) return;
  //   return this.ready().then(() => {
  //     return new Promise((resolve, reject) => {
  //       this.bgGeo.emailLog(address, resolve);
  //     });
  //   });
  // }

  public init() {
    this.requestAccuracy();
    this.bgGeo = (<any>window).BackgroundGeolocation;
    if (this.bgGeo) this.bgGeo.configure(
      this.getSettings(), (state) => {
        this.enabled = state.enabled;
        this.bgMoving = state.isMoving;
        this.moving = state.isMoving;
        this.bgGeo.on('location', this.onLocation.bind(this));
        this.bgGeo.on('motionchange', this.onMotionChange.bind(this));
        this.setReady();
        this.clearActivityTimer();
        this.setMoving(this.moving, true);
      });
    this.getCurrentLocation();
    this.settings.getPreferences()
      .then((prefs) => this.setEnabled(prefs.autoRecord));
    this.events.subscribe('settings:preferences',
      (prefs) => this.setEnabled(prefs.autoRecord));
  }

  public getHighAccuracy() {
    return this.highAccuracy;
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

  public getLastActivity() {
    return this.lastActivity;
  }

  public getLastLocation() {
    return this.lastLocation;
  }

  public getCurrentLocation(options?) {
    return this.ready()
      .then(() => {
        return new Promise((resolve, reject) => {
          this.bgGeo.getCurrentPosition(resolve, reject, options);
        });
      }).then((position) => this.makeLocation(position));
  }

  public getEnabled() {
    return this.enabled;
  }

  public setEnabled(enabled) {
    return this.ready().then(() => {
      return new Promise((resolve, reject) => {
        if (this.enabled === enabled) return resolve();
        if (enabled) {
          this.bgGeo.start(resolve);
        } else {
          this.bgGeo.stop(resolve);
        }
      });
    }).then(() => {
      this.enabled = enabled;
      this.log.write('geo', `set enabled: ${enabled}`);
    });
  }

  public getMoving() {
    return this.moving;
  }

  public setMoving(moving, automatic = false) {
    return this.ready().then(() => {
      return new Promise((resolve, reject) => {
        if (this.moving === moving) return resolve();
        if (this.enabled) {
          // Background geolocation is enabled.
          if (this.bgMoving === moving) return resolve();
          this.bgGeo.changePace(moving, resolve, reject);
        } else if (moving) {
          // Background geolocation is disabled.
          let settings = this.getSettings();
          this.bgGeo.watchPosition(this.onLocation.bind(this), () => {}, {
            interval: settings.fastestLocationUpdateInterval,
            desiredAccuacy: settings.desiredAccuracy,
            persist: false
          });
          resolve();
        } else {
          this.bgGeo.stopWatchPosition(resolve, reject);
        }
      });
    }).then(() => {
      this.moving = moving;
      if (!moving) this.lastActivity = messages.ActivityType.STILL;
      this.events.publish('geo:motion', {
        moving: moving,
        automatic: automatic
      });
      this.log.write('geo',
        `set moving: moving=${moving} automatic=${automatic}`);
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
