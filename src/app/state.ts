import { Injectable } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { Log } from './log';

@Injectable()
export class State {

  public active = true;

  constructor(
    private platform: Platform,
    private events: Events,
    private log: Log) {}

  init() {
    this.platform.pause.subscribe(() => this.setActive(false));
    this.platform.resume.subscribe(() => this.setActive(true));
  }

  private setActive(active: boolean) {
    this.active = active;
    this.log.write('state', `active=${active}`);
    this.events.publish('state:active', active);
  }

}
