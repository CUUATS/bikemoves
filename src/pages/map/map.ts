import { Component, ChangeDetectorRef } from '@angular/core';
import { Events, ModalController, NavController } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';
import { Geo } from '../../app/geo';
import { Location } from '../../app/location';
import { Locations } from '../../app/locations';
import { Map, MapOptions } from '../../app/map';
import { Marker } from '../../app/marker';
import { Path } from '../../app/path';
import { Settings, Preferences } from '../../app/settings';
import { State } from '../../app/state';
import { IncidentFormPage } from '../incident-form/incident-form';
import { bikemoves as messages } from '../../app/messages';
import { TripStats, TripStatsProvider } from '../../app/stats';
import { TripDetailPage } from '../trip-detail/trip-detail';
import { MILE } from '../../app/utils';
import * as moment from 'moment';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements TripStatsProvider {
  static STATE_STOPPED = 'stopped';
  static STATE_RECORDING = 'recording';
  static STATE_REPORTING = 'reporting';

  private state = MapPage.STATE_STOPPED;
  private currentMarker: Marker;
  private incidentMarker: Marker;
  private stateChangePending = false;
  private activity: messages.ActivityType;
  private startTime: moment.Moment;
  private duration = moment.duration(0);
  private distance = 0;
  private stats: TripStats;
  private timer = Observable.timer(1000, 1000);
  private tick: Subscription;

  constructor(private navCtrl: NavController,
      private cdr: ChangeDetectorRef,
      private geo: Geo,
      private map: Map,
      private modalCtrl: ModalController,
      private events: Events,
      private locationManager: Locations,
      private settings: Settings,
      private appState: State) {
    this.stats = new TripStats(this);
    this.events.subscribe('trip:save', this.navigateToTripDetail.bind(this));
    this.events.subscribe('state:active', this.onActiveChange.bind(this));
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

  private isStill() {
    return this.activity === messages.ActivityType.STILL;
  }

  private isOnFoot() {
    return this.activity === messages.ActivityType.FOOT ||
      this.activity === messages.ActivityType.WALK ||
      this.activity === messages.ActivityType.RUN;
  }

  private isOnBicycle() {
    return this.activity === messages.ActivityType.BICYCLE;
  }

  private isInVehicle() {
    return this.activity === messages.ActivityType.VEHICLE;
  }

  private isUnknownActivity() {
    return this.activity === messages.ActivityType.UNKNOWN;
  }

  private setState(state: string) {
    this.state = state;
    this.events.publish('map:state', this.state);
  }

  private addOrMoveMarker(location: Location) {
    if (this.currentMarker) {
      this.currentMarker.location = location;
    } else {
      this.currentMarker = this.map.addMarker(location, Marker.CURRENT);
    }
  }

  private onActiveChange(active: boolean) {
    this.appState.active = active;
    if (this.appState.active) {
      this.locationManager.filter('trip_id IS NULL', 'time ASC')
        .then((locations) => {
          this.map.path = new Path(locations);
          this.updateDistanceActivity();
        });
      if (this.geo.currentLocation) {
        this.addOrMoveMarker(this.geo.currentLocation);
        this.map.center = this.geo.currentLocation;
      }
    }
    this.updateTimerSubscription();
  }

  private onLocation(location) {
    if (!this.map || !this.appState.active) return;
    this.map.center = location;
    this.addOrMoveMarker(location);
    if (this.isRecording()) this.map.addLocation(location);
    this.updateDistanceActivity();
  }

  private onMotion(moving) {
    this.stateChangePending = false;
    this.setStateFromMoving(moving);
    if (!moving) this.map.path = null;
    this.startTime = (moving) ? moment() : null;
    this.duration = moment.duration(0);
    this.updateDistanceActivity();
    this.updateTimerSubscription();
  }

  private setStateFromMoving(moving) {
    this.setState((moving) ? MapPage.STATE_RECORDING : MapPage.STATE_STOPPED);
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

  private updateTimerSubscription() {
    if (this.appState.active && this.isRecording() && !this.tick) {
      this.tick = this.timer.subscribe(() => this.updateDuration());
    } else if (this.tick) {
      this.tick.unsubscribe();
      this.tick = null;
    }
  }

  private updateDuration() {
    this.duration = (this.startTime) ?
      moment.duration(moment().diff(this.startTime)) : moment.duration(0);
    this.cdr.detectChanges();
  }

  private updateDistanceActivity() {
    this.distance = this.map.path.distance;
    this.activity = (this.geo.currentLocation) ?
      this.geo.currentLocation.activity : messages.ActivityType.STILL;
  }

  private navigateToTripDetail(saveInfo) {
    if (saveInfo.insert && this.appState.active) this.navCtrl.parent.select(1);
  }

  startRecording() {
    this.stateChangePending = true;
    return this.geo.setGeolocationEnabled(true)
      .then(() => this.geo.setMoving(true));
  }

  stopRecording() {
    this.stateChangePending = true;
    let stopMoving = this.geo.setMoving(false),
      getPrefs = this.settings.getPreferences();
    return Promise.all([getPrefs, stopMoving])
      .then((res) => {
        if (!(res[0] as Preferences).autoRecord)
          return this.geo.setGeolocationEnabled(false);
      });
  }

  startReporting() {
    this.setState(MapPage.STATE_REPORTING);
    this.map.interactive = false;
    if (this.currentMarker) this.currentMarker.hide();
  }

  stopReporting() {
    this.setState(MapPage.STATE_STOPPED);
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

  getDuration() {
    return this.duration;
  }

  getDistance() {
    return this.distance * MILE;
  }

  getSpeed() {
    return 0;
  }

  getCalories() {
    return 0;
  }

}
