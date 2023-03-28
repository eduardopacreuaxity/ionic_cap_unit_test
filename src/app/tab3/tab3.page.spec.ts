import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of, throwError } from 'rxjs';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ConsumeService } from '../services/consume.service';

import { Tab3Page } from './tab3.page';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;
  let consumeSpyService: jasmine.SpyObj<ConsumeService>;

  beforeEach(async () => {
    consumeSpyService = jasmine.createSpyObj<ConsumeService>('ConsumeService', ['getEmployees']);
    consumeSpyService.getEmployees.and.callFake(() => of([
      { "id": 1, "name": "eduardo" },
      { "id": 2, "name": "paco" }
    ]));

    await TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule, HttpClientTestingModule],
      providers: [
        { provide: ConsumeService, useValue: consumeSpyService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load list - success', (done: DoneFn) => {
    spyOn(component, 'getEmployeeList').and.callThrough();
    const evnt = { target: { complete: () => {} } }
    component.loadList(evnt);
    setTimeout(() => {
      expect(component.list.length).toBeGreaterThan(2);
      expect(component.getEmployeeList).toHaveBeenCalled();
      done();
    }, 2000);
  });

  it('should load list - not defined', (done: DoneFn) => {
    spyOn(component, 'getEmployeeList').and.callThrough();
    const evnt = undefined;
    component.loadList(evnt);
    setTimeout(() => {
      expect(component.list.length).toBe(2);
      expect(component.getEmployeeList).not.toHaveBeenCalled();
      done();
    }, 2000);
  });

  it('should handle refresh - success', (done: DoneFn) => {
    spyOn(component, 'getEmployeeList').and.callThrough();
    const evnt = { target: { complete: () => {} } }
    component.handleRefresh(evnt);
    setTimeout(() => {
      expect(component.list.length).toBe(2);
      expect(component.getEmployeeList).toHaveBeenCalled();
      done();
    }, 2000);
  });

  it('should handle refresh - not defined', (done: DoneFn) => {
    spyOn(component, 'getEmployeeList').and.callThrough();
    const evnt = undefined;
    component.handleRefresh(evnt);
    setTimeout(() => {
      expect(component.list.length).toBe(2);
      expect(component.getEmployeeList).not.toHaveBeenCalled();
      done();
    }, 2000);
  });

  it('should get employee list - success', () => {
    spyOn(component, 'presentAlert').and.callThrough();
    component.list = [];
    component.getEmployeeList();
    expect(component.list.length).toBeGreaterThan(0);
    expect(component.presentAlert).not.toHaveBeenCalled();
  });

  it('should get employee list - error', () => {
    consumeSpyService.getEmployees.and.callFake(() => throwError(null));
    spyOn(component, 'presentAlert').and.callThrough();
    component.list = [];
    component.getEmployeeList();
    expect(component.list.length).toBe(0);
    expect(component.presentAlert).toHaveBeenCalled();
  });
});
