import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let modalCtrl: ModalController;
  let toastCtrl: ToastController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    modalCtrl = TestBed.inject(ModalController);
    toastCtrl = TestBed.inject(ToastController);

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present modal', (done: DoneFn) => {
    spyOn(modalCtrl, 'create').and.callThrough();
    component.presentModal();
    setTimeout(() => {
      expect(modalCtrl.create).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should present toast', (done: DoneFn) => {
    spyOn(toastCtrl, 'create').and.callThrough();
    component.presentToast('top');
    setTimeout(() => {
      expect(toastCtrl.create).toHaveBeenCalled();
      done();
    }, 100);
  });
});
