import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  private modal: boolean;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController) {
      this.modal = this.navParams.get('modal');
    }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
