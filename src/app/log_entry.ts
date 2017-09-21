import { Persistent } from './persistent';
import * as moment from 'moment';

export class LogEntry extends Persistent {

  constructor(
    public time: moment.Moment = null,
    public category: string = null,
    public message: string = null,
    public id: number = null) {
      super();
  }

}
