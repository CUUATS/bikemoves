import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { Settings } from './settings';
import { Trip } from './trip';
import { Trips } from './trips';
import { Location } from './location';
import { Locations } from './locations';
import * as moment from 'moment';
import { bikemoves as messages } from './messages';

@Injectable()
export class Legacy {
  private static DB_NAME = 'loki__bikemoves';

  constructor(private file: File,
    private settings: Settings,
    private locationManager: Locations,
    private tripManager: Trips) {}

  private upgradeApp(collection: any) {
    let data = null;
    collection.data.forEach((obj) => {
      if (obj._name == 'profile') data = obj;
    });
    if (data) {
      return this.settings.getProfile()
        .then((profile) => {
          if (data.age) profile.age = data.age;
          if (data.cyclingExperience)
            profile.cyclingExperience = data.cyclingExperience;
          if (data.gender) profile.gender = data.gender;
        })
        .then(() => this.settings.saveProfile());
    } else {
      return Promise.resolve();
    }
  }

  private upgradeTrips(collection: any) {
    if (!collection.data || collection.data.length === 0)
      return Promise.resolve();

    let saveTrips = collection.data.map((obj) => {
      let locations = obj.locations.map((loc, i) => new Location(
        loc.longitude,
        loc.latitude,
        loc.accuracy,
        loc.altitude,
        loc.heading,
        loc.speed,
        moment(loc.time),
        loc.moving,
        (i === 0 || i === obj.locations.length - 1) ?
          messages.EventType.MOTION : null,
        messages.ActivityType.UNKNOWN,
        0,
        (i === 0) ? obj.origin :
          (i === obj.locations.length - 1) ? obj.destination : null
      ));

      if (locations.length < 2) return Promise.resolve();

      let trip = Trip.fromLocations(locations);
      trip.appVersion = (obj.appVersion) ? obj.appVersion : '1.0';
      if (obj.desiredAccuracy) trip.desiredAccuracy = obj.desiredAccuracy;
      if (obj.destination) trip.destination = obj.destination;
      if (obj.origin) trip.origin = obj.origin;
      if (obj.submitted) trip.submitted = obj.submitted;
      if (obj.transit) trip.transit = obj.transit;

      this.tripManager.save(trip).then((trip) => {
        let saveLocations = locations.map((location) => {
          location.tripId = trip.id;
          return this.locationManager.save(location);
        });
        return Promise.all(saveLocations).then(() => {});
      });
    });

    return Promise.all(saveTrips).then(() => {});
  }

  public upgrade() {
    this.file.readAsText(this.file.dataDirectory, Legacy.DB_NAME)
      .then((content) => {
        let data = JSON.parse(content),
          appUpgrade = Promise.resolve(),
          tripsUpgrade = Promise.resolve();
        data.collections.forEach((collection) => {
          if (collection.name == 'app')
            appUpgrade = this.upgradeApp(collection);
          if (collection.name == 'trips')
            tripsUpgrade = this.upgradeTrips(collection);
        });
        return Promise.all([appUpgrade, tripsUpgrade]);
      })
      .then(() => this.file.removeFile(this.file.dataDirectory, Legacy.DB_NAME))
      .catch((err) => {
        // Ignore file not found errors (i.e., no legacy database to import).
        if (err.code != 1) throw err;
      });
  }
}
