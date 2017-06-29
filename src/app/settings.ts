import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { ObjectManager } from './object_manager';
import { Storage } from './storage';
import { SettingsGroup } from './settings_group';
import { bikemoves as messages } from './messages';

export interface Preferences {
  autoRecord: boolean;
  showTutorial: boolean;
  tripsListView: boolean;
}

export interface Profile {
  age: messages.Age;
  cyclingExperience: messages.ExperienceLevel;
  gender: messages.Gender;
}

@Injectable()
export class Settings extends ObjectManager {
  static PREFERENCES = 'preferences';
  static PROFILE = 'user';
  static GENDERS = [
    'Not Specified',
    'Male',
    'Female',
    'Other'
  ];
  static AGES = [
    'Not Specified',
    'Under 15',
    '15 to 19',
    '20 to 24',
    '25 to 34',
    '35 to 44',
    '45 to 54',
    '55 to 64',
    '65 to 74',
    '75 and older'
  ];
  static EXPERIENCE_LEVELS = [
    'Not Specified',
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  protected table = 'settings';
  protected columns = [
    'name',
    'data'
  ];
  protected cache: any = {};

  constructor(
      private events: Events,
      protected storage: Storage) {
    super();
  }

  protected fromRow(row) {
    let group = new SettingsGroup(row.name, JSON.parse(row.data), row.id);
    this.cache[row.name] = group;
    return group;
  }

  protected toRow(group: SettingsGroup) {
    return [
      group.name,
      JSON.stringify(group.data)
    ];
  }

  private getSettings(name: string, defaults: any = {}) {
    let group = this.cache[name];
    if (group) {
      group.setDefaults(defaults);
      return Promise.resolve(group.data);
    }

    return this.filter('name = ?', null, [name])
      .then((groups) => {
        // Try again to get the group from the cache before overwriting it
        // with changes from the database. Otherwise, we can end up with a
        // race condition when the database is opening and multiple services
        // have requested the same group.
        group = this.cache[name];
        if (!group) {
          group = (groups.length) ? groups[0] : new SettingsGroup(name);
          this.cache[name] = group;
        }
        group.setDefaults(defaults);
        return group.data;
      });
  }

  private saveSettings(name: string) {
    let group = this.cache[name];
    if (!group) return Promise.reject('No settings group named ' + name);
    return this.save(group)
      .then(() => this.events.publish('settings:' + name, group.data));
  }

  public getPreferences(): Promise<Preferences> {
    return this.getSettings(Settings.PREFERENCES, {
      autoRecord: true,
      showTutorial: true,
      tripsListView: true
    });
  }

  public savePreferences() {
    return this.saveSettings(Settings.PREFERENCES);
  }

  public getProfile(): Promise<Profile> {
    return this.getSettings(Settings.PROFILE, {
      age: 0,
      cyclingExperience: 0,
      gender: 0
    });
  }

  public saveProfile() {
    return this.saveSettings(Settings.PROFILE);
  }
}

Storage.addMigration(7, `
  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    name TEXT UNIQUE NOT NULL,
    data TEXT NOT NULL
  )
`);
