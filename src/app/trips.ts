import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { File, FileEntry } from '@ionic-native/file';
import { Trip } from './trip';
import { ObjectManager } from './object_manager';
import { Storage } from './storage';
import { Location } from './location';
import { Locations } from './locations';
import { Log } from './log';
import * as moment from 'moment';

@Injectable()
export class Trips extends ObjectManager {
  protected table = 'trip';
  protected columns = [
    'origin_type',
    'destination_type',
    'start_time',
    'end_time',
    'distance',
    'transit',
    'submitted',
    'desired_accuracy',
    'app_version'
  ];

  constructor(
      protected locationManager: Locations,
      protected log: Log,
      protected storage: Storage,
      protected file: File,
      protected events: Events) {
    super();
    this.events.subscribe('geo:motion', this.onMotion.bind(this));
  }

  protected fromRow(row) {
    return new Trip(
      row.id,
      row.origin_type,
      row.destination_type,
      moment(row.start_time),
      moment(row.end_time),
      row.distance,
      row.transit === 1,
      row.submitted === 1,
      row.desired_accuracy,
      row.app_version
    )
  }

  protected toRow(trip: Trip) {
    return [
      trip.origin,
      trip.destination,
      trip.startTime.valueOf(),
      trip.endTime.valueOf(),
      trip.distance,
      + trip.transit,
      + trip.submitted,
      trip.desiredAccuracy,
      trip.appVersion
    ];
  }

  protected onMotion(movement) {
    this.log.write('trips',
      `received motion event: moving=${movement.moving} ` +
      `automatic=${movement.automatic}`);
    if (!movement.moving) {
      return this.locationManager.filterNewLocations(movement.automatic)
        .then((locations: Location[]) => {
          if (locations.length === 0) return;
          return this.save(Trip.fromLocations(locations))
            .then((trip) => this.locationManager.batchUpdate(
              ['trip_id'], [trip.id], 'trip_id IS NULL'));
        });
    }
  }

  protected imagePath(trip: Trip) {
    return `images/trip-${trip.id}.jpg`;
  }

  public delete(trip: Trip) {
    this.log.write('trips', `deleting trip: id=${trip.id}`);
    return Promise.all([this.deleteImage(trip), super.delete(trip)])
      .then(() => this.events.publish('trip:delete'));
  }

  public save(trip: Trip) {
    let insert = trip.id === null;
    this.log.write('trips', `saving trip: insert=${insert}`);
    return super.save(trip).then((trip) => {
      this.events.publish('trip:save', {
        insert: insert,
        update: !insert,
        trip: trip
      });
      return trip;
    });
  }

  public deleteImage(trip: Trip) {
    this.log.write('trips', `deleting trip image: id=${trip.id}`);
    return this.file.removeFile(
        this.file.dataDirectory, this.imagePath(trip))
      .catch((err) => {
        if (err.code !== 1) throw err;
      });
  }

  public saveImage(trip: Trip, blob) {
    this.log.write('trips', `saving trip image: id=${trip.id}`);
    return this.file.createDir(this.file.dataDirectory, 'images', false)
      .catch((err) => {
        if (err.code !== 12) throw err;
      }).then<FileEntry>(() => this.file.writeFile(
        this.file.dataDirectory, this.imagePath(trip), blob, {
          replace: true
        }));
  }

  public getLocations(trip: Trip): Promise<Location[]> {
    this.log.write('trips', `getting locations for trip: id=${trip.id}`);
    return this.locationManager.filter(`trip_id = ?`,  'time ASC', [trip.id]);
  }

  public getODLocations(trip: Trip) : Promise<Location[]> {
    this.log.write('trips', `getting o-d locations for trip: id=${trip.id}`);
    let start = trip.startTime.valueOf(),
      end = trip.endTime.valueOf();
    return Promise.all([start, end].map((time) => {
      return this.locationManager.filter('trip_id = ? AND time = ?',
        null, [trip.id, time], 1).then((locations) => locations[0]);
    }));
  }
}

Storage.addMigration(1, `
  CREATE TABLE IF NOT EXISTS trip (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    origin_type INTEGER NOT NULL DEFAULT 0,
    destination_type INTEGER NOT NULL DEFAULT 0,
    start_time INTEGER NOT NULL,
    end_time INTEGER NOT NULL,
    distance REAL NOT NULL,
    transit INTEGER DEFAULT 0,
    submitted INTEGER DEFAULT 0,
    desired_accuracy INTEGER NOT NULL DEFAULT 0,
    app_version TEXT NOT NULL
  )
`);
