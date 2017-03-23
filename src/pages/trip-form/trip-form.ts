import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';

@Component({
  selector: 'page-trip-form',
  templateUrl: 'trip-form.html'
})
export class TripFormPage {
  trip: Trip;
  locationTypes = [
    {id: 0, label: 'Not Specified'},
    {id: 1, label: 'Home'}
  ];

  constructor(public navParams: NavParams, public tripManager: Trips) {
    this.trip = navParams.data;
    this.trip.origin = 1;
  }

}
