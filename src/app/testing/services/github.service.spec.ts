import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService, asyncData, asyncError, GithubRepo, GithubService, GithubUser } from 'src/app/shared';


describe('GithubService', () => {
  let service: GithubService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: spy }]
    });
    service = TestBed.inject(GithubService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getGithubUser shoud return expected value (ApiService called once)', (done: DoneFn) => {
    const expextedUser: GithubUser = { name: 'Test', id: 1 } as any;
    apiServiceSpy.get.and.returnValue(asyncData(expextedUser));

    service.getGithubUser('Test').subscribe(user => {
      expect(user).withContext('expected user').toEqual(expextedUser);
      done();
    }, done.fail)
    expect(apiServiceSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('#getUserRepos shoud return expected value (ApiService called once)', (done: DoneFn) => {
    const expextedRepos: GithubRepo[] = [{ name: 'Test', id: 1 }, { name: 'Test2', id: 2 }] as any;
    apiServiceSpy.get.and.returnValue(asyncData(expextedRepos));

    service.getUserRepos('Test').subscribe(repos => {
      expect(repos).withContext('expected user repos').toEqual(expextedRepos);
      done();
    }, done.fail)
    expect(apiServiceSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('#getGithubUser should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    apiServiceSpy.get.and.returnValue(asyncError(errorResponse));

    service.getGithubUser('test').subscribe(
      heroes => done.fail('expected an error, not heroes'),
      error => {
        expect(error.error).toContain('test 404 error');
        done();
      }
    );
  });

  it('#getUserRepos should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    apiServiceSpy.get.and.returnValue(asyncError(errorResponse));

    service.getUserRepos('test').subscribe(
      heroes => done.fail('expected an error, not heroes'),
      error => {
        expect(error.error).toContain('test 404 error');
        done();
      }
    );
  });
});
