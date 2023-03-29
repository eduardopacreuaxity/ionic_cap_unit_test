import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Share } from '@capacitor/share';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { BiometryType, NativeBiometric } from 'capacitor-native-biometric';

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

  it('should share link - success', (done: DoneFn) => {
    spyOn(Share, 'canShare').and.callFake(() => Promise.resolve({ value: true }));
    spyOn(Share, 'share').and.callThrough();
    spyOn(component, 'presentToast').and.callThrough();
    component.shareLink();
    setTimeout(() => {
      expect(Share.canShare).toHaveBeenCalled();
      expect(Share.share).toHaveBeenCalled();
      expect(component.presentToast).not.toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should share link - cannot share', (done: DoneFn) => {
    spyOn(Share, 'canShare').and.callFake(() => Promise.resolve({ value: false }));
    spyOn(Share, 'share').and.callThrough();
    spyOn(component, 'presentToast').and.callThrough();
    component.shareLink();
    setTimeout(() => {
      expect(Share.canShare).toHaveBeenCalled();
      expect(Share.share).not.toHaveBeenCalled();
      expect(component.presentToast).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should set biometric - success', (done: DoneFn) => {
    spyOn(NativeBiometric, 'isAvailable').and.callFake(() => Promise.resolve({ isAvailable: true, biometryType: BiometryType.MULTIPLE }));
    spyOn(NativeBiometric, 'verifyIdentity').and.callThrough();
    spyOn(NativeBiometric, 'deleteCredentials').and.callThrough();
    spyOn(NativeBiometric, 'setCredentials').and.callThrough();
    spyOn(component, 'presentToast').and.callThrough();
    component.credentials = '';
    component.setBiometric();
    setTimeout(() => {
      expect(NativeBiometric.isAvailable).toHaveBeenCalled();
      expect(NativeBiometric.verifyIdentity).toHaveBeenCalled();
      expect(NativeBiometric.deleteCredentials).toHaveBeenCalled();
      expect(NativeBiometric.setCredentials).toHaveBeenCalled();
      expect(component.credentials).toBe('Usuario Guardado');
      expect(component.presentToast).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should set biometric - is not available', (done: DoneFn) => {
    spyOn(NativeBiometric, 'isAvailable').and.callFake(() => Promise.resolve({ isAvailable: false, biometryType: BiometryType.NONE, errorCode: 0 }));
    spyOn(NativeBiometric, 'verifyIdentity').and.callThrough();
    spyOn(NativeBiometric, 'deleteCredentials').and.callThrough();
    spyOn(NativeBiometric, 'setCredentials').and.callThrough();
    spyOn(component, 'presentToast').and.callThrough();
    component.credentials = '';
    component.setBiometric();
    setTimeout(() => {
      expect(NativeBiometric.isAvailable).toHaveBeenCalled();
      expect(NativeBiometric.verifyIdentity).not.toHaveBeenCalled();
      expect(NativeBiometric.deleteCredentials).not.toHaveBeenCalled();
      expect(NativeBiometric.setCredentials).not.toHaveBeenCalled();
      expect(component.credentials).toBe('');
      expect(component.presentToast).not.toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should set biometric - not verified', (done: DoneFn) => {
    spyOn(NativeBiometric, 'isAvailable').and.callFake(() => Promise.resolve({ isAvailable: true, biometryType: BiometryType.MULTIPLE }));
    spyOn(NativeBiometric, 'verifyIdentity').and.callFake(() => Promise.reject());
    spyOn(NativeBiometric, 'deleteCredentials').and.callThrough();
    spyOn(NativeBiometric, 'setCredentials').and.callThrough();
    spyOn(component, 'presentToast').and.callThrough();
    component.credentials = '';
    component.setBiometric();
    setTimeout(() => {
      expect(NativeBiometric.isAvailable).toHaveBeenCalled();
      expect(NativeBiometric.verifyIdentity).toHaveBeenCalled();
      expect(NativeBiometric.deleteCredentials).not.toHaveBeenCalled();
      expect(NativeBiometric.setCredentials).not.toHaveBeenCalled();
      expect(component.credentials).toBe('');
      expect(component.presentToast).not.toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should get biometric - success', (done: DoneFn) => {
    spyOn(NativeBiometric, 'isAvailable').and.callFake(() => Promise.resolve({ isAvailable: true, biometryType: BiometryType.MULTIPLE }));
    spyOn(NativeBiometric, 'verifyIdentity').and.callThrough();
    spyOn(NativeBiometric, 'getCredentials').and.callFake(() => Promise.resolve({ username: 'test', password: 'test1234' }));
    spyOn(component, 'presentToast').and.callThrough();
    component.credentials = '';
    component.getBiometric();
    setTimeout(() => {
      expect(NativeBiometric.isAvailable).toHaveBeenCalled();
      expect(NativeBiometric.verifyIdentity).toHaveBeenCalled();
      expect(NativeBiometric.getCredentials).toHaveBeenCalled();
      expect(component.credentials).toBe('Usuario Recuperado: test');
      expect(component.presentToast).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should get biometric - not available', (done: DoneFn) => {
    spyOn(NativeBiometric, 'isAvailable').and.callFake(() => Promise.resolve({ isAvailable: false, biometryType: BiometryType.NONE, errorCode: 0 }));
    spyOn(NativeBiometric, 'verifyIdentity').and.callThrough();
    spyOn(NativeBiometric, 'getCredentials').and.callFake(() => Promise.resolve({ username: 'test', password: 'test1234' }));
    spyOn(component, 'presentToast').and.callThrough();
    component.credentials = '';
    component.getBiometric();
    setTimeout(() => {
      expect(NativeBiometric.isAvailable).toHaveBeenCalled();
      expect(NativeBiometric.verifyIdentity).not.toHaveBeenCalled();
      expect(NativeBiometric.getCredentials).not.toHaveBeenCalled();
      expect(component.credentials).toBe('');
      expect(component.presentToast).not.toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should get biometric - not verified', (done: DoneFn) => {
    spyOn(NativeBiometric, 'isAvailable').and.callFake(() => Promise.resolve({ isAvailable: true, biometryType: BiometryType.MULTIPLE }));
    spyOn(NativeBiometric, 'verifyIdentity').and.callFake(() => Promise.reject());
    spyOn(NativeBiometric, 'getCredentials').and.callFake(() => Promise.resolve({ username: 'test', password: 'test1234' }));
    spyOn(component, 'presentToast').and.callThrough();
    component.credentials = '';
    component.getBiometric();
    setTimeout(() => {
      expect(NativeBiometric.isAvailable).toHaveBeenCalled();
      expect(NativeBiometric.verifyIdentity).toHaveBeenCalled();
      expect(NativeBiometric.getCredentials).not.toHaveBeenCalled();
      expect(component.credentials).toBe('');
      expect(component.presentToast).not.toHaveBeenCalled();
      done();
    }, 100);
  });
});
