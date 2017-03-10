import { Location } from './geo';
import turf from 'turf';

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
    this.locations.map((location) => location.toLngLat()));

  if (simplify > 0 && linestring.geometry.coordinates.length > 2)
    return (turf.simplify(linestring, simplify, false));
  return linestring;
}
