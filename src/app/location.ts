import * as turfBbox from '@turf/bbox';
import * as turfBuffer from '@turf/buffer';
import * as turfDistance from '@turf/distance';
import { point as turfPoint } from '@turf/helpers';
import { Persistent } from './persistent';
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
    public sample: boolean = false,
    public locationType: number = null,
    public tripId: number = null,
    public id: number = null) {
      super();
  }

  public toPoint() {
    return turfPoint([this.longitude, this.latitude]);
  }

  public toLngLat() {
    return [this.longitude, this.latitude];
  }

  public distanceTo(loc: Location) {
    return turfDistance(this.toPoint(), loc.toPoint(), 'kilometers') * 1000;
  }

  public getBufferBbox(radius: number) {
    return turfBbox(turfBuffer(this.toPoint(), radius, 'meters'));
  }

}
