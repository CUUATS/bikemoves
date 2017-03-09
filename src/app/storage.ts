import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Service } from './service';

@Injectable()
export class Storage extends Service {
  private db = new SQLite();

  public init(initSQL) {
    return this.db.openDatabase({
      name: 'bikemoves.db',
      location: 'default'
    }).then(() => this.db.sqlBatch(initSQL))
      .then(() => this.setReady());
  }

  protected readyArguments() {
    return [this.db];
  }

}
