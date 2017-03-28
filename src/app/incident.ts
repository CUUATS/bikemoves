import { Location } from './location';
import * as moment from 'moment';

export class Incident {
  constructor(
    public location: Location,
    public category: string = null,
    public time: moment.Moment = moment(),
    public comment: string = null
  ) {}
}
