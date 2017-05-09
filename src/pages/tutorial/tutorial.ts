import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  constructor(
    private viewCtrl: ViewController) {}

  private dismiss() {
    this.viewCtrl.dismiss();
  }
}
