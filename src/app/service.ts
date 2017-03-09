
export abstract class Service {
  private _isReady = false;
  private _readyQueue = [];

  protected setReady() {
    this._isReady = true;
    while (this._readyQueue.length) this._readyQueue.shift()();
  }

  public ready() : Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._isReady) {
        resolve.apply(this, this.readyArguments());
      } else {
        this._readyQueue.push(() => resolve.apply(this, this.readyArguments()));
      }
    });
  }

  protected readyArguments() {
    return [];
  }

}
