import { Location } from './location';
import { lineString as turfLineString } from '@turf/helpers';
import * as turfSimplify from '@turf/simplify';

export class Path {
  public locations: Location[] = [];
  public distance: number = 0;
  constructor(locations: Location[] = []) {
    locations.forEach((location) => this.push(location));
  }

  public push(location: Location) {
    if (this.locations.length) this.distance +=
      this.locations[this.locations.length-1].distanceTo(location);
    this.locations.push(location);
  }

  public get(idx) {
    if (idx < 0) idx = this.locations.length + idx;
    return this.locations[idx] || null;
  }

  public toLineString(simplify: number = 0) {
    if (this.locations.length < 2) return null;

    let linestring = turfLineString(
      this.locations.map((location) => location.toLngLat()));

    if (simplify > 0 && linestring.geometry.coordinates.length > 2)
      return (turfSimplify(linestring, simplify, false));

    return linestring;
  }
}
