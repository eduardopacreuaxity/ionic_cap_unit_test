import { Component, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild(IonDatetime)
  datetime!: IonDatetime;
  fruit: string = 'strawberries';

  constructor() {}

  confirm() {
    this.datetime.confirm().then(() => {
      console.log('ION DATE', this.datetime.value);
    });
  }

  valueChange(event: any) {
    console.log('EVENT', event.detail.value);
  }

  selectOneFruit(event: any) {
    console.log(event.detail.value);
  }

  selectMultipleFruits(event: any) {
    console.log(event.detail.value);
  }

  check(event: any) {
    console.log(event.detail.checked);
  }

  fruitRadioSelected(event: any) {
    console.log(this.fruit);
  }

}
