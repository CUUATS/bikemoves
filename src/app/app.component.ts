import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geo } from './geo';
import { Legacy } from './legacy';
import { Settings } from './settings';
import { State } from './state';
import { Storage } from './storage';
import { TabsPage } from '../pages/tabs/tabs';
import { DEBUG } from './config';

@Component({
  templateUrl: 'app.html'
})
export class BikeMoves {
  rootPage = TabsPage;

  constructor(
      platform: Platform,
      private geo: Geo,
      private settings: Settings,
      private splashScreen: SplashScreen,
      private state: State,
      private storage: Storage,
      private statusBar: StatusBar,
      private legacy: Legacy) {
    platform.ready().then(() => {
      // Don't initialize native functionality in the browser.
      if (platform.is('core')) return;

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.init();
      this.state.init();
      this.geo.init();
      this.ensureGeolocation();
      this.legacy.upgrade();

      if (DEBUG) (window as any).storage = storage;
    });
  }

  private ensureGeolocation() {
    this.settings.getPreferences()
      .then((prefs) => {
        if (prefs.autoRecord) this.geo.setGeolocationEnabled(true);
      });
  }
}
