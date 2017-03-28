import { Location } from './location';
import { Persistent } from './persistent';
import { TripStatsProvider, TripStats } from './stats';
import { APP_VERSION } from './config';
import * as moment from 'moment';

const MILE = 0.000621371,
  K1 = 3.509,
  K2 = 0.2581;

export class Trip extends Persistent implements TripStatsProvider {
  static NEAR_THESHOLD = 500; // Maximum distance for location guesses, in meters
  static SIMPLIFY_TOLERANCE = 0.0002; // degrees
  public stats: TripStats;

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
    public appVersion: string = APP_VERSION,
    public imageUrl: string = null) {
      super();
      this.stats = new TripStats(this);
    }

  private formatLocationType(locationType: number) {
    return Location.LOCATION_TYPES[locationType];
  }

  public getDuration() {
    return moment.duration(this.endTime.diff(this.startTime));
  }

  public getDistance() {
    return this.distance * MILE;
  }

  public getSpeed() {
    return this.getDistance() / this.getDuration().asHours();
  }

  public getCalories() {
    // Formula from: http://www.cptips.com/formula.htm
    let speed = this.getSpeed(),
      duration = this.getDuration();
    return (speed * (K1 + K2 * Math.pow(speed, 2))) /
      67.78 * duration.asMinutes();
  }

  public formatOrigin() {
    return this.formatLocationType(this.origin);
  }

  public formatDestination() {
    return this.formatLocationType(this.destination);
  }

}
