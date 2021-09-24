import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { ApiService } from './api.service';

interface Data {
  name: string;
}

describe('ApiService', () => {
  let testUrl = '/data';
  let api: ApiService;
  let httpTestingController: HttpTestingController;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NotificationService', ['showError']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: NotificationService, useValue: spy }]
    });
    api = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(api).toBeTruthy();
  });

  it('it should make GET http request', () => {
    const testData: Data = { name: 'Test Data' };
    api.get<Data>(testUrl).subscribe(data => expect(data).toEqual(testData));
    const req = httpTestingController.expectOne('/data');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('it should make POST http request', () => {
    const testData: Data = { name: 'Test Data' };
    api.post<Data>(testUrl, testData).subscribe(data => expect(data).toEqual(testData));
    const req = httpTestingController.expectOne('/data');
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('it should make PUT http request', () => {
    const testData: Data = { name: 'Test Data' };
    api.put<Data>(testUrl, testData).subscribe(data => expect(data).toEqual(testData));
    const req = httpTestingController.expectOne('/data');
    expect(req.request.method).toEqual('PUT');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('it should make DELETE http request', () => {
    api.delete<Data>(testUrl).subscribe();
    const req = httpTestingController.expectOne('/data');
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
    httpTestingController.verify();
  });

  it('it should handle http error', () => {
    const emsg = 'deliberate 404 error';

    api.get<Data[]>(testUrl).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(notificationServiceSpy.showError.calls.count()).withContext('spy method was called once').toBe(1);
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('error').toEqual(emsg);
      }
    );

    const req = httpTestingController.expectOne(testUrl);
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('it should handle network error', () => {
    const emsg = 'simulated network error';

    api.get<Data[]>(testUrl).subscribe(
      data => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(notificationServiceSpy.showError.calls.count()).withContext('spy method was called once').toBe(1);
        expect(error.error.message).withContext('message').toEqual(emsg);
      }
    );

    const req = httpTestingController.expectOne(testUrl);
    const mockError = new ErrorEvent('Network error', { message: emsg });
    req.error(mockError);
  });

  it('httpTestingController.verify should fail if HTTP response not simulated', () => {
    api.get('some/api').subscribe();
    expect(() => httpTestingController.verify()).toThrow();
    const req = httpTestingController.expectOne('some/api');
    req.flush(null);
  });
});
