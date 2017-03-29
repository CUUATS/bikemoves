import { Injectable } from '@angular/core';
import { ObjectManager } from './object_manager';
import { Storage } from './storage';
import { SettingsGroup } from './settings_group';

export interface Preferences {
  autoRecord: boolean;
}

@Injectable()
export class Settings extends ObjectManager {
  static PREFERENCES = 'preferences';
  static USER = 'user';

  protected table = 'settings';
  protected columns = [
    'name',
    'data'
  ];
  protected cache: any = {};

  constructor(protected storage: Storage) {
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
        group = (groups.length) ? groups[0] : new SettingsGroup(name);
        this.cache[name] = group;
        group.setDefaults(defaults);
        return group.data;
      });
  }

  private saveSettings(name: string) {
    let group = this.cache[name];
    if (!group) return Promise.reject('No settings group named ' + name);
    return this.save(group);
  }

  public getPreferences(): Promise<Preferences> {
    return this.getSettings(Settings.PREFERENCES, {
      autoRecord: true
    });
  }

  public savePreferences() {
    return this.saveSettings(Settings.PREFERENCES);
  }
}

Storage.addMigration(7, `
  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    name TEXT UNIQUE NOT NULL,
    data TEXT NOT NULL
  )
`);
