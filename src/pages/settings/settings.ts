import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Settings, Preferences } from '../../app/settings';
import { notify } from '../../app/utils';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  preferences: Preferences;

  constructor(
      private navCtrl: NavController,
      private toastCtrl: ToastController,
      private settings: Settings) {
  }

  ionViewWillEnter() {
    this.settings.getPreferences()
      .then((prefs) => this.preferences = prefs);
  }

  private explain(message: string) {
    notify(this.toastCtrl, message, 4000);
  }

  private savePreferences() {
    this.settings.savePreferences();
  }

}
