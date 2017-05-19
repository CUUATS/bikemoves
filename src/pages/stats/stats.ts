import { Component, ViewChild } from '@angular/core';
import { Content, Events, NavController } from 'ionic-angular';
import { Trip } from '../../app/trip';
import { Trips } from '../../app/trips';
import { TripStatsProvider, TripStats } from '../../app/stats';
import { format } from '../../app/utils';
import { ChartEvent } from 'ng-chartist';
import * as moment from 'moment';
import * as Chartist from 'chartist';

interface Chart {
  id: string;
  type: string;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  icon: string;
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

  public getGHG(start?: moment.Moment, end?: moment.Moment) {
    return this.getDistance(start, end) * 0.8115
  }

  public getTripsCount(start?: moment.Moment, end?: moment.Moment) {
    return this.getTrips(start, end).length;
  }

  public get(variable: string, start?: moment.Moment, end?: moment.Moment) {
    switch (variable) {
      case 'duration': return this.getDuration(start, end).asMinutes();
      case 'distance': return this.getDistance(start, end);
      case 'speed': return this.getSpeed(start, end);
      case 'calories': return this.getCalories(start, end);
      case 'ghg': return this.getGHG(start, end);
      default: return this.getTripsCount(start, end);
    }
  }
}

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {
  @ViewChild(Content) content: Content;
  private range: 'week' | 'month' | 'year' = 'week';
  private provider = new RangeProvider();
  private stats: TripStats;
  private tripsCount = '0';
  private charts: Chart[] = [];
  private isActiveTab = false;

  constructor(
    private navCtrl: NavController,
    private events: Events,
    private tripManager: Trips) {
    this.stats = new TripStats(this.provider);
    this.events.subscribe('state:active', this.onActiveChange.bind(this));
  }

  ionViewWillEnter() {
    this.isActiveTab = true;
    this.updateRange();
  }

  ionViewWillLeave() {
    this.isActiveTab = false;
  }

  private onActiveChange(active: boolean) {
    if (active && this.isActiveTab) this.updateRange();
  }

  private getStart() {
    return moment().startOf(this.range);
  }

  private getEnd() {
    return moment().endOf(this.range);
  }

  private isCumulative(stat: string) {
    return ['trips', 'speed'].indexOf(stat) === -1;
  }

  public formatRange() {
    return {
      week: 'Week',
      month: 'Month',
      year: 'Year'
    }[this.range];
  }

  private getChartIcon(stat: string) {
    return {
      trips: 'bicycle',
      duration: 'stopwatch',
      distance: 'pin',
      speed: 'speedometer',
      calories: 'pizza',
      ghg: 'leaf'
    }[stat];
  }

  private getChartTitle(stat: string) {
    let title = (this.isCumulative(stat)) ? 'Total ' : {
      week: 'Daily ',
      month: 'Daily ',
      year: 'Monthly '
    }[this.range];
    title += {
      trips: 'Trips',
      duration: 'Time',
      distance: 'Distance',
      speed: 'Average Speed',
      calories: 'Calories',
      ghg: 'GHG Reduced'
    }[stat];
    return title;
  }

  private getXAxisLabel(stat: string) {
    return {
      week: 'Day',
      month: 'Day',
      year: 'Month'
    }[this.range];
  }

  private getYAxisLabel(stat: string) {
    return {
      trips: 'Trips',
      duration: 'Minutes',
      distance: 'Miles',
      speed: 'MPH',
      calories: 'Calories',
      ghg: 'Lb GHG'
    }[stat];
  }

  private getChartRanges() {
    let deltaUnit = {
        week: 'day',
        month: 'day',
        year: 'month'
      }[this.range],
      delta = moment.duration(1,
        (deltaUnit as moment.unitOfTime.DurationConstructor)),
      start = this.getStart(),
      rangeEnd = this.getEnd(),
      ranges = [];

    while (start.isBefore(rangeEnd)) {
      let end = start.clone().endOf((deltaUnit as moment.unitOfTime.Base));
      ranges.push([start.clone(), (end.isBefore(rangeEnd) ? end : rangeEnd)])
      start.add(delta).startOf((deltaUnit as moment.unitOfTime.Base));
    }

    return ranges;
  }

  private getChartLabels(stat: string, ranges) {
    let dateFormat = {
        week: 'dd',
        month: 'D',
        year: 'MMM'
      }[this.range],
      interval = {
        week: 1,
        month: 4,
        year: 3
      }[this.range];
    return ranges.map((range, i) => (i % interval === 0) ?
      range[0].format(dateFormat) : null);
  }

  private getChartSeries(stat: string, ranges) {
    let now = moment(),
      rangeStart = this.getStart(),
      values = ranges.map((range) => {
        let start = (this.isCumulative(stat)) ? rangeStart : range[0];
        return (range[0].isBefore(now)) ?
          this.provider.get(stat, start, range[1]) : null;
      });
    return [values];
  }

  private updateRange() {
    let start = this.getStart().valueOf();
    return this.tripManager.filter('start_time >= ?', 'start_time ASC', [start])
      .then((trips) => {
        this.provider.setTrips(trips);
        this.tripsCount = format(trips.length);
        this.updateCharts();
      });
  }

  private updateCharts() {
    if (!this.provider.hasTrips()) {
      this.charts = [];
      return;
    }

    let ranges = this.getChartRanges(),
      stats = ['trips', 'duration', 'distance', 'speed', 'calories', 'ghg'];
    this.charts = stats.map((stat) => {
      return {
        id: stat,
        type: (this.isCumulative(stat)) ? 'Line' : 'Bar',
        data: {
          labels: this.getChartLabels(stat, ranges),
          series: this.getChartSeries(stat, ranges)
        },
        options: {
          chartPadding: {
            right: 20
          },
          fullWidth: true
        },
        title: this.getChartTitle(stat),
        xAxisLabel: this.getXAxisLabel(stat),
        yAxisLabel: this.getYAxisLabel(stat),
        icon: this.getChartIcon(stat)
      };
    });
  }

  public scrollTo(stat: string) {
    let card = (document as any).getElementById('chart-' + stat);
    this.content.scrollTo(0, card.offsetTop);
  }

  public scrollToTop() {
    this.content.scrollToTop();
  }

}
