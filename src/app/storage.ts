import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Service } from './service';
import { Persistent } from './persistent';
import { Trip } from './trip';
import { Location } from './location';

@Injectable()
export class Storage extends Service {
  static MODELS = [Trip, Location];
  static DB_VERSION = 1;
  static SQL_CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS db_version (
      id INTEGER PRIMARY KEY ASC NOT NULL,
      version INTEGER NOT NULL DEFAULT 0
    )
  `;
  static SQL_GET_VERSION = `
    SELECT ifnull(max(version), 0) AS current
    FROM db_version
  `;
  static SQL_INSERT_VERSION = 'INSERT INTO db_version (version) VALUES (?)';
  private db = new SQLite();

  public init() {
    Persistent.storage = this;
    return this.db.openDatabase({
      name: 'bikemoves.db',
      location: 'default'
    }).then(() => this.migrate())
      .then(() => this.setReady());
  }

  private migrate() {
    return this.db.executeSql(Storage.SQL_CREATE_TABLE, {}).then(
      () => this.db.executeSql(Storage.SQL_GET_VERSION, {})
    ).then((res) => {
      let current = res.rows.item(0).current,
        migrations = [];

      while (current < Storage.DB_VERSION) {
        current++;
        for (let model of Storage.MODELS)
          migrations = migrations.concat(model.getMigrations(current));
      }

      if (migrations.length) {
        migrations.push([Storage.SQL_INSERT_VERSION, [Storage.DB_VERSION]]);
        return this.db.sqlBatch(migrations);
      }
    });
  }

  protected readyArguments() {
    return [this.db];
  }

  public debugSql(sql, args = {}) {
    this.ready()
      .then(() => this.db.executeSql(sql, args))
      .then((res) => console.log(res));
  }

}
