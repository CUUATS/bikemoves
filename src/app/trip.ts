import { Location } from './geo';
import { SQLite } from 'ionic-native';
import turf from 'turf';


export class Trip {

  static NEAR_THESHOLD = 500; // Maximum distance for location guesses, in meters
  static SIMPLIFY_TOLERANCE = 0.0002; // degrees
  static SQL_CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS trip (
      id INTEGER PRIMARY KEY ASC NOT NULL,
      origin_type INTEGER NOT NULL DEFAULT 0,
      destination_type INTEGER NOT NULL DEFAULT 0,
      start_time DATETIME NOT NULL,
      end_time DATETIME NOT NULL,
      running_time DOUBLE NOT NULL,
      distance DOUBLE NOT NULL,
      transit BOOLEAN DEFAULT 0,
      submitted BOOLEAN DEFAULT 0,
      desired_accuracy integer NOT NULL DEFAULT 0,
      app_version character varying(10) NOT NULL
    )
  `;
  static SQL_INSERT = `
    INSERT INTO trip (
      origin_type,
      destination_type,
      start_time,
      end_time,
      running_time,
      distance,
      transit,
      submitted,
      desired_accuracy,
      app_version
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  static SQL_UPDATE = `
    UPDATE trip SET
      origin_type = ?,
      destination_type = ?,
      start_time = ?,
      end_time = ?,
      running_time = ?,
      distance = ?,
      transit = ?,
      submitted = ?,
      desired_accuracy = ?,
      app_version = ?
    WHERE id = ?
  `;

  static db: SQLite;
  static all() {

  }

  constructor(
    public locations: Array<Location> = [],
    public id: number = null,
    public origin: number = 0,
    public destination: number = 0,
    public startTime: Date = null,
    public endTime: Date = null,
    public runningTime = 0,
    public distance = 0,
    public transit: boolean = false,
    public submitted: boolean = false,
    public desiredAccuracy: number = null,
    public appVersion: string = null) {}

  private _appendLocation(location: Location) {
  	this.locations.push(location);
  	return location;
  }

  private _replaceLocation(location: Location) {
  	this.locations[this.locations.length - 1] = location;
  	return location;
  }

  private _toPoint(location: Location) {
  	return turf.point([location.longitude, location.latitude]);
  }

  private _getDistance(loc1: Location, loc2: Location) {
  	return turf.distance(
  		this._toPoint(loc1), this._toPoint(loc2), 'kilometers') * 1000;
  }

  private _moreAccurate(loc1: Location, loc2: Location) {
  	if (loc1.accuracy == loc2.accuracy)
  		return (loc1.time > loc2.time) ? loc1 : loc2;
  	return (loc1.accuracy < loc2.accuracy) ? loc1 : loc2;
  }

  private _getLocation(idx: number) {
  	if (idx < 0) idx = this.locations.length + idx;
  	return this.locations[idx] || null;
  }

  private _locationInfo(type, idx) {
  	return {
  		type: type,
  		location: this._getLocation(idx)
  	};
  }

  private serialize() {
    return [
      this.origin,
      this.destination,
      this.startTime.getTime(),
      this.endTime.getTime(),
      this.runningTime,
      this.distance,
      this.transit,
      this.submitted,
      this.desiredAccuracy,
      this.appVersion
    ];
  }

  public getODTypes() {
  	if (this.locations.length < 2) return [];
  	var od = [];
  	if (this.origin > 0) od.push(this._locationInfo(this.origin, 0));
  	if (this.destination > 0) od.push(this._locationInfo(this.destination, -1));
  	return od;
  }

  public addLocation(location) {
  	delete location.altitudeAccuracy; // Property only exists on iOS
  	var prev = this._getLocation(-1);

  	// If we have a previous location, check that the travel speed between
  	// the two locations is reasonable. If not, keep only the more
  	// accurate of the two locations.
  	if (prev && !location.isPausePoint) {
  		var meters = this._getDistance(prev, location),
  			seconds = (location.time - prev.time) / 1000;
  		if ((meters / seconds) > 23) {
  			return this._replaceLocation(this._moreAccurate(prev, location));
  		}
  	}
  	return this._appendLocation(location);
  }

  public guessODTypes(trips) {
    var that = this;
  	if (!this.locations.length || this.origin || this.destination) return;

  	var odTypes = [];
  	trips.forEach((trip) => {
  		odTypes.push.apply(odTypes, trip.getODTypes());
  	});
  	var trip = this;
  	var origin = this._getLocation(0),
  		destination = this._getLocation(-1),
  		minOrigin = Trip.NEAR_THESHOLD,
  		minDestination = Trip.NEAR_THESHOLD;

  	odTypes.forEach((odType) => {
  		var distOrigin = trip._getDistance(odType.location, origin),
  			distDestination = trip._getDistance(odType.location, destination);

  		if (distOrigin < minOrigin) {
  			minOrigin = distOrigin;
  			that.origin = odType.type;
  		}
  		if (distDestination < minDestination) {
  			minDestination = distDestination;
  			that.destination = odType.type;
  		}
  	});
  }

  public getDistance(simplify: boolean = true) {
  	if (this.locations.length < 2) return 0;
  	return turf.lineDistance(
      <any>this.toLineString(simplify), 'kilometers') * 1000;
  }

  public toLineString(simplify: boolean = true) {
  	if (this.locations.length < 2) return null;
  	var linestring = turf.lineString(this.locations.map((location) => {
  		return [location.longitude, location.latitude];
  	}));
  	if (simplify && linestring.geometry.coordinates.length > 2) {
  		return turf.simplify(linestring, Trip.SIMPLIFY_TOLERANCE, false);
  	}
  	return linestring;
  }

  public end() {
    this.endTime = new Date();
    this.runningTime = this.endTime.getTime() - this.startTime.getTime();
  }

  public save() {
    if (this.id) {
      return Trip.db.executeSql(
        Trip.SQL_UPDATE, this.serialize().concat([this.id]));
    } else {
      return Trip.db.executeSql(Trip.SQL_INSERT, this.serialize())
        .then((data) => this.id = data.id);
    }
  }

}
