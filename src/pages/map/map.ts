import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import turf from 'turf';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3V1YXRzIiwiYSI6ImNpbm03NGFrdTB6ZTB1a2x5MHl6dTV6MXIifQ.Aq-CCCulBhKbmLGZUH6VDw';

class Map {
  static DEFAULT_LOCATION = [-88.227203, 40.109403];
  static DEFAULT_ZOOM = 16;
  static MAP_STYLE = 'https://tileserver.bikemoves.me/styles/bikemoves-v1.json';
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
  private currentLocationMarker: any;
  private currentLocationMarkerEl: HTMLElement;
  private loaded = false;
  private map: any;
  private tripLinestring: any;
  private tripSource: any;

  constructor(public containerId: string, public options: any = {}) {
    // Create the map.
    this.map = new mapboxgl.Map({
        container: this.containerId,
        style: Map.MAP_STYLE,
        zoom: Map.DEFAULT_ZOOM,
        center: Map.DEFAULT_LOCATION
    });

    // Add navigation control.
    var nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-right');

    // Set up event handlers.
    var obj = this;
    this.map.on('click', (e) => {
      if (obj.options.interactive) obj._onMapClick(e);
      if (obj.options.onClick) obj.options.onClick(e);
    });

    // Add the trip source and layer.
    this.map.on('load', () => {
      obj._addTripSource();
      obj._addTripLayer();
      obj.loaded = true;
      if (obj.options.onLoad) obj.options.onLoad();
    });
  }

  private _onMapClick(e) {
    var features = this._getFeaturesNear(e.point, 10);
    if (!features.length) return;

    var feature = features[0],
      popupPoint = this._snapToFeature(feature, e.lngLat),
      popupContent = this._getPopupContent(feature);

    var popup = new mapboxgl.Popup()
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

  private _addTripSource() {
    this.map.addSource('trip', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
    this.tripSource = this.map.getSource('trip');
  }

  private _addTripLayer() {
    this.map.addLayer({
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
    });
  }

  public setInteractive(interactive) {
    this.options.interactive = interactive;
    return this;
  }

  public locationToLngLat(location) {
    return [location.longitude, location.latitude];
  }

  public setCurrentLocation(location) {
    if (!this.currentLocationMarker) {
      this.currentLocationMarkerEl = document.createElement('div');
      this.currentLocationMarkerEl.id = 'current-location-marker';
      this.currentLocationMarker = new mapboxgl.Marker(
        this.currentLocationMarkerEl, {
          offset: [-15, -15]
      }).setLngLat(this.locationToLngLat(location)).addTo(this.map);
    } else {
      this.currentLocationMarkerEl.style.display = 'block';
      this.currentLocationMarker.setLngLat(this.locationToLngLat(location));
    }
    return this;
  }

  public setCenter(location, animate) {
    var latLng = this.locationToLngLat(location);
    if (animate) {
      this.map.flyTo({
        center: latLng
      });
    } else {
      this.map.setCenter(latLng);
    }
    return this;
  }

  public setTrip(linestring) {
    this.tripLinestring = linestring;
    this.tripSource.setData({
      type: 'FeatureCollection',
      features: (linestring) ? [linestring] : []
    });
    return this;
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

  public assignTo(placeholder) {
    var rect = placeholder.getBoundingClientRect(),
      top = rect.top + document.body.scrollTop,
      left = rect.left + document.body.scrollLeft,
      height = placeholder.offsetHeight,
      width = placeholder.offsetWidth,
      container = this.map.getContainer();

    container.style.position = 'absolute';
    container.style.top = top + 'px';
    container.style.left = left + 'px';
    container.style.height = height - 1 + 'px'; // One pixel for bar border.
    container.style.width = width + 'px';
    this.map.resize();

    return this;
  }

  public reset() {
    if (this.currentLocationMarkerEl)
      this.currentLocationMarkerEl.style.display = 'none';
    this.setTrip(undefined);
    this.map.jumpTo({
      zoom: Map.DEFAULT_ZOOM
    });
    return this;
  };

  public show() {
    this.map.getContainer().style.display = 'block';
    return this;
  }

  public hide() {
    this.map.getContainer().style.display = 'none';
    return this;
  }
}

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    var map = new Map('map', {
      interactive: true,
      onLoad: () => {},
      onClick: () => {}
    });
  }

}
