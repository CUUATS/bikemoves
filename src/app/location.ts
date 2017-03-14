import turf from 'turf';

export class Location {
  constructor(
    public longitude: number,
    public latitude: number,
    public accuracy: number = null,
    public altitude: number = null,
    public heading: number = null,
    public speed: number = null,
    public time: Date = null,
    public moving: boolean = null,
    public locationType: number = null) {}

  static fromPosition(position) {
    return new Location(
      position.coords.longitude,
      position.coords.latitude,
      position.coords.accuracy,
      position.coords.altitude,
      position.coords.heading,
      position.coords.speed,
      position.timestamp,
      position.is_moving)
  }

  static fromLngLat(lngLat: [number, number]) {
    return new Location(lngLat[0], lngLat[1]);
  }

  public toLngLat() {
    return [this.longitude, this.latitude];
  }

  private toPoint() {
  	return turf.point([this.longitude, this.latitude]);
  }

  public distanceTo(loc: Location) {
    return turf.distance(this.toPoint(), loc.toPoint(), 'kilometers') * 1000;
  }

}
