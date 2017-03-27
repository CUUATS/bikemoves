import { Injectable } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file';
import { Trip } from './trip';
import { ObjectManager } from './object_manager';
import { Storage } from './storage';
import { Locations } from './locations';
import * as moment from 'moment';
import { bikemoves as messages } from './messages';

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
    'app_version',
    'image_url'
  ];

  constructor(protected locations: Locations, protected storage: Storage, protected file: File) {
    super();
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
      row.app_version,
      row.image_url
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
      trip.appVersion,
      trip.imageUrl
    ];
  }

  protected imagePath(trip) {
    return `images/trip-${trip.id}.jpg`;
  }

  public delete(trip: Trip) {
    let imageDelete = (trip.imageUrl) ?
        this.deleteImage(trip) : Promise.resolve();
    return Promise.all([imageDelete, super.delete(trip)]);
  }

  public deleteImage(trip) {
    return this.file.removeFile(
      this.file.dataDirectory, this.imagePath(trip));
  }

  public saveImage(trip: Trip, blob) {
    return this.file.createDir(this.file.dataDirectory, 'images', false)
      .catch((err) => { if (err.code !== 12) throw err })
      .then<FileEntry>(() => this.file.writeFile(
        this.file.dataDirectory, this.imagePath(trip), blob, {
          replace: true
        }))
      .then((entry) => {
        trip.imageUrl = entry.nativeURL;
        return this.save(trip);
      });
  }

  public getLocations(trip: Trip) {
    return this.locations.filter(`trip_id = ?`,  'time ASC', [trip.id]);
  }

  public getODLocations(trip: Trip) {
    return this.locations.filter(`trip_id = ? AND event = ?`,
        'moving DESC', [trip.id, messages.EventType.MOTION]);
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
    app_version TEXT NOT NULL,
    image_url TEXT
  )
`);
