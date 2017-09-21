import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { Log } from '../../app/log';
import { LogEntry } from '../../app/log_entry';

@Component({
  selector: 'page-log',
  templateUrl: 'log.html'
})
export class LogPage {
  private entries: LogEntry[] = [];

  constructor(private log: Log,
    protected events: Events) {
    this.events.subscribe('log:write', (entry) => this.entries.push(entry));
  }

  ionViewWillEnter() {
    this.updateEntries();
  }

  private updateEntries() {
    this.log.read().then((entries) => this.entries = entries);
  }

  private send() {
    this.log.send('bikemoves@cuuats.org');
  }

  private clear() {
    this.log.clear().then(() => this.updateEntries());
  }
}
