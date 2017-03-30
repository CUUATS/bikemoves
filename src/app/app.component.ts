import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Geo } from './geo';
import { Settings } from './settings';
import { Storage } from './storage';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class BikeMoves {
  rootPage = TabsPage;

  constructor(
      platform: Platform,
      private geo: Geo,
      private storage: Storage,
      private settings: Settings) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      storage.init();
      geo.init();
      this.ensureGeolocation();
      (window as any).storage = storage;
    });
  }

  private ensureGeolocation() {
    this.settings.getPreferences()
      .then((prefs) => {
        if (prefs.autoRecord) this.geo.setGeolocationEnabled(true);
      });
  }
}
