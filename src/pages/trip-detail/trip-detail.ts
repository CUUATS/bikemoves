import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Trip } from '../../app/trip';

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  trip: Trip;

  constructor(public navParams: NavParams) {
    this.trip = navParams.data;
  }
}
