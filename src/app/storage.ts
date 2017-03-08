import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Service } from './service';
import { Trip } from './trip';

@Injectable()
export class Storage extends Service {
  private db = new SQLite();

  public init() {
    return this.db.openDatabase({
      name: 'bikemoves.db',
      location: 'default'
    }).then(this.initDb.bind(this))
      .then(() => Trip.db = this.db)
      .then(this.setReady.bind(this));
  }

  private initDb() {
    return this.db.sqlBatch([
      Trip.SQL_CREATE_TABLE
    ]);
  }

}
