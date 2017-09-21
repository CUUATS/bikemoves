import { Component, ChangeDetectorRef } from '@angular/core';
import { Events, ModalController, NavController, PopoverController }
  from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';
import { Geo } from '../../app/geo';
import { Location } from '../../app/location';
import { Locations } from '../../app/locations';
import { Map, MapOptions } from '../../app/map';
import { Path } from '../../app/path';
import { Settings, Preferences } from '../../app/settings';
import { State } from '../../app/state';
import { IncidentFormPage } from '../incident-form/incident-form';
import { bikemoves as messages } from '../../app/messages';
import { LegendPage } from '../legend/legend';
import { TripStats, TripStatsProvider } from '../../app/stats';
import { TutorialPage } from '../tutorial/tutorial';
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
  private incidentLocation: Location;
  private stateChangePending = false;
  private startTime: moment.Moment;
  private duration = moment.duration(0);
  private distance = 0;
  private stats: TripStats;
  private timer = Observable.timer(1000, 1000);
  private tick: Subscription;
  private isActiveTab = false;

  constructor(private navCtrl: NavController,
      private cdr: ChangeDetectorRef,
      private geo: Geo,
      private map: Map,
      private modalCtrl: ModalController,
      private events: Events,
      private locationManager: Locations,
      private popoverCtrl: PopoverController,
      private settings: Settings,
      private appState: State) {
    this.stats = new TripStats(this);
    this.events.subscribe('state:active', this.onActiveChange.bind(this));
    map.click.subscribe(this.onClick.bind(this));
    this.events.subscribe('geo:motion', this.onMotion.bind(this));
    this.events.subscribe('geo:location', this.onLocation.bind(this));
  }

  ionViewDidEnter() {
    this.initMap();
    this.isActiveTab = true; // Only set AFTER the map is initialized.
    this.updateMap();
    this.showTutorial();
  }

  ionViewWillLeave() {
    this.isActiveTab = false;
  }

  private showTutorial() {
    this.settings.getPreferences().then((prefs: Preferences) => {
      if (prefs.showTutorial) {
        let tutorialModal = this.modalCtrl.create(TutorialPage, {modal: true});
        tutorialModal.present();
        prefs.showTutorial = false;
        this.settings.savePreferences();
      }
    });
  }

  private initMap() {
    let options: MapOptions = {};
    options.interactive = true;
    let lastLocation = this.geo.getLastLocation();
    if (lastLocation) {
      options.icons = [
        {
          type: 'current',
          location: lastLocation
        }
      ];
      options.center = lastLocation;
    }
    this.map.assign('map', options);
  }

  public isStopped() {
    return this.state === MapPage.STATE_STOPPED;
  }

  public isRecording() {
    return this.state === MapPage.STATE_RECORDING;
  }

  public isReporting() {
    return this.state === MapPage.STATE_REPORTING;
  }

  public isStill() {
    return this.geo.getLastActivity() === messages.ActivityType.STILL;
  }

  public isOnFoot() {
    let activity = this.geo.getLastActivity();
    return activity === messages.ActivityType.FOOT ||
      activity === messages.ActivityType.WALK ||
      activity === messages.ActivityType.RUN;
  }

  public isOnBicycle() {
    return this.geo.getLastActivity() === messages.ActivityType.BICYCLE;
  }

  public isInVehicle() {
    return this.geo.getLastActivity() === messages.ActivityType.VEHICLE;
  }

  public isUnknownActivity() {
    return this.geo.getLastActivity() === messages.ActivityType.UNKNOWN;
  }

  private setState(state: string) {
    this.state = state;
    this.events.publish('map:state', this.state);
  }

  private updateMap() {
    this.locationManager.filter('trip_id IS NULL', 'time ASC')
      .then((locations) => {
        this.map.path = new Path(locations);
        this.updateDistanceActivity();
      });
    let lastLocation = this.geo.getLastLocation();
    if (lastLocation) this.map.center = lastLocation;
    this.updateIcons();
  }

  private isMapVisible() {
    return this.appState.active && this.isActiveTab;
  }

  private onActiveChange(active: boolean) {
    if (this.isMapVisible()) this.updateMap();
    this.updateTimerSubscription();
  }

  private onLocation(location) {
    if (!this.isMapVisible()) return;
    this.map.center = location;
    this.updateIcons();
    if (this.isRecording()) this.map.addLocation(location);
    this.updateDistanceActivity();
  }

  private onMotion(movement) {
    let moving = movement.moving;
    this.stateChangePending = false;
    this.setStateFromMoving(moving);
    this.startTime = (moving) ? moment() : null;
    this.duration = moment.duration(0);
    this.updateDistanceActivity();
    this.updateTimerSubscription();
    // Clear the map path if motion has stopped and the map is visible.
    if (!moving && this.isMapVisible()) this.map.path = null;
    // Select the map tab if a trip is in progress.
    if (moving && !this.isActiveTab) this.navCtrl.parent.select(0);
  }

  private setStateFromMoving(moving) {
    this.setState((moving) ? MapPage.STATE_RECORDING : MapPage.STATE_STOPPED);
    // Force the UI to update.
    this.cdr.detectChanges();
  }

  private onClick(location: Location) {
    if (!this.isReporting()) return;
    this.incidentLocation = location;
    this.updateIcons();
  }

  private updateIcons() {
    if (!this.map) return;
    let icons = [],
      lastLocation = this.geo.getLastLocation();
    if (lastLocation && !this.isReporting()) icons.push({
      type: 'current',
      location: lastLocation
    });
    if (this.isReporting() && this.incidentLocation) icons.push({
      type: 'incident',
      location: this.incidentLocation
    });
    this.map.icons = icons;
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
  }

  startRecording() {
    this.stateChangePending = true;
    this.geo.setMoving(true);
  }

  stopRecording() {
    this.stateChangePending = true;
    this.geo.setMoving(false);
  }

  startReporting() {
    this.setState(MapPage.STATE_REPORTING);
    this.map.interactive = false;
    this.updateIcons();
  }

  stopReporting() {
    this.setState(MapPage.STATE_STOPPED);
    this.map.interactive = true;
    this.incidentLocation = null;
    this.updateIcons();
  }

  showIncidentForm() {
    let incidentModal = this.modalCtrl.create(
      IncidentFormPage, this.incidentLocation);
    incidentModal.onWillDismiss(() => this.stopReporting());
    incidentModal.present();
  }

  showLegend() {
    let legendPopover = this.popoverCtrl.create(LegendPage);
    legendPopover.present();
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
