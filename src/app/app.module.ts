import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BikeMoves } from './app.component';
import { Geo } from './geo';
import { Locations } from './locations';
import { Storage } from './storage';
import { Trips } from './trips';
import { MapPage } from '../pages/map/map';
import { SettingsPage } from '../pages/settings/settings';
import { StatsPage } from '../pages/stats/stats';
import { TabsPage } from '../pages/tabs/tabs';
import { TripDetailPage } from '../pages/trip-detail/trip-detail';
import { TripsPage } from '../pages/trips/trips';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    BikeMoves,
    MapPage,
    SettingsPage,
    StatsPage,
    TabsPage,
    TripDetailPage,
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
    TripDetailPage,
    TripsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    Geo,
    Locations,
    Storage,
    Trips
  ]
})
export class AppModule {}
