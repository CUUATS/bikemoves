import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { Remote } from '../../app/remote';
import { Incident } from '../../app/incident';
import { notify } from '../../app/utils';

@Component({
  selector: 'page-incident-form',
  templateUrl: 'incident-form.html'
})
export class IncidentFormPage {
  public categories = [
    'Crash',
    'Hazard',
    'Maintenance Issue',
    'Other'
  ];
  private incident: Incident;

  constructor(
      private navParams: NavParams,
      private viewCtrl: ViewController,
      private toastCtrl: ToastController,
      private remote: Remote) {
    this.incident = new Incident(navParams.data);
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }

  public sendIncident() {
    this.remote.postIncident(this.incident)
      .then(() => notify(this.toastCtrl, 'Report sent successfully!'))
      .catch(() => notify(this.toastCtrl,
        'Report upload failed. Please try again later.'));
    this.closeModal();
  }

}
