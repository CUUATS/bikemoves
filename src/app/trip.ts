import { Location } from './location';
import { Persistent } from './persistent';
import { CURRENT_VERSION } from './utils';
import * as moment from 'moment';

export class Trip extends Persistent {
  static NEAR_THESHOLD = 500; // Maximum distance for location guesses, in meters
  static SIMPLIFY_TOLERANCE = 0.0002; // degrees

  static fromLocations(locations: Location[]) {
    let trip = new Trip();
    trip.startTime = locations[0].time;
    trip.endTime = locations[locations.length - 1].time;
    for (let i = 1; i < locations.length; i++)
      trip.distance += locations[i-1].distanceTo(locations[i]);
    return trip;
  }

  constructor(
    public id: number = null,
    public origin: number = 0,
    public destination: number = 0,
    public startTime: moment.Moment = null,
    public endTime: moment.Moment = null,
    public distance = 0,
    public transit: boolean = false,
    public submitted: boolean = false,
    public desiredAccuracy: number = 0,
    public appVersion: string = CURRENT_VERSION,
    public imageUrl: string = null) {
      super();
    }

  public getDuration() {
    return moment.duration(this.endTime.diff(this.startTime));
  }

}
