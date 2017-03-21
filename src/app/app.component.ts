import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Geo } from './geo';
import { Storage } from './storage';
import { Trips } from './trips';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class BikeMoves {
  rootPage = TabsPage;

  constructor(platform: Platform, geo: Geo, storage: Storage, trips: Trips) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      storage.init();
      geo.init();
      (window as any).storage = storage;
    });
  }
}
