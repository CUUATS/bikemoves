import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';
import { StatsPage } from '../stats/stats';
import { TripsPage } from '../trips/trips';
import { Trips } from '../../app/trips';

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
      private trips: Trips,
      private events: Events) {
    this.events.subscribe('map:state', this.onMapState.bind(this));
    this.events.subscribe('trip:save', this.updateTripsBadge.bind(this));
    this.events.subscribe('trip:delete', this.updateTripsBadge.bind(this));
  }

  ionViewWillEnter() {
    this.updateTripsBadge();
  }

  private onMapState(state: string) {
    this.canLeaveMap = (state === MapPage.STATE_STOPPED);
  }

  private updateTripsBadge() {
    this.trips.count('submitted = ?', [0])
      .then((count) => this.unsubmittedTripsCount = (count > 0) ? count : null);
  }
}
