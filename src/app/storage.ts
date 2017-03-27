import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Service } from './service';

export interface Migration {
  version: number;
  sql: string;
}

@Injectable()
export class Storage extends Service {
  private static DB_VERSION = 6;
  private static SQL_CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS db_version (
      id INTEGER PRIMARY KEY ASC NOT NULL,
      version INTEGER NOT NULL DEFAULT 0
    )
  `;
  private static SQL_GET_VERSION = `
    SELECT ifnull(max(version), 0) AS current
    FROM db_version
  `;
  private static SQL_INSERT_VERSION = 'INSERT INTO db_version (version) VALUES (?)';
  private static migrations: Migration[] = [];

  public static addMigration(version, sql) {
    Storage.migrations.push({
      version: version,
      sql: sql
    });
  }

  private db = new SQLite();

  public init() {
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

      Storage.migrations.forEach((migration) => {
        if (migration.version > current &&
            migration.version <= Storage.DB_VERSION)
          migrations.push(migration);
      });

      migrations.sort((a, b) => a.version - b.version);

      if (migrations.length) {
        migrations.push([Storage.SQL_INSERT_VERSION, [Storage.DB_VERSION]]);
        return this.db.sqlBatch(migrations);
      }
    });
  }

  protected readyArguments() {
    return [this.db];
  }

  protected placeholders(n) {
    return '?, '.repeat(n - 1) + '?';
  }

  public exec(sql: string, args = []) {
    return this.ready().then((db) => db.executeSql(sql, args));
  }

  public select(table: string, columns: string[], where?: string, order?: string, values = [], limit = 0) {
    let sql = `SELECT ${columns.join(', ')} FROM ${table}`;
    if (where) sql += ` WHERE ${where}`;
    if (order) sql += ` ORDER BY ${order}`;
    if (limit) sql += ` LIMIT ${limit}`;
    return this.exec(sql, values);
  }

  public insert(table: string, columns: string[], values: any[]) {
    let sql = `INSERT INTO ${table} (${columns.join(', ')})
      VALUES (${this.placeholders(columns.length)})`;
    return this.exec(sql, values);
  }

  public update(table: string, columns: string[], values: any[], where?: string) {
    let cols = columns.map((col) => col + ' = ?').join(', '),
      sql = `UPDATE ${table} SET ${cols}`;
    if (where) sql += ` WHERE ${where}`;
    return this.exec(sql, values);
  }

  public delete(table: string, values = [], where?: string) {
    let sql = `DELETE FROM ${table}`;
    if (where) sql += ` WHERE ${where}`;
    return this.exec(sql, values);
  }

  public debugSql(sql, args = {}) {
    this.ready()
      .then(() => this.db.executeSql(sql, args))
      .then((res) => {
        if (res.rows.length) {
          for (let i=0; i < res.rows.length; i++) {
            console.log(res.rows.item(i));
          }
        }
      });
  }

}
