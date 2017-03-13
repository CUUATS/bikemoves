import { Injectable } from '@angular/core';
import { Geo, Location } from './geo';
import { Service } from './service';
import { Storage } from './storage';
import { toLineString, CURRENT_VERSION } from './utils';

export class Trip {

  static NEAR_THESHOLD = 500; // Maximum distance for location guesses, in meters
  static SIMPLIFY_TOLERANCE = 0.0002; // degrees

  constructor(
    private service: Trips,
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
    public locations: Location[] = []) {}

  private getLocation(idx: number) {
  	if (idx < 0) idx = this.locations.length + idx;
  	return this.locations[idx] || null;
  }

  private _locationInfo(type, idx) {
  	return {
  		type: type,
  		location: this.getLocation(idx)
  	};
  }

  public serialize() {
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

  public getODTypes() {
  	if (this.locations.length < 2) return [];
  	var od = [];
  	if (this.origin > 0) od.push(this._locationInfo(this.origin, 0));
  	if (this.destination > 0) od.push(this._locationInfo(this.destination, -1));
  	return od;
  }

  public addLocation(location: Location) {
    let prev = this.getLocation(-1);
  	if (!this.locations.length) this.startTime = location.time;
    if (!location.moving) this.endTime = location.time;
    this.locations.push(location);
    if (prev) this.distance += location.distanceTo(prev);
  }

  public guessODTypes(trips) {

  }

  public save() {
    return (this.id) ?
      this.service.updateTrip(this) : this.service.insertTrip(this);
  }

}

@Injectable()
export class Trips extends Service {
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
  static SQL_INSERT = `
    INSERT INTO trip (
      origin_type,
      destination_type,
      start_time,
      end_time,
      distance,
      transit,
      submitted,
      desired_accuracy,
      app_version
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  static SQL_UPDATE = `
    UPDATE trip SET
      origin_type = ?,
      destination_type = ?,
      start_time = ?,
      end_time = ?,
      distance = ?,
      transit = ?,
      submitted = ?,
      desired_accuracy = ?,
      app_version = ?
    WHERE id = ?
  `;

  private trip: Trip;

  constructor(private geo: Geo, private storage: Storage) {
    super();
    geo.locations.subscribe(this.onLocation.bind(this));
  }

  static all() {

  }

  private onLocation(location) {
    if (location.moving) {
      console.log('Adding point to trip');
      if (!this.trip) this.trip = new Trip(this);
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

  public insertTrip(trip) {
    return this.storage.ready().then(
      (db) => db.executeSql(Trips.SQL_INSERT, trip.serialize())).then(
      (data) => trip.id = data.id
    );

  }

  public updateTrip(trip) {
    return this.storage.ready().then(
      (db) => db.executeSql(
        Trips.SQL_UPDATE, trip.serialize().concat([trip.id])));
  }

}
