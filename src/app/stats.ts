import * as moment from 'moment';
import { format, pad } from './utils';

export interface TripStatsProvider {
  getDuration(): moment.Duration;
  getDistance(): number;
  getSpeed(): number;
  getCalories(): number;
}

export class TripStats {
  constructor (private provider: TripStatsProvider) {}

  public formatDuration() {
    let duration = this.provider.getDuration(),
      hours = pad(duration.hours(), 2),
      minutes = pad(duration.minutes(), 2),
      seconds = pad(duration.seconds(), 2);

    return [hours, minutes, seconds].join(':');
  }

  public formatDistance() {
    return format(this.provider.getDistance(), 1);
  }

  public formatSpeed() {
    return format(this.provider.getSpeed(), 1);
  }

  public formatCalories() {
    return format(this.provider.getCalories(), 0);
  }

  public formatGHG() {
    return format(this.provider.getDistance() * 0.8115, 1);
  }
}
