import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BikeMoves } from './app.component';
import { Geo } from './geo';
import { Locations } from './locations';
import { Map } from './map';
import { Remote } from './remote';
import { Storage } from './storage';
import { Trips } from './trips';
import { IncidentFormPage } from '../pages/incident-form/incident-form';
import { MapPage } from '../pages/map/map';
import { SettingsPage } from '../pages/settings/settings';
import { StatsPage } from '../pages/stats/stats';
import { TabsPage } from '../pages/tabs/tabs';
import { TripDetailPage } from '../pages/trip-detail/trip-detail';
import { TripFormPage } from '../pages/trip-form/trip-form';
import { TripsPage } from '../pages/trips/trips';
import { File } from '@ionic-native/file';
import { Device } from '@ionic-native/device';

@NgModule({
  declarations: [
    BikeMoves,
    IncidentFormPage,
    MapPage,
    SettingsPage,
    StatsPage,
    TabsPage,
    TripDetailPage,
    TripFormPage,
    TripsPage
  ],
  imports: [
    IonicModule.forRoot(BikeMoves),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BikeMoves,
    IncidentFormPage,
    MapPage,
    SettingsPage,
    StatsPage,
    TabsPage,
    TripDetailPage,
    TripFormPage,
    TripsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Device,
    File,
    Geo,
    Locations,
    Map,
    Remote,
    Storage,
    Trips
  ]
})
export class AppModule {}
