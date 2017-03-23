import { Component } from '@angular/core';

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

  constructor(private geo: Geo, private trips: Trips) {
    geo.motion.subscribe(this.onMotion.bind(this));
  }

  ionViewWillEnter() {
    this.updateTripsBadge();
  }

  onMotion(moving) {
    if (!moving) this.updateTripsBadge();
  }

  public updateTripsBadge() {
    this.trips.count('submitted = ?', [0])
      .then((count) => this.unsubmittedTripsCount = (count > 0) ? count : null);
  }
}
