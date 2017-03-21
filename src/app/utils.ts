import { Location } from './location';
import turf from 'turf';

export const CURRENT_VERSION = '2.0.0';

// Source: http://stackoverflow.com/questions/37042602/how-to-combine-object-properties-in-typescript
export function extend(...args: any[]): any {
  const newObj = {};
  for (const obj of args) {
    for (const key in obj) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

export function toLineString(locations: Location[], simplify: number = 0) {
  if (!locations || locations.length < 2) return null;

  let linestring = turf.lineString(
    locations.map((location) => location.toLngLat()));

  if (simplify > 0 && linestring.geometry.coordinates.length > 2)
    return (turf.simplify(linestring, simplify, false));
  return linestring;
}

// Based on: http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
export function pad(n: number, w: number, z='0') {
  let d = n.toString();
  return (d.length >= w) ? d : new Array(w - d.length + 1).join(z) + d;
}
