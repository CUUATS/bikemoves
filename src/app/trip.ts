import { Injectable } from '@angular/core';
import { Geo, Location } from './geo';
import { Service } from './service';
import { Persistent } from './persistent';
import { toLineString, CURRENT_VERSION } from './utils';

export class Trip extends Persistent {

  static NEAR_THESHOLD = 500; // Maximum distance for location guesses, in meters
  static SIMPLIFY_TOLERANCE = 0.0002; // degrees
  static SQL_CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS trip (
      id INTEGER PRIMARY KEY ASC NOT NULL,
      origin_type INTEGER NOT NULL DEFAULT 0,
      destination_type INTEGER NOT NULL DEFAULT 0,
      start_time DATETIME NOT NULL,
      end_time DATETIME NOT NULL,
      distance DOUBLE NOT NULL,
      transit BOOLEAN DEFAULT 0,
      submitted BOOLEAN DEFAULT 0,
      desired_accuracy integer NOT NULL DEFAULT 0,
      app_version character varying(10) NOT NULL
    )
  `;
  static SQL_COLUMNS = [
    'origin_type',
    'destination_type',
    'start_time',
    'end_time',
    'distance',
    'transit',
    'submitted',
    'desired_accuracy',
    'app_version'
  ];

  static getMigrations(toVersion) {
    if (toVersion == 1) return [Trip.SQL_CREATE_TABLE];
  }

  constructor(
    public id: number = null,
    public origin: number = 0,
    public destination: number = 0,
    public startTime: Date = null,
    public endTime: Date = null,
    public distance = 0,
    public transit: boolean = false,
    public submitted: boolean = false,
    public desiredAccuracy: number = 0,
    public appVersion: string = CURRENT_VERSION,
    public locations: Location[] = []) {
      super();
    }

  protected getTable() {
    return 'trip';
  }

  protected getRow() {
    return [
      this.origin,
      this.destination,
      this.startTime.getTime(),
      this.endTime.getTime(),
      this.distance,
      this.transit,
      this.submitted,
      this.desiredAccuracy,
      this.appVersion
    ];
  }

  protected getColumns() {
    return Trip.SQL_COLUMNS;
  }

  private getLocation(idx: number) {
  	if (idx < 0) idx = this.locations.length + idx;
  	return this.locations[idx] || null;
  }

  public addLocation(location: Location) {
    let prev = this.getLocation(-1);
  	if (!this.locations.length) this.startTime = location.time;
    if (!location.moving) this.endTime = location.time;
    this.locations.push(location);
    if (prev) this.distance += location.distanceTo(prev);
  }

}

@Injectable()
export class Trips extends Service {
  private trip: Trip;

  constructor(private geo: Geo) {
    super();
    geo.locations.subscribe(this.onLocation.bind(this));
  }

  private onLocation(location) {
    if (location.moving) {
      console.log('Adding point to trip');
      if (!this.trip) this.trip = new Trip();
      this.trip.addLocation(location)
    } else {
      // If this is the last point in the trip (first stationary point),
      // end and save the trip.
      if (this.trip) {
        console.log('Ending trip');
        this.trip.addLocation(location);
        this.trip.save();
        this.trip = undefined;
      }
    }
  }

}
