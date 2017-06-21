import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import turf from 'turf';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Location } from './location';
import { Path } from './path';
import { extend, dataURItoBlob } from './utils';
import { MAP_STYLE } from './config';
import { MAPBOX_TOKEN } from './private';

mapboxgl.accessToken = MAPBOX_TOKEN;

export interface Icon {
  type: 'current' | 'incident' | 'origin' | 'destination';
  location: Location;
}

export interface MapOptions {
  center?: Location;
  icons?: Icon[];
  interactive?: boolean;
  path?: Path;
  zoom?: number;
}

interface PathImageRequest {
  path?: Path;
  resolve: any;
}

@Injectable()
export class Map {
  static DEFAULT_OPTIONS: MapOptions = {
    center: new Location(-88.227203, 40.109403),
    icons: [],
    interactive: false,
    path: null,
    zoom: 16
  };
  static ICON_TYPES = ['current', 'incident', 'origin', 'destination'];
  static ICONS_SOURCE = 'icons';
  static TRIP_SOURCE = 'trip';
  static LAYERS = [
    {
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
    },
    {
      id: 'bikemoves-icon-shadow',
      type: 'circle',
      source: 'icons',
      paint: {
        'circle-color': '#000000',
        'circle-blur': 0.6,
        'circle-opacity': 0.8,
        'circle-radius': 19
      }
    },
    {
      id: 'bikemoves-icon-background',
      type: 'circle',
      source: 'icons',
      paint: {
        'circle-color': {
          property: 'icon_type',
          type: 'categorical',
          stops: [
            ['current', '#FBB03B'],
            ['incident', '#F7533E'],
            ['origin', '#21C180'],
            ['destination', '#49CCEA']
          ]
        },
        'circle-radius': 14,
        'circle-stroke-color': '#FFFFFF',
        'circle-stroke-width': 2
      }
    },
    {
      id: 'bikemoves-icon',
      type: 'symbol',
      source: 'icons',
      layout: {
        'icon-image': {
          property: 'icon_type',
          type: 'categorical',
          stops: [
            ['current', 'bikemoves-current-15'],
            ['incident', 'bikemoves-incident-15'],
            ['origin', 'bikemoves-origin-15'],
            ['destination', 'bikemoves-destination-15']
          ]
        }
      }
    }
  ];
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
    this.addGeoJSONSource(Map.TRIP_SOURCE, this.getTripData());
    this.addGeoJSONSource(Map.ICONS_SOURCE, this.getIconsData());
    Map.LAYERS.forEach((layer) => this.map.addLayer(layer));

    this.loaded = true;
    this.path = this.options.path;
    this.icons = this.options.icons;
    if (this.pathImageQueue.length) this.nextPathImage();
  }

  private onClick(e) {
    if (this.options.interactive) this.openPopup(e);
    this.click.next(Location.fromLngLat([e.lngLat.lng, e.lngLat.lat]));
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
    let linestring = this.path.toLineString();
    return {
      type: 'FeatureCollection',
      features: (linestring) ? [linestring] : []
    };
  }

  private getIconsData() {
    return {
      type: 'FeatureCollection',
      features: this.options.icons.map((icon) => {
        let feature = icon.location.toPoint();
        feature.properties = {
          icon_type: icon.type
        };
        return feature;
      })
    };
  }

  private addGeoJSONSource(id: string, data: any) {
    this.map.addSource(id, {
      type: 'geojson',
      data: data
    });
  }

  get center() {
    return Location.fromLngLat(this.map.getCenter());
  }

  set center(location: Location) {
    this.map.setCenter(location.toLngLat());
  }

  get icons() {
    return this.options.icons;
  }

  set icons(icons: Icon[]) {
    this.options.icons = icons;
    if (this.loaded)
      this.map.getSource(Map.ICONS_SOURCE).setData(this.getIconsData());
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

  set path(path: Path | null) {
    this.options.path = (path) ? path : new Path();
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
    let bbox = turf.bbox(this.path.toLineString() as any);
    this.map.fitBounds([bbox.slice(0, 2), bbox.slice(2)], {
      duration: 0,
      linear: true,
      padding: 25
    });
  }

  public addLocation(location: Location) {
    this.options.path.push(location);
    this.path = this.options.path;
  }

  public createPathImage(path: Path) {
    return new Promise((resolve, reject) => {
      this.pathImageQueue.push({
        path: path,
        resolve: resolve
      });
      if (this.pathImageQueue.length === 1) this.nextPathImage();
    });
  }

  private nextPathImage() {
    if (this.loaded && this.pathImageQueue.length) {
      this.path = this.pathImageQueue[0].path;
      this.icons = [
        {
          type: 'origin',
          location: this.path.get(0)
        },
        {
          type: 'destination',
          location: this.path.get(-1)
        }
      ];
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

  public reset() {
    this.pathImageQueue = [];
    this.center = this.options.center;
    this.interactive = this.options.interactive;
    this.zoom = this.options.zoom;
    this.icons = [];
    if (this.loaded) this.path = this.options.path;
  }

  public assign(containerId: string, options: MapOptions) {
    this.options = extend(Map.DEFAULT_OPTIONS, options);
    this.options.path = new Path();
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
