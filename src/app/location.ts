import turf from 'turf';
import { Persistent } from './persistent';
import { ObjectManager } from './object_manager';

export class Location extends Persistent {
  static SQL_CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS location (
      id INTEGER PRIMARY KEY ASC NOT NULL,
      longitude DOUBLE NOT NULL,
      latitude DOUBLE NOT NULL,
      accuracy DOUBLE NOT NULL,
      altitude DOUBLE NOT NULL,
      heading DOUBLE NOT NULL,
      speed DOUBLE NOT NULL,
      time DATETIME NOT NULL,
      moving BOOLEAN NOT NULL,
      event INTEGER,
      activity INTEGER,
      confidence INTEGER,
      location_type INTEGER,
      trip_id INTEGER
    )
  `;
  static ACTIVITY_STILL = 0;
  static ACTIVITY_FOOT = 1;
  static ACTIVITY_WALK = 2;
  static ACTIVITY_RUN = 3;
  static ACTIVITY_VEHICLE = 4;
  static ACTIVITY_BICYCLE = 5;
  static ACTIVITY_UNKNOWN = 6;
  static ACTIVITIES = {
    'still': Location.ACTIVITY_STILL,
    'on_foot': Location.ACTIVITY_FOOT,
    'walking': Location.ACTIVITY_WALK,
    'running': Location.ACTIVITY_RUN,
    'in_vehicle': Location.ACTIVITY_VEHICLE,
    'on_bicycle': Location.ACTIVITY_BICYCLE,
    'unknown': Location.ACTIVITY_UNKNOWN
  };
  static EVENT_MOTION = 0;
  static EVENT_GEOFENCE = 1;
  static EVENT_HEARTBEAT = 2;
  static EVENT_PROVIDER = 3;
  static EVENTS = {
    'motionchange': Location.EVENT_MOTION,
    'geofence': Location.EVENT_GEOFENCE,
    'heartbeat': Location.EVENT_HEARTBEAT,
    'providerchange': Location.EVENT_PROVIDER
  };
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
      position.timestamp,
      position.is_moving,
      (position.event) ? Location.EVENTS[position.event] : null,
      (position.activity.type) ?
        Location.ACTIVITIES[position.activity.type] : null,
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
      new Date(row.time),
      row.moving == 'true',
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
    public time: Date = null,
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
      this.time,
      this.moving,
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
