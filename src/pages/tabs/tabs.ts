import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';
import { StatsPage } from '../stats/stats';
import { TripsPage } from '../trips/trips';
import { Trip } from '../../app/trip';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  mapRoot: any = MapPage;
  settingsRoot: any = SettingsPage;
  statsRoot: any = StatsPage;
  tripsRoot: any = TripsPage;
  unsubmittedTripsCount: number;

  constructor() {
  }

  ionViewWillEnter() {
    this.updateTripsBadge();
  }

  public updateTripsBadge() {
    Trip.objects.count('submitted = 0')
      .then((count) => this.unsubmittedTripsCount = (count > 0) ? count : null);
  }
}
