import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
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

  constructor(private navParams: NavParams, private viewCtrl: ViewController, private tripManager: Trips) {
    this.trip = navParams.data;
  }

  ionViewWillLeave() {
    this.tripManager.save(this.trip);
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }

}
