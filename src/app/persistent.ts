import { Storage } from './storage';

export abstract class Persistent {

  public id: number;
  static SQL_TABLE: string;
  static SQL_COLUMNS: string[];
  static storage: Storage;

  static getMigrations(toVersion): string[] {
    return [];
  }

  static get(table, columns, where?: string, order?: string) {
    let cols = columns.concat(['id']).join(', '),
      sql = `SELECT ${cols} FROM ${table}`;
    if (where) sql += ` WHERE ${where}`;
    if (order) sql += ` ORDER BY ${order}`;
    console.log(sql);
    return this.storage.ready().then(
      (db) => db.executeSql(sql, {})).then(
      (data) => {
        let results = [];
        for (let i = 0; i < data.rows.length; i++)
          results.push(data.rows.item(i))
        console.log('Get results', results);
        return results;
      }
    );
  }

  protected insertRow() {
    let table = this.getTable(),
      columns = this.getColumns().join(', '),
      values = '?, '.repeat(this.getColumns().length - 1) + '?',
      sql = 'INSERT INTO ' + table + ' (' + columns + ') VALUES (' +
        values +')';
    return Persistent.storage.ready().then(
      (db) => db.executeSql(sql, this.toRow())).then(
      (data) => this.id = data.id
    );
  }

  protected updateRow() {
    let table = this.getTable(),
      columns = this.getColumns().map((col) => col + ' = ?').join(', '),
      sql = 'UPDATE ' + table + ' SET ' + columns + ' WHERE id = ?';
    return Persistent.storage.ready().then(
      (db) => db.executeSql(sql, this.toRow().concat([this.id])));
  }

  protected getTable() {
    return (this.constructor as any).SQL_TABLE;
  }

  protected getColumns() {
    return (this.constructor as any).SQL_COLUMNS;
  }

  protected toRow(): any[] {
    return [];
  }

  public save() {
    return (this.id) ? this.updateRow() : this.insertRow();
  }

}
