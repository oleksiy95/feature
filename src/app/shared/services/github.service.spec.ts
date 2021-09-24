import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [{provide: ApiService, useValue: spy}]
    });
    service = TestBed.inject(GithubService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
