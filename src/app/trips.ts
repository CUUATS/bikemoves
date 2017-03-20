import { Injectable } from '@angular/core';
import { Geo } from './geo';
import { Service } from './service';
import { Trip } from './trip';

@Injectable()
export class Trips extends Service {
  private trip: Trip;

  constructor(private geo: Geo) {
    super();
  }

}
