import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Settings, Preferences, Profile } from '../../app/settings';
import { getOptions, notify } from '../../app/utils';

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

  constructor(
      private navCtrl: NavController,
      private toastCtrl: ToastController,
      private settings: Settings) {
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
  }

  private saveProfile() {
    this.settings.saveProfile();
  }

}
