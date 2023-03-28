import { Component } from '@angular/core';
import { ConsumeService } from '../services/consume.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  list: any[] = [];
  handlerMessage: string = '';

  constructor(
    private _consume: ConsumeService,
    private alertCtrl: AlertController
  ) {
    this.getEmployeeList();
  }

  loadList(event: any) {
    console.log(event);
    if (event) {
      setTimeout(() => {
        event.target.complete();
        this.getEmployeeList();
      }, 2000)
    }
  }

  handleRefresh(event: any) {
    if (event) {
      setTimeout(() => {
        // Any calls to load data go here
        event.target.complete();
        this.list = [];
        this.getEmployeeList();
      }, 2000);
    }
  }

  getEmployeeList() {
    this._consume.getEmployees().subscribe(resp => {
      this.list = this.list.concat(resp);
    }, err => {
      this.presentAlert('List not found, try later');
    })
  }

  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();
  }

}
