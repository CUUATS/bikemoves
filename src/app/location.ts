import turf from 'turf';
import { Persistent } from './persistent';
import { ObjectManager } from './object_manager';
import { Geo } from './geo';
import * as moment from 'moment';

export class Location extends Persistent {
  static SQL_CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS location (
      id INTEGER PRIMARY KEY ASC NOT NULL,
      longitude REAL NOT NULL,
      latitude REAL NOT NULL,
      accuracy REAL NOT NULL,
      altitude REAL NOT NULL,
      heading REAL NOT NULL,
      speed REAL NOT NULL,
      time INTEGER NOT NULL,
      moving INTEGER NOT NULL,
      event INTEGER,
      activity INTEGER,
      confidence INTEGER,
      location_type INTEGER,
      trip_id INTEGER
    )
  `;
  static LOCATION_TYPES = [
    'Not Specified',
    'Home',
    'Work',
    'K-12 School',
    'University',
    'Shopping',
    'Other'
  ];
  static objects = new ObjectManager(Location, 'location', [
    'longitude',
    'latitude',
    'accuracy',
    'altitude',
    'heading',
    'speed',
    'time',
    'moving',
    'event',
    'activity',
    'confidence',
    'location_type',
    'trip_id'
  ]);

  static fromPosition(position) {
    return new Location(
      position.coords.longitude,
      position.coords.latitude,
      position.coords.accuracy,
      position.coords.altitude,
      position.coords.heading,
      position.coords.speed,
      moment(position.timestamp),
      position.is_moving,
      (position.event) ? Geo.EVENTS[position.event] : null,
      (position.activity.type) ? Geo.ACTIVITIES[position.activity.type] : null,
      position.activity.confidence)
  }

  static fromLngLat(lngLat: [number, number]) {
    return new Location(lngLat[0], lngLat[1]);
  }

  static fromRow(row) {
    return new Location(
      row.longitude,
      row.latitude,
      row.accuracy,
      row.altitude,
      row.heading,
      row.speed,
      moment(row.time),
      row.moving === 1,
      row.event,
      row.activity,
      row.confidence,
      row.location_type,
      row.trip_id,
      row.id
    )
  }

  static getMigrations(toVersion) {
    if (toVersion == 1) return [Location.SQL_CREATE_TABLE];
    return [];
  }

  constructor(
    public longitude: number,
    public latitude: number,
    public accuracy: number = null,
    public altitude: number = null,
    public heading: number = null,
    public speed: number = null,
    public time: moment.Moment = null,
    public moving: boolean = null,
    public event: number = null,
    public activity: number = null,
    public confidence: number = null,
    public locationType: number = null,
    public tripId: number = null,
    public id: number = null) {
      super();
  }

  private toPoint() {
    return turf.point([this.longitude, this.latitude]);
  }

  public toLngLat() {
    return [this.longitude, this.latitude];
  }

  public toRow() {
    return [
      this.longitude,
      this.latitude,
      this.accuracy,
      this.altitude,
      this.heading,
      this.speed,
      this.time.valueOf(),
      + this.moving,
      this.event,
      this.activity,
      this.confidence,
      this.locationType,
      this.tripId
    ];
  }

  public distanceTo(loc: Location) {
    return turf.distance(this.toPoint(), loc.toPoint(), 'kilometers') * 1000;
  }

}
