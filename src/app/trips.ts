import { Injectable } from '@angular/core';
import { Geo } from './geo';
import { Service } from './service';
import { Trip } from './trip';

@Injectable()
export class Trips extends Service {
  private trip: Trip;

  constructor(private geo: Geo) {
    super();
    geo.locations.subscribe(this.onLocation.bind(this));
  }

  private onLocation(location) {
    if (location.moving) {
      console.log('Adding point to trip');
      if (!this.trip) this.trip = new Trip();
      this.trip.addLocation(location)
    } else {
      // If this is the last point in the trip (first stationary point),
      // end and save the trip.
      if (this.trip) {
        console.log('Ending trip');
        this.trip.addLocation(location);
        this.trip.save();
        this.trip = undefined;
      }
    }
  }

}
