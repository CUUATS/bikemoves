import { Storage } from './storage';
import { Persistent } from './persistent';

export class ObjectManager {
  static storage: Storage;

  constructor(
    private model: any,
    private table: string,
    private columns: string[]) {}

  protected column_sql(uid = false) {
    let result = this.columns.join(', ');
    if (uid) return result + ', id';
    return result;
  }

  protected placeholder_sql(uid = false) {
    let n = this.columns.length;
    if (uid) n++;
    return '?, '.repeat(n - 1) + '?';
  }

  protected createWhere(where: Persistent[] | string) {
    if (typeof where === 'string') return where;
    return 'id IN (' + where.map((obj) => obj.id).join(', ') + ')';
  }

  protected db(sql: string, args = []) {
    return ObjectManager.storage.ready().then((db) => db.executeSql(sql, args));
  }

  public insert(obj: Persistent) {
    let sql = `INSERT INTO ${this.table} (${this.column_sql()})
      VALUES (${this.placeholder_sql()})`;
    return this.db(sql, obj.toRow()).then((data) => {
      obj.id = data.insertId;
      return obj;
    });
  }

  public update(obj: Persistent) {
    let columns = this.columns.map((col) => col + ' = ?').join(', '),
      sql = `UPDATE ${this.table} SET ${columns} WHERE id = ?`;
    return this.db(sql, obj.toRow().concat([obj.id])).then((data) => obj);
  }

  public delete(obj: Persistent) {
    let sql = `DELETE FROM ${this.table} WHERE id = ?`;
    return this.db(sql, [obj.id]);
  }

  public batchUpdate(set: string, where: Persistent[] | string) {
    where = this.createWhere(where);
    let sql = `UPDATE ${this.table} SET ${set} WHERE ${where}`;
    return this.db(sql);
  }

  public batchDelete(where: Persistent[] | string) {
    where = this.createWhere(where);
    let sql = `DELETE FROM ${this.table} WHERE ${where}`;
    return this.db(sql);
  }

  public all(order?: string) {
    return this.filter(null, order);
  }

  public filter(where?: string, order?: string) {
    let sql = `SELECT ${this.column_sql(true)} FROM ${this.table}`;
    if (where) sql += ` WHERE ${where}`;
    if (order) sql += ` ORDER BY ${order}`;
    return this.db(sql).then(
      (data) => {
        let results = [];
        for (let i = 0; i < data.rows.length; i++)
          results.push(this.model.fromRow(data.rows.item(i)))
        return results;
      }
    );
  }

  public count(where?: string) {
    let sql = `SELECT count(*) AS row_count FROM ${this.table}`;
    if (where) sql += ` WHERE ${where}`;
    return this.db(sql).then((data) => data.rows.item(0).row_count);
  }
}
