import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Settings, Preferences, Profile } from '../../app/settings';
import { getOptions, notify } from '../../app/utils';
import { Geo } from '../../app/geo';
import { Remote } from '../../app/remote';
import { CreditsPage } from '../credits/credits';
import { TermsPage } from '../terms/terms';
import { APP_VERSION } from '../../app/config';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  preferences: Preferences;
  profile: Profile;
  ageOptions = getOptions(Settings.AGES);
  experienceOptions = getOptions(Settings.EXPERIENCE_LEVELS);
  genderOptions = getOptions(Settings.GENDERS);
  private version = APP_VERSION;

  constructor(
      private navCtrl: NavController,
      private toastCtrl: ToastController,
      private settings: Settings,
      private remote: Remote,
      private geo: Geo) {
  }

  ionViewWillEnter() {
    this.settings.getPreferences()
      .then((prefs) => this.preferences = prefs);
    this.settings.getProfile()
      .then((profile) => this.profile = profile);
  }

  private explain(message: string) {
    notify(this.toastCtrl, message, 4000);
  }

  private savePreferences() {
    this.settings.savePreferences();
    return this.geo.setGeolocationEnabled(this.preferences.autoRecord);
  }

  private saveProfile() {
    this.settings.saveProfile();
    this.remote.postUser(this.profile);
  }

  private openTerms() {
    this.navCtrl.push(TermsPage);
  }

  private openCredits() {
    this.navCtrl.push(CreditsPage);
  }

}
