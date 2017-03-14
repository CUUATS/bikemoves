import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import turf from 'turf';
import { Subject } from 'rxjs/Subject';
import { Location } from './location';
import { extend, toLineString } from './utils';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3V1YXRzIiwiYSI6ImNpbm03NGFrdTB6ZTB1a2x5MHl6dTV6MXIifQ.Aq-CCCulBhKbmLGZUH6VDw';

interface MapOptions {
  animate?: boolean;
  center?: Location;
  interactive?: boolean;
  path?: Location[];
  marker?: Location;
  markerType?: string;
  zoom?: number;
}

export class Map {
  static MARKER_CURRENT = 'current';
  static MARKER_INCIDENT = 'incident';
  static DEFAULT_OPTIONS: MapOptions = {
    animate: false,
    center: new Location(-88.227203, 40.109403),
    interactive: false,
    markerType: Map.MARKER_CURRENT,
    zoom: 16
  };
  static MAP_STYLE = 'https://tileserver.bikemoves.me/styles/bikemoves-v1.json?cachekey=1';
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
  private _marker: any;
  private markerEl: HTMLElement;
  private map: any;
  private options: MapOptions;
  private loaded = false;
  public click = new Subject();

  constructor(public containerId: string, options: MapOptions = {}) {
    this.options = extend(Map.DEFAULT_OPTIONS, options);
    // Create the map.
    console.log('Options', this.options);
    this.map = new mapboxgl.Map({
        container: this.containerId,
        style: Map.MAP_STYLE,
        zoom: this.zoom,
        center: this.center.toLngLat()
    });

    // Set up event handlers.
    this.map.on('load', () => this.onLoad());
    this.map.on('click', (e) => this.onClick(e));
  }

  private onLoad() {
    this.addTripSource();
    this.map.addLayer(Map.TRIP_LAYER);
    this.addMaker();
    this.loaded = true;
    this.updateMap();
  }

  private onClick(e) {
    if (this.options.interactive) this.openPopup(e);
    this.click.next(e);
  }

  private updateMap() {
    let oldAnimate = this.animate;
    this.animate = false;

    this.center = this.options.center;
    this.marker = this.options.marker;
    this.path = this.options.path;
    this.zoom = this.options.zoom;

    this.animate = oldAnimate;
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

  private addMaker() {
    this.markerEl = document.createElement('div');
    this.markerEl.className = 'marker-' + this.markerType;
    this._marker = new mapboxgl.Marker(
      this.markerEl, {
        offset: [-15, -15]
    });
  }

  get animate() {
    return this.options.animate;
  }

  set animate(animate: boolean) {
    this.options.animate = animate;
  }

  get center() {
    return (this.loaded) ?
      Location.fromLngLat(this.map.getCenter()) : this.options.center;
  }

  set center(location: Location) {
    this.options.center = location;
    if (this.loaded) {
      if (this.options.animate) {
        this.map.flyTo({
          center: location.toLngLat()
        });
      } else {
        this.map.setCenter(location.toLngLat());
      }
    }
  }

  get interactive() {
    return this.options.interactive;
  }

  set interactive(interactive: boolean) {
    this.options.interactive = interactive;
  }

  get marker() {
    return this.options.marker;
  }

  set marker(location: Location) {
    this.options.marker = location;
    if (this.loaded) {
      if (location) {
        this._marker.setLngLat(location.toLngLat()).addTo(this.map)
      } else {
        this._marker.remove();
      }
    }
  }

  get markerType() {
    return this.options.markerType;
  }

  set markerType(markerType: string) {
    this.options.markerType = markerType;
    this.markerEl.className = 'marker-' + markerType;
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
    return (this.loaded) ? this.map.getZoom() : this.options.zoom;
  }

  set zoom(zoom) {
    this.options.zoom = zoom;
    if (this.loaded) {
      if (this.animate) {
        this.map.zoomTo(zoom);
      } else {
        this.map.setZoom(zoom);
      }
    }
  }

  public zoomToFeature(feature) {
    if (!feature) return;
    var bbox = turf.bbox(feature);
    this.map.fitBounds([bbox.slice(0, 2), bbox.slice(2)], {
      duration: 0,
      linear: true,
      padding: 25
    });
    return this;
  }

  public addLocation(location: Location) {
    if (!this.options.path) this.options.path = [];
    this.options.path.push(location);
    this.path = this.options.path;
  }

  // public assignTo(placeholder) {
  //   var rect = placeholder.getBoundingClientRect(),
  //     top = rect.top + document.body.scrollTop,
  //     left = rect.left + document.body.scrollLeft,
  //     height = placeholder.offsetHeight,
  //     width = placeholder.offsetWidth,
  //     container = this.map.getContainer();
  //
  //   container.style.position = 'absolute';
  //   container.style.top = top + 'px';
  //   container.style.left = left + 'px';
  //   container.style.height = height - 1 + 'px'; // One pixel for bar border.
  //   container.style.width = width + 'px';
  //   this.map.resize();
  //
  //   return this;
  // }

  // public reset() {
  //   if (this.markerEl)
  //     this.markerEl.style.display = 'none';
  //   this.setTripLocations(undefined);
  //   this.map.jumpTo({
  //     zoom: Map.DEFAULT_ZOOM
  //   });
  //   return this;
  // };

  public show() {
    this.map.getContainer().style.display = 'block';
    return this;
  }

  public hide() {
    this.map.getContainer().style.display = 'none';
    return this;
  }
}
