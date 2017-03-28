import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Device } from '@ionic-native/device';
import { Incident } from './incident';
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

  private locationToMessage(location: Location) {
    let message = messages.Location.create();
    message.longitude = location.longitude;
    message.latitude = location.latitude;
    message.accuracy = location.accuracy;
    message.altitude = location.altitude;
    message.heading = location.heading;
    message.speed = location.speed;
    message.time = (message.time) ? location.time.valueOf() : null;
    message.moving = location.moving;
    message.event = location.event;
    message.activity = location.activity;
    message.confidence = location.confidence;
    return message;
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
      message.locations = locations.map(this.locationToMessage);
      return this.post('trip', messages.Trip.encode(message).finish().buffer);
    });
  }

  public postIncident(incident: Incident) {
    let message = messages.Incident.create();
    message.deviceUuid = this.device.uuid;
    message.location = this.locationToMessage(incident.location);
    message.time = incident.time.valueOf();
    message.category = incident.category;
    message.comment = incident.comment;
    return this.post(
      'incident', messages.Incident.encode(message).finish().buffer);
  }
}
