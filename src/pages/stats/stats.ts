import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { TripStatsProvider, TripStats } from '../../app/stats';
import { format } from '../../app/utils';
import * as moment from 'moment';

class RangeProvider implements TripStatsProvider {
  public duration = moment.duration(0);
  public distance = 0;
  public calories = 0;

  public getDuration() {
    return this.duration;
  }

  public getDistance() {
    return this.distance;
  }

  public getSpeed() {
    let hours = this.duration.asHours();
    return (hours > 0) ? this.distance / hours : 0;
  }

  public getCalories() {
    return this.calories;
  }
}

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {
  private range: 'week' | 'month' | 'year' = 'week';
  private stats: TripStats;
  private tripsCount = '0';

  constructor(private navCtrl: NavController,
    private tripManager: Trips) {
    this.updateStats();
  }

  private updateStats() {
    let start = moment().startOf(this.range).valueOf();
    return this.tripManager.filter('start_time >= ?', 'start_time ASC', [start])
      .then((trips) => this.aggregateTrips(trips));
  }

  private aggregateTrips(trips: Trip[]) {
    let provider = trips.reduce((provider: RangeProvider, trip: Trip) => {
      provider.duration.add(trip.getDuration());
      provider.distance += trip.getDistance();
      provider.calories += trip.getCalories();
      return provider;
    }, new RangeProvider());
    this.stats = new TripStats(provider);
    this.tripsCount = format(trips.length);
  }
}
