import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { Location } from './location';

export class Marker {
  static CURRENT = 'current';
  static INCIDENT = 'incident';
  static ORIGIN = 'origin';
  static DESTINATION = 'destination';

  private _el: HTMLDivElement;
  private _marker: any;

  constructor(
      private _location: Location,
      private _type: string = Marker.CURRENT,
      size = 36) {
    this._el = document.createElement('div');
    this._el.style.height = `${size}px`;
    this._el.style.width = `${size}px`;
    this._el.className = 'marker marker-' + this._type;
    let offset = Math.round(size / 2);
    this._marker = new mapboxgl.Marker(
      this._el, {
        offset: [-offset, -offset]
    });
    this._marker.setLngLat(this._location.toLngLat())
  }

  get location() {
    return this._location;
  }

  set location(location: Location) {
    this._location = location;
    this._marker.setLngLat(location.toLngLat())
  }

  get type() {
    return this._type;
  }

  set type(markerType: string) {
    this._type = markerType;
    this._el.className = 'marker marker-' + markerType;
  }

  public addTo(map: any) {
    this._marker.addTo(map);
  }

  public remove() {
    this._marker.remove();
  }

  public show() {
    this._el.style.display = 'block';
  }

  public hide() {
    this._el.style.display = 'none';
  }
}
