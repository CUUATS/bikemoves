import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import turf from 'turf';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Location } from './location';
import { Marker } from './marker';
import { extend, toLineString, dataURItoBlob } from './utils';
import { MAP_STYLE, MAPBOX_TOKEN } from './config';

mapboxgl.accessToken = MAPBOX_TOKEN;

export interface MapOptions {
  center?: Location;
  interactive?: boolean;
  path?: Location[];
  marker?: Location;
  markerType?: string;
  zoom?: number;
}

interface PathImageRequest {
  path?: Location[];
  resolve: any;
}

@Injectable()
export class Map {
  static DEFAULT_OPTIONS: MapOptions = {
    center: new Location(-88.227203, 40.109403),
    interactive: false,
    zoom: 16
  };
  static TRIP_SOURCE = 'trip';
  static TRIP_LAYER = {
    id: 'bikemoves-trip',
    type: 'line',
    source: 'trip',
    paint: {
      'line-color': '#FBB03B',
      'line-width': {
        base: 1.4,
        stops: [
          [6, 0.5],
          [20, 30]
        ]
      }
    }
  };
  static POPUP_FIELDS = [
  	{name: 'path_type', label: 'Path Type'},
  	{name:'rack_type', label: 'Rack Type'},
  	{name:'is_covered', label: 'Covered'},
  	{name:'location', label: 'Location'},
  	{name:'phone', label: 'Phone'}
  ];
  static BIKEMOVES_LAYERS = [
    'bikemoves_bike_rack',
    'bikemoves_bike_repair_retail',
    'bikemoves_bike_path'
  ];
  private el: HTMLDivElement = document.createElement('div');
  private map: any;
  private options: MapOptions;
  private loaded = false;
  private markers: Marker[] = [];
  private pathImageQueue: PathImageRequest[] = [];
  private captureOnLoad = false;
  public click = new Subject();

  constructor() {
    this.el.id = 'bikemoves-map';
    document.body.appendChild(this.el);
  }

  private initMap() {
    // Create the map.
    this.map = new mapboxgl.Map({
        container: this.el,
        style: MAP_STYLE,
        zoom: this.options.zoom,
        center: this.options.center.toLngLat()
    });
    // Set up event handlers.
    this.map.on('load', () => this.onLoad());
    this.map.on('click', (e) => this.onClick(e));
    this.map.on('render', (e) => this.onRender(e));
  }

  private onLoad() {
    this.addTripSource();
    this.map.addLayer(Map.TRIP_LAYER);
    this.loaded = true;
    this.updateMap();
  }

  private onClick(e) {
    if (this.options.interactive) this.openPopup(e);
    this.click.next(Location.fromLngLat([e.lngLat.lng, e.lngLat.lat]));
  }

  private updateMap() {
    this.markers.forEach((marker) => marker.addTo(this.map));
    this.path = this.options.path;
    if (this.pathImageQueue.length) this.nextPathImage();
  }

  private openPopup(e) {
    var features = this._getFeaturesNear(e.point, 10);
    if (!features.length) return;

    var feature = features[0],
      popupPoint = this._snapToFeature(feature, e.lngLat),
      popupContent = this._getPopupContent(feature);

    new mapboxgl.Popup()
      .setLngLat(popupPoint)
      .setHTML(popupContent)
      .addTo(this.map);

    this.map.flyTo({
      center: popupPoint
    });
  }

  private _getFeaturesNear(point, distance) {
    // First try querying using the exact point that was tapped.
    var features = this.map.queryRenderedFeatures(point, {
      layers: Map.BIKEMOVES_LAYERS
    });
    if (features.length) return features;

    // Fallback to querying around the point that was tapped.
    return this.map.queryRenderedFeatures([
      [point.x - distance, point.y + distance],
      [point.x + distance, point.y - distance]
    ], {
      layers: Map.BIKEMOVES_LAYERS
    });
  }

  private _snapToFeature(feature, lngLat) {
    if (feature.geometry.type == 'Point') {
      return feature.geometry.coordinates;
    } else if (feature.geometry.type == 'LineString') {
      var nearest = turf.pointOnLine(
        feature, turf.point([lngLat.lng, lngLat.lat]));
      return nearest.geometry.coordinates;
    }
    return lngLat;
  }

  private _getPopupContent(feature) {
    var props = feature.properties,
      headline = (feature.layer.id == 'bikemoves_bike_rack') ?
      'Bike Rack' : props.name;
    var content = '<h2>' + headline + '</h2>';
    Map.POPUP_FIELDS.forEach((field) => {
      if (field.name in props && props[field.name]) {
        content += '<p class="feature-field"><strong class="field-name">' +
          field.label + ':</strong> <span class="field-value">' +
          props[field.name] + '</span></p>';
      }
    });
    return content;
  }

  private getTripData() {
    let linestring = toLineString(this.options.path);
    return {
      type: 'FeatureCollection',
      features: (linestring) ? [linestring] : []
    };
  }

  private addTripSource() {
    this.map.addSource(Map.TRIP_SOURCE, {
      type: 'geojson',
      data: this.getTripData()
    });
  }

  get center() {
    return Location.fromLngLat(this.map.getCenter());
  }

  set center(location: Location) {
    this.map.setCenter(location.toLngLat());
  }

  get interactive() {
    return this.options.interactive;
  }

  set interactive(interactive: boolean) {
    this.options.interactive = interactive;
  }

  get path() {
    return this.options.path;
  }

  set path(locations: Location[]) {
    this.options.path = locations;
    if (this.loaded)
      this.map.getSource(Map.TRIP_SOURCE).setData(this.getTripData());
  }

  get zoom() {
    return this.map.getZoom();
  }

  set zoom(zoom) {
    this.map.setZoom(zoom);
  }

  public zoomToPath() {
    let bbox = turf.bbox(toLineString(this.path) as any);
    this.map.fitBounds([bbox.slice(0, 2), bbox.slice(2)], {
      duration: 0,
      linear: true,
      padding: 25
    });
  }

  public addLocation(location: Location) {
    if (!this.options.path) this.options.path = [];
    this.options.path.push(location);
    this.path = this.options.path;
  }

  public createPathImage(locations: Location[]) {
    return new Promise((resolve, reject) => {
      this.pathImageQueue.push({
        path: locations,
        resolve: resolve
      });
      if (this.pathImageQueue.length === 1) this.nextPathImage();
    });
  }

  private nextPathImage() {
    if (this.loaded && this.pathImageQueue.length) {
      this.path = this.pathImageQueue[0].path;
      this.captureOnLoad = true;
      this.zoomToPath();
    }
  }

  private capturePathImage() {
    this.captureOnLoad = false;
    if (!this.pathImageQueue.length) return;
    let jpg = this.map.getCanvas().toDataURL('image/jpeg', 0.75),
      request = this.pathImageQueue.shift();
    request.resolve(dataURItoBlob(jpg));
    if (this.pathImageQueue.length) this.nextPathImage();
  }

  private onRender(e) {
    if (this.captureOnLoad && this.map.loaded()) this.capturePathImage();
  }

  public remove() {
    this.map.remove();
  }

  public show() {
    this.el.style.display = 'block';
  }

  public hide() {
    this.el.style.display = 'none';
  }

  public addMarker(location: Location, markerType?: string) {
    let marker = new Marker(location, markerType);
    this.markers.push(marker);
    if (this.loaded) marker.addTo(this.map);
    return marker;
  }

  public removeMarker(marker: Marker) {
    marker.remove();
    this.markers.splice(this.markers.indexOf(marker), 1);
  }

  public reset() {
    this.markers.forEach((marker) => this.removeMarker(marker));
    this.pathImageQueue = [];
    this.center = this.options.center;
    this.interactive = this.options.interactive;
    this.zoom = this.options.zoom;
    if (this.loaded) this.path = this.options.path;
  }

  public assign(containerId: string, options: MapOptions) {
    this.options = extend(Map.DEFAULT_OPTIONS, options);
    document.getElementById(containerId).appendChild(this.el);
    if (!this.map) {
      this.show();
      this.initMap();
    } else {
      this.reset();
      this.show();
      this.map.resize();
    }
  }

  public unassign() {
    this.hide();
    document.body.appendChild(this.el);
  }
}
