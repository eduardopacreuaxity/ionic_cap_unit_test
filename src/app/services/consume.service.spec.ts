import { TestBed } from '@angular/core/testing';

import { ConsumeService } from './consume.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('ConsumeService', () => {
  let service: ConsumeService;
  let httpCtrl: HttpTestingController;

  const HTTP_RESPONSE = [
    { "id": 1, "name": "eduardo" },
    { "id": 2, "name": "paco" }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConsumeService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get employees - success', () => {
    service.getEmployees()
      .subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
          expect(response.length).toBe(2);
        }
      });
    const mockHttp = httpCtrl.expectOne('http://localhost:3000/employees');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(HTTP_RESPONSE);
  });

  it('should get employees - error', () => {
    service.getEmployees()
    .subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(error.status).withContext('status').toEqual(401);
        }
    });

    const mockHttp = httpCtrl.expectOne('http://localhost:3000/employees');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush("error request", { status: 401, statusText: 'Unathorized access' });
  });
});
