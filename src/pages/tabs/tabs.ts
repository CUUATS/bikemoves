import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';
import { StatsPage } from '../stats/stats';
import { TripsPage } from '../trips/trips';
import { Trips } from '../../app/trips';
import { Geo } from '../../app/geo';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  mapRoot: any = MapPage;
  settingsRoot: any = SettingsPage;
  statsRoot: any = StatsPage;
  tripsRoot: any = TripsPage;
  unsubmittedTripsCount: number;
  canLeaveMap = true;

  constructor(
      private geo: Geo,
      private trips: Trips,
      private events: Events) {
    geo.motion.subscribe(this.onMotion.bind(this));
    this.events.subscribe('map:state', this.onMapState.bind(this));
  }

  ionViewWillEnter() {
    this.updateTripsBadge();
  }

  onMotion(moving) {
    if (!moving) this.updateTripsBadge();
  }

  onMapState(state: string) {
    this.canLeaveMap = (state === MapPage.STATE_STOPPED);
  }

  public updateTripsBadge() {
    this.trips.count('submitted = ?', [0])
      .then((count) => this.unsubmittedTripsCount = (count > 0) ? count : null);
  }
}
