import { Storage } from './storage';
import { Persistent } from './persistent';

export abstract class ObjectManager {
  protected table: string;
  protected columns: string[];
  protected storage: Storage;

  protected toRow(obj: Persistent): any[] {
    return [];
  }

  protected fromRow(row: any[]) {

  }

  protected createWhere(where: Persistent[] | string) {
    if (typeof where === 'string') return where;
    return 'id IN (' + where.map((obj) => obj.id).join(', ') + ')';
  }

  public save(obj: Persistent) {
    return (obj.id !== null) ? this.update(obj) : this.insert(obj);
  }

  public insert(obj: Persistent) {
    return this.storage.insert(this.table, this.columns, this.toRow(obj))
    .then((data) => {
      obj.id = data.insertId;
      return obj;
    });
  }

  public update(obj: Persistent) {
    return this.storage.update(
        this.table, this.columns, this.toRow(obj).concat([obj.id]), 'id = ?')
      .then((data) => obj);
  }

  public delete(obj: Persistent) {
    return this.storage.delete(this.table, [obj.id], 'id = ?');
  }

  public batchUpdate(columns: string[], values: any[], where: Persistent[] | string) {
    return this.storage.update(
      this.table, columns, values, this.createWhere(where));
  }

  public batchDelete(where: Persistent[] | string, values = []) {
    return this.storage.delete(this.table, values, this.createWhere(where));
  }

  public all(order?: string) {
    return this.filter(null, order);
  }

  public filter(where?: string, order?: string, values = [], limit = 0) {
    return this.storage.select(
        this.table, this.columns.concat(['id']), where, order, values, limit)
      .then((data) => {
        let results = [];
        for (let i = 0; i < data.rows.length; i++)
          results.push(this.fromRow(data.rows.item(i)))
        return results;
      });
  }

  public count(where?: string, values = []) {
    return this.storage.select(
        this.table, ['count(*) AS row_count'], where, null, values)
      .then((data) => data.rows.item(0).row_count);
  }
}
