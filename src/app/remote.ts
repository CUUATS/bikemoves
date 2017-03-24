import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Device } from '@ionic-native/device';
import { Location } from './location';
import { Trip } from './trip';
import { Trips } from './trips';
import { API_ENDPOINT, DEBUG } from './config';
import { bikemoves as messages } from './messages';

@Injectable()
export class Remote {

  constructor(private tripManager: Trips, private device: Device, private http: Http) {}

  private post(url: string, body: ArrayBuffer) {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/octet-stream'
      })
    });

    return this.http.post(API_ENDPOINT + url, body, options)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    if (DEBUG) console.error(errMsg);
    return Promise.reject(errMsg);
  }

  public postTrip(trip: Trip) {
    return this.tripManager.getLocations(trip).then((locations) => {
      let message = messages.Trip.create();
      message.deviceUuid = this.device.uuid;
      message.startTime = trip.startTime.valueOf();
      message.endTime = trip.endTime.valueOf();
      message.desiredAccuracy = trip.desiredAccuracy;
      message.transit = trip.transit;
      message.origin = trip.origin;
      message.destination = trip.destination;
      message.debug = DEBUG;
      message.appVersion = trip.appVersion;

      message.locations = locations.map((location: Location) => {
        let locationMessage = messages.Location.create();
        locationMessage.longitude = location.longitude;
        locationMessage.latitude = location.latitude;
        locationMessage.accuracy = location.accuracy;
        locationMessage.altitude = location.altitude;
        locationMessage.heading = location.heading;
        locationMessage.speed = location.speed;
        locationMessage.time = location.time.valueOf();
        locationMessage.moving = location.moving;
        locationMessage.event = location.event;
        locationMessage.activity = location.activity;
        locationMessage.confidence = location.confidence;
        return locationMessage;
      });

      return this.post('trip', messages.Trip.encode(message).finish().buffer);
    });
  }
}
