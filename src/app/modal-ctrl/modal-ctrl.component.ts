import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-ctrl',
  templateUrl: './modal-ctrl.component.html',
  styleUrls: ['./modal-ctrl.component.scss'],
})
export class ModalCtrlComponent  implements OnInit {

  name: string = '';

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
