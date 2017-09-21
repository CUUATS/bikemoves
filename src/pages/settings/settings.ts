import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Geo } from '../../app/geo';
import { Settings, Preferences, Profile } from '../../app/settings';
import { getOptions, notify } from '../../app/utils';
import { Remote } from '../../app/remote';
import { CreditsPage } from '../credits/credits';
import { LogPage } from '../log/log';
import { TermsPage } from '../terms/terms';
import { TutorialPage } from '../tutorial/tutorial';
import { APP_VERSION, DEBUG } from '../../app/config';

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
  public debug = DEBUG;

  constructor(
      private geo: Geo,
      private navCtrl: NavController,
      private toastCtrl: ToastController,
      private settings: Settings,
      private remote: Remote) {
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

  public openLog() {
    this.navCtrl.push(LogPage);
  }

  // public clearLogs() {
  //   this.geo.clearLogs()
  //     .then(() => console.log('Logs removed'))
  //     .then(() => notify(this.toastCtrl, 'Geolocation logs cleared.'));
  // }
  //
  // public sendLogs() {
  //   this.geo.sendLogs('bikemoves@cuuats.org');
  // }

}
