import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BikeMoves } from './app.component';
import { Geo } from './geo';
import { Storage } from './storage';
import { MapPage } from '../pages/map/map';
import { SettingsPage } from '../pages/settings/settings';
import { StatsPage } from '../pages/stats/stats';
import { TabsPage } from '../pages/tabs/tabs';
import { TripsPage } from '../pages/trips/trips';

@NgModule({
  declarations: [
    BikeMoves,
    MapPage,
    SettingsPage,
    StatsPage,
    TabsPage,
    TripsPage
  ],
  imports: [
    IonicModule.forRoot(BikeMoves)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BikeMoves,
    MapPage,
    SettingsPage,
    StatsPage,
    TabsPage,
    TripsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geo,
    Storage
  ]
})
export class AppModule {}
