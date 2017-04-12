import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { TripStatsProvider, TripStats } from '../../app/stats';
import { format } from '../../app/utils';
import { ChartEvent, ChartType } from 'ng-chartist';
import * as moment from 'moment';
import * as Chartist from 'chartist';

interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

class RangeProvider implements TripStatsProvider {
  private trips: Trip[] = [];

  private getTrips(start?: moment.Moment, end?: moment.Moment) {
    if (!start && !end) return this.trips;
    return this.trips
      .filter((trip) =>
        trip.startTime.isSameOrAfter(start) && trip.startTime.isBefore(end));
  }

  public setTrips(trips: Trip[]) {
    this.trips = trips;
  }

  public hasTrips() {
    return this.trips.length > 0;
  }

  public getDuration(start?: moment.Moment, end?: moment.Moment) {
    return this.getTrips(start, end).map((trip) => trip.getDuration())
      .reduce((total, duration) => total.add(duration), moment.duration(0));
  }

  public getDistance(start?: moment.Moment, end?: moment.Moment) {
    return this.getTrips(start, end).map((trip) => trip.getDistance())
      .reduce((total, distance) => total + distance, 0);
  }

  public getSpeed(start?: moment.Moment, end?: moment.Moment) {
    let hours = this.getDuration(start, end).asHours();
    return (hours > 0) ? this.getDistance(start, end) / hours : 0;
  }

  public getCalories(start?: moment.Moment, end?: moment.Moment) {
    return this.getTrips(start, end).map((trip) => trip.getCalories())
      .reduce((total, cal) => total + cal, 0);
  }
}

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {
  private range: 'week' | 'month' | 'year' = 'week';
  private provider = new RangeProvider();
  private chartView: 'trips' | 'duration' | 'distance' | 'speed' | 'calories' |
    'ghg' = 'distance';
  private stats: TripStats;
  private tripsCount = '0';
  private chart: Chart;

  constructor(private navCtrl: NavController,
    private tripManager: Trips) {
    this.stats = new TripStats(this.provider);
    this.updateRange();
  }

  private getStart() {
    return moment().startOf(this.range);
  }

  private getEnd() {
    return moment().endOf(this.range);
  }

  private getChartRanges() {
    let deltaUnit = {
        week: 'day',
        month: 'day',
        year: 'month'
      }[this.range],
      delta = moment.duration(1, deltaUnit),
      start = this.getStart(),
      rangeEnd = this.getEnd(),
      ranges = [];

    while (start.isBefore(rangeEnd)) {
      let end = start.clone().endOf(deltaUnit);
      ranges.push([start.clone(), (end.isBefore(rangeEnd) ? end : rangeEnd)])
      start.add(delta).startOf(deltaUnit);
    }

    return ranges;
  }

  private getChartLabels(ranges) {
    let dateFormat = {
      week: 'dd',
      month: 'D',
      year: 'MMM'
    }[this.range];
    return ranges.map((range) => range[0].format(dateFormat));
  }

  private getChartSeries(ranges) {
    let now = moment(),
      values = ranges.map((range) => {
        let start = range[0],
          end = range[1];
        return (start.isBefore(now)) ?
          this.provider.getDistance(start, end) : null;
      });
    return [values];
  }

  private updateRange() {
    let start = this.getStart().valueOf();
    return this.tripManager.filter('start_time >= ?', 'start_time ASC', [start])
      .then((trips) => {
        this.provider.setTrips(trips);
        this.tripsCount = format(trips.length);
        this.updateChart();
      });
  }

  private updateChart() {
    let ranges = this.getChartRanges();
    this.chart = {
      type: 'Line',
      data: {
        labels: this.getChartLabels(ranges),
        series: this.getChartSeries(ranges)
      },
      options: {
        chartPadding: {
          right: 20
        },
        fullWidth: true
      }
    };
  }

}
