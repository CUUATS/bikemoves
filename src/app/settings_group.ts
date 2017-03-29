import { Persistent } from './persistent';

export class SettingsGroup extends Persistent {
  constructor(
    public name: string,
    public data: any = {},
    public id: number = null) {
      super();
  }

  public setDefaults(defaults: any) {
    for (const key in defaults)
      if (!this.data.hasOwnProperty(key)) this.data[key] = defaults[key];
  }
}
