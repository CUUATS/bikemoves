import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BikeMoves } from './app.component';
import { Geo } from './geo';
import { Legacy } from './legacy';
import { Locations } from './locations';
import { Map } from './map';
import { Remote } from './remote';
import { Settings } from './settings';
import { State } from './state';
import { Storage } from './storage';
import { Trips } from './trips';
import { CreditsPage } from '../pages/credits/credits';
import { IncidentFormPage } from '../pages/incident-form/incident-form';
import { MapPage } from '../pages/map/map';
import { SettingsPage } from '../pages/settings/settings';
import { StatsPage } from '../pages/stats/stats';
import { TabsPage } from '../pages/tabs/tabs';
import { TermsPage } from '../pages/terms/terms';
import { TripDetailPage } from '../pages/trip-detail/trip-detail';
import { TripFormPage } from '../pages/trip-form/trip-form';
import { TripsPage } from '../pages/trips/trips';
import { File } from '@ionic-native/file';
import { Device } from '@ionic-native/device';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { ChartistModule } from 'ng-chartist';

@NgModule({
  declarations: [
    BikeMoves,
    CreditsPage,
    IncidentFormPage,
    MapPage,
    SettingsPage,
    StatsPage,
    TabsPage,
    TermsPage,
    TripDetailPage,
    TripFormPage,
    TripsPage
  ],
  imports: [
    IonicModule.forRoot(BikeMoves),
    BrowserModule,
    ChartistModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BikeMoves,
    CreditsPage,
    IncidentFormPage,
    MapPage,
    SettingsPage,
    StatsPage,
    TabsPage,
    TermsPage,
    TripDetailPage,
    TripFormPage,
    TripsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Device,
    File,
    Geo,
    Legacy,
    LocationAccuracy,
    Locations,
    Map,
    Remote,
    Settings,
    State,
    StatusBar,
    SplashScreen,
    SQLite,
    Storage,
    Trips
  ]
})
export class AppModule {}
