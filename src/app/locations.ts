import { Injectable } from '@angular/core';
import { ObjectManager } from './object_manager';
import { Location } from './location';
import { Storage } from './storage';
import * as moment from 'moment';
import { bikemoves as messages } from './messages';
import { LOCATION_NEAR_THRESHOLD } from './config';

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

  public guessLocationTypes(locations: Location[]) : Promise<number[]> {
    return Promise.all(locations.map((location) => {
      let bbox = location.getBufferBbox(LOCATION_NEAR_THRESHOLD);
      return this.filter(`location_type > 0
          AND longitude > ? AND latitude > ?
          AND longitude < ? AND latitude < ?`, null, bbox)
        .then((candidates) => {
          let distance = LOCATION_NEAR_THRESHOLD,
            locationType = 0;
          candidates.forEach((candidate) => {
            let candidateDistance = candidate.distanceTo(location);
            if (candidateDistance < distance) {
              distance = candidateDistance;
              locationType = candidate.locationType;
            }
          });
          return locationType;
        });
    }));
  }

  public filterNewLocations() {
    return this.filter('trip_id IS NULL', 'time DESC')
      .then((locations: Location[]) => {
        // If there are fewer than two locations, delete them.
        if (locations.length < 2)
          return this.batchDelete('trip_id IS NULL')
            .then(() => []);

        // Delete locations from the end of the trip with activities other than
        // bicycle.
        let bikeIdx = locations.map((location) => location.activity)
          .indexOf(messages.ActivityType.BICYCLE);

        // Don't delete any locations if:
        // - No bike locations were found.
        // - The last location was on bike.
        // - Removing non-bike locations would result in an invalid trip.
        if (bikeIdx === -1 || bikeIdx === 0 || bikeIdx > locations.length - 2) {
          locations.reverse();
          return locations;
        }

        let minTime = locations[bikeIdx].time.valueOf();
        locations.reverse();
        return this.batchDelete('trip_id IS NULL AND time > ?', [minTime])
          .then(() => locations.slice(0, locations.length - bikeIdx));
      });
  }

}

Storage.addMigration(2, `
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
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE
  )
`);

Storage.addMigration(3, `
  CREATE TRIGGER update_location_type
  UPDATE OF origin_type, destination_type ON trip
    BEGIN
      UPDATE location SET location_type = new.origin_type
      WHERE trip_id = old.id
        AND event = 1
        AND moving = 1;
      UPDATE location SET location_type = new.destination_type
      WHERE trip_id = old.id
        AND event = 1
        AND moving = 0;
    END;
`);

Storage.addMigration(4,
  'CREATE INDEX location_longitude ON location(longitude);');

Storage.addMigration(5,
  'CREATE INDEX location_latitude ON location(latitude);');

Storage.addMigration(6,
  'CREATE INDEX location_location_type ON location(location_type);');
