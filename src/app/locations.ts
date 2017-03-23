import { Injectable } from '@angular/core';
import { ObjectManager } from './object_manager';
import { Location } from './location';
import { Storage } from './storage';
import * as moment from 'moment';

@Injectable()
export class Locations extends ObjectManager {
  protected table = 'location';
  protected columns = [
    'longitude',
    'latitude',
    'accuracy',
    'altitude',
    'heading',
    'speed',
    'time',
    'moving',
    'event',
    'activity',
    'confidence',
    'location_type',
    'trip_id'
  ];

  constructor(protected storage: Storage) {
    super();
  }

  protected fromRow(row) {
    return new Location(
      row.longitude,
      row.latitude,
      row.accuracy,
      row.altitude,
      row.heading,
      row.speed,
      moment(row.time),
      row.moving === 1,
      row.event,
      row.activity,
      row.confidence,
      row.location_type,
      row.trip_id,
      row.id
    )
  }

  protected toRow(location: Location) {
    return [
      location.longitude,
      location.latitude,
      location.accuracy,
      location.altitude,
      location.heading,
      location.speed,
      location.time.valueOf(),
      + location.moving,
      location.event,
      location.activity,
      location.confidence,
      location.locationType,
      location.tripId
    ];
  }

}

Storage.addMigration(1, `
  CREATE TABLE IF NOT EXISTS location (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    longitude REAL NOT NULL,
    latitude REAL NOT NULL,
    accuracy REAL NOT NULL,
    altitude REAL NOT NULL,
    heading REAL NOT NULL,
    speed REAL NOT NULL,
    time INTEGER NOT NULL,
    moving INTEGER NOT NULL,
    event INTEGER,
    activity INTEGER,
    confidence INTEGER,
    location_type INTEGER,
    trip_id INTEGER
  )
`);
