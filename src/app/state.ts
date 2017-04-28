import { Injectable } from '@angular/core';
import { Events, Platform } from 'ionic-angular';

@Injectable()
export class State {

  public active = true;

  constructor(
    private platform: Platform,
    private events: Events) {}

  init() {
    this.platform.pause.subscribe(() => this.setActive(false));
    this.platform.resume.subscribe(() => this.setActive(true));
  }

  private setActive(active: boolean) {
    this.active = active;
    this.events.publish('state:active', active);
  }

}
