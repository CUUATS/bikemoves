import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { File } from '@ionic-native/file';
import { Geo } from './geo';
import { Storage } from './storage';
import { Trips } from './trips';
import { TabsPage } from '../pages/tabs/tabs';
import { Persistent } from './persistent';

@Component({
  templateUrl: 'app.html'
})
export class BikeMoves {
  rootPage = TabsPage;

  constructor(platform: Platform, geo: Geo, storage: Storage, trips: Trips, file: File) {
    platform.ready().then(() => {
      Persistent.file = file;
      StatusBar.styleDefault();
      Splashscreen.hide();
      storage.init();
      geo.init();
      (window as any).storage = storage;
    });
  }
}
