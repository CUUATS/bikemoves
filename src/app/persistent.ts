import { ObjectManager } from './object_manager';

export abstract class Persistent {
  public id: number;
  public objects: ObjectManager;

  static getMigrations(toVersion): string[] {
    return [];
  }

  static fromRow(row: any[]): any {

  }

  protected isSaved() {
    return this.id !== null;
  }

  protected getObjectManager(): ObjectManager {
    return (this.constructor as any).objects;
  }

  public toRow(): any[] {
    return [];
  }

  public save() {
    let objects = this.getObjectManager();
    return (this.isSaved()) ? objects.update(this) : objects.insert(this);
  }

  public delete() {
    let objects = this.getObjectManager();
    if (this.isSaved()) return objects.delete(this);
  }

}
