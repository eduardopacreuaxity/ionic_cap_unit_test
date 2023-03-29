import { Component, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ModalCtrlComponent } from '../modal-ctrl/modal-ctrl.component';
import { Share } from '@capacitor/share';
import { NativeBiometric } from "capacitor-native-biometric";

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
  credentials: string = '';

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

  async shareLink() {
    const canShare = await Share.canShare();

    if (canShare.value) {
      await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: 'http://ionicframework.com/',
        dialogTitle: 'Share with buddies',
      });
    } else {
      this.presentToast('bottom');
    }
  }

  async setBiometric() {
    const result = await NativeBiometric.isAvailable();

    if(!result.isAvailable) return;

    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Log in",
      subtitle: "Maybe add subtitle here?",
      description: "Maybe a description too?",
    })
      .then(() => true)
      .catch(() => false);

    if(!verified) return;

    const deleteCredentials = await NativeBiometric.deleteCredentials({ server: "ionic", });
    const setCredentials = await NativeBiometric.setCredentials({
      username: 'eduardo.pacreu',
      password: '',
      server: "ionic",
    });

    this.credentials = 'Usuario Guardado';
    this.presentToast('bottom');
  }

  async getBiometric() {
    const result = await NativeBiometric.isAvailable();

    if(!result.isAvailable) return;

    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Log in",
      subtitle: "Maybe add subtitle here?",
      description: "Maybe a description too?",
    })
      .then(() => true)
      .catch(() => false);

    if(!verified) return;

    const credentials = await NativeBiometric.getCredentials({
      server: "ionic",
    });

    this.credentials = `Usuario Recuperado: ${credentials.username}`;
    this.presentToast('bottom');
  }

}
