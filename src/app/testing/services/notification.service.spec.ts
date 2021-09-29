import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/shared';


describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  const message = 'test';

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: spy }]
    });
    service = TestBed.inject(NotificationService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#showError shoud call snackbar open method', () => {
    service.showError(message);
    expect(snackBarSpy.open.calls.count()).withContext('one call').toBe(1);
    expect(snackBarSpy.open.calls.first().args[0]).withContext('message').toBe(message);
  });

  it('#showSuccess shoud call snackbar open method', () => {
    service.showSuccess(message);
    expect(snackBarSpy.open.calls.count()).withContext('one call').toBe(1);
    expect(snackBarSpy.open.calls.first().args[0]).withContext('message').toBe(message);
  });

  it('#showWarning shoud call snackbar open method', () => {
    service.showWarning(message);
    expect(snackBarSpy.open.calls.count()).withContext('one call').toBe(1);
    expect(snackBarSpy.open.calls.first().args[0]).withContext('message').toBe(message);
  });

  it('#showMessage shoud call snackbar open method', () => {
    service.showMessage(message);
    expect(snackBarSpy.open.calls.count()).withContext('one call').toBe(1);
    expect(snackBarSpy.open.calls.first().args[0]).withContext('message').toBe(message);
  });

  
});
