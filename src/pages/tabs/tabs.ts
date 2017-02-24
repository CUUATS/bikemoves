import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';
import { StatsPage } from '../stats/stats';
import { TripsPage } from '../trips/trips';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  mapRoot: any = MapPage;
  settingsRoot: any = SettingsPage;
  statsRoot: any = StatsPage;
  tripsRoot: any = TripsPage;

  constructor() {

  }
}
