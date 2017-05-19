import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Settings, Preferences, Profile } from '../../app/settings';
import { getOptions, notify } from '../../app/utils';
import { Geo } from '../../app/geo';
import { Remote } from '../../app/remote';
import { CreditsPage } from '../credits/credits';
import { TermsPage } from '../terms/terms';
import { TutorialPage } from '../tutorial/tutorial';
import { APP_VERSION } from '../../app/config';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  public preferences: Preferences;
  public profile: Profile;
  public ageOptions = getOptions(Settings.AGES);
  public experienceOptions = getOptions(Settings.EXPERIENCE_LEVELS);
  public genderOptions = getOptions(Settings.GENDERS);
  public version = APP_VERSION;

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

  public explain(message: string) {
    notify(this.toastCtrl, message, 4000);
  }

  public savePreferences() {
    this.settings.savePreferences();
    return this.geo.setGeolocationEnabled(this.preferences.autoRecord);
  }

  public saveProfile() {
    this.settings.saveProfile();
    this.remote.postUser(this.profile);
  }

  public openTutorial() {
    this.navCtrl.push(TutorialPage);
  }

  public openTerms() {
    this.navCtrl.push(TermsPage);
  }

  public openCredits() {
    this.navCtrl.push(CreditsPage);
  }

}
