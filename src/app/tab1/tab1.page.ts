import { Component, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ModalCtrlComponent } from '../modal-ctrl/modal-ctrl.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonModal)
  modal!: IonModal;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalCtrlComponent
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async presentToast(position: any) {
    const toast = await this.toastCtrl.create({
      message: 'Hello World!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

}
