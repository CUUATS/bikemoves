import { Storage } from './storage';

export abstract class Persistent {

  public id: number;
  static storage: Storage;

  static getMigrations(toVersion): string[] {
    return [];
  }

  protected insertRow() {
    let table = this.getTable(),
      columns = this.getColumns().join(', '),
      values = '?, '.repeat(this.getColumns().length - 1) + '?',
      sql = 'INSERT INTO ${table} (${columns}) VALUES (${values})';
    return Persistent.storage.ready().then(
      (db) => db.executeSql(sql, this.getRow())).then(
      (data) => this.id = data.id
    );
  }

  protected updateRow() {
    let table = this.getTable(),
      columns = this.getColumns().map((col) => col + ' = ?').join(', '),
      sql = 'UPDATE ${table} SET ${columns} WHERE id = ?';
    return Persistent.storage.ready().then(
      (db) => db.executeSql(sql, this.getRow().concat([this.id])));
  }

  public save() {
    return (this.id) ? this.updateRow() : this.insertRow();
  }

  protected getTable(): string {
    return '';
  }

  protected getColumns(): string[] {
    return [];
  }

  protected getRow(): any[] {
    return [];
  }

}
