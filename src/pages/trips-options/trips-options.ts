import { ChangeDetectorRef, Component } from '@angular/core';
import { Settings, Preferences } from '../../app/settings';


@Component({
  selector: 'page-trips-options',
  templateUrl: 'trips-options.html'
})
export class TripsOptionsPage {
  private viewType: 'grid' | 'list';
  private prefs: Preferences;
  constructor(
      private cdr: ChangeDetectorRef,
      private settings: Settings) {
    this.settings.getPreferences()
      .then((prefs) => {
        this.prefs = prefs;
        this.viewType = (this.prefs.tripsListView) ? 'list' : 'grid';
      });
  }

  public updatePreferences() {
    if (this.prefs.tripsListView != (this.viewType == 'list')) {
      this.prefs.tripsListView = this.viewType == 'list';
      this.settings.savePreferences();
    }
  }

}
