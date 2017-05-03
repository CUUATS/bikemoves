import turf from 'turf';
import { Persistent } from './persistent';
import { Geo } from './geo';
import * as moment from 'moment';

export class Location extends Persistent {
  static LOCATION_TYPES = [
    'Not Specified',
    'Home',
    'Work',
    'K-12 School',
    'University',
    'Shopping',
    'Other'
  ];

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

  public toPoint() {
    return turf.point([this.longitude, this.latitude]);
  }

  public toLngLat() {
    return [this.longitude, this.latitude];
  }

  public distanceTo(loc: Location) {
    return turf.distance(this.toPoint(), loc.toPoint(), 'kilometers') * 1000;
  }

  public getBufferBbox(radius: number) {
    return turf.bbox(turf.buffer(this.toPoint(), radius, 'meters'));
  }

}
