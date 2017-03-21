import { Location } from './location';
import { Persistent } from './persistent';
import { CURRENT_VERSION } from './utils';
import { ObjectManager } from './object_manager';
import * as moment from 'moment';

export class Trip extends Persistent {

  static NEAR_THESHOLD = 500; // Maximum distance for location guesses, in meters
  static SIMPLIFY_TOLERANCE = 0.0002; // degrees
  static SQL_CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS trip (
      id INTEGER PRIMARY KEY ASC NOT NULL,
      origin_type INTEGER NOT NULL DEFAULT 0,
      destination_type INTEGER NOT NULL DEFAULT 0,
      start_time INTEGER NOT NULL,
      end_time INTEGER NOT NULL,
      distance REAL NOT NULL,
      transit INTEGER DEFAULT 0,
      submitted INTEGER DEFAULT 0,
      desired_accuracy INTEGER NOT NULL DEFAULT 0,
      app_version TEXT NOT NULL
    )
  `;
  static objects = new ObjectManager(Trip, 'trip', [
    'origin_type',
    'destination_type',
    'start_time',
    'end_time',
    'distance',
    'transit',
    'submitted',
    'desired_accuracy',
    'app_version'
  ]);

  static fromRow(row) {
    return new Trip(
      row.id,
      row.origin_type,
      row.destination_type,
      moment(row.start_time),
      moment(row.end_time),
      row.distance,
      row.transit === 1,
      row.submitted === 1,
      row.desired_accuracy,
      row.app_version
    )
  }

  static fromLocations(locations: Location[]) {
    let trip = new Trip();
    trip.startTime = locations[0].time;
    trip.endTime = locations[locations.length - 1].time;
    for (let i = 1; i < locations.length; i++)
      trip.distance += locations[i-1].distanceTo(locations[i]);
    return trip;
  }

  static getMigrations(toVersion) {
    if (toVersion == 1) return [Trip.SQL_CREATE_TABLE];
    return [];
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
    public appVersion: string = CURRENT_VERSION) {
      super();
    }

  public toRow() {
    return [
      this.origin,
      this.destination,
      this.startTime.valueOf(),
      this.endTime.valueOf(),
      this.distance,
      + this.transit,
      + this.submitted,
      this.desiredAccuracy,
      this.appVersion
    ];
  }

  public getLocations() {
    return Location.objects.filter('trip_id = ' + this.id,  'time ASC');
  }

  public getDuration() {
    return moment.duration(this.endTime.diff(this.startTime));
  }

}
