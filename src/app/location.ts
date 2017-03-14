import turf from 'turf';
import { Persistent } from './persistent';

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
  static ACTIVITIES = {
    'still': 0,
    'on_foot': 1,
    'walking': 2,
    'running': 3,
    'in_vehicle': 4,
    'on_bicycle': 5,
    'unknown': 6
  };
  static EVENTS = {
    'motionchange': 0,
    'geofence': 1,
    'heartbeat': 2,
    'providerchange': 3
  };

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

  static getMigrations(toVersion) {
    if (toVersion == 2) return [Location.SQL_CREATE_TABLE];
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

  public distanceTo(loc: Location) {
    return turf.distance(this.toPoint(), loc.toPoint(), 'kilometers') * 1000;
  }

}
