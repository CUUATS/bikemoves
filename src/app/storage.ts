import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Service } from './service';

export interface Migration {
  version: number;
  sql: string;
  values?: any[];
}

@Injectable()
export class Storage extends Service {
  private static DB_VERSION = 7;
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
  private static migrations: Migration[] = [];

  public static addMigration(version: number, sql: string, values: any[] = []) {
    Storage.migrations.push({
      version: version,
      sql: sql,
      values: values
    });
  }

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    super();
    this.sqlite.create({
      name: 'bikemoves.db',
      location: 'default'
    }).then((db) => this.db = db)
      .then(() => this.migrate())
      .then(() => this.enableForeignKeySupport())
      .then(() => this.setReady());
  }

  private enableForeignKeySupport() {
    return this.db.executeSql('PRAGMA foreign_keys = ON', []);
  }

  private getDBVersionMigration() {
    return {
      version: Storage.DB_VERSION,
      sql: 'INSERT INTO db_version (version) VALUES (?)',
      values: [Storage.DB_VERSION]
    };
  }

  private getMigrations(currentVersion: number) {
    let migrations = Storage.migrations.filter((m) =>
      m.version > currentVersion && m.version <= Storage.DB_VERSION);
    migrations.sort((a, b) => a.version - b.version);
    if (migrations.length) migrations.push(this.getDBVersionMigration());
    return migrations;
  }

  private migrate() {
    return this.db.executeSql(Storage.SQL_CREATE_TABLE, {}).then(
      () => this.db.executeSql(Storage.SQL_GET_VERSION, {})
    ).then((res) => {
      let migrations = this.getMigrations(res.rows.item(0).current);

      if (migrations.length) return this.db.sqlBatch(
        migrations.map((migration) => [migration.sql, migration.values]));
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
