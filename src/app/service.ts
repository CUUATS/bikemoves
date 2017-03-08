
export class Service {
  private _isReady = false;
  private _readyQueue = [];

  protected setReady() {
    this._isReady = true;
    while (this._readyQueue.length) this._readyQueue.shift()();
  }

  public ready() {
    return new Promise((resolve, reject) => {
      if (this._isReady) {
        resolve();
      } else {
        this._readyQueue.push(resolve);
      }
    });
  }
}
