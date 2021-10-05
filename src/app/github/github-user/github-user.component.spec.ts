import { of } from 'rxjs';
import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { GithubRepo, GithubService, GithubUser } from 'src/app/shared';
import { GithubUserComponent } from './github-user.component';

describe('GithubUserComponent', () => {
  let component: GithubUserComponent;
  let fixture: ComponentFixture<GithubUserComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;
  const expectedUser: GithubUser = { name: 'Test Name', login: 'test' } as any;
  const expectedRepos: GithubRepo[] = [{ name: 'Test1' }, { name: 'Test2' }] as any;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('GithubService', ['getGithubUser', 'getUserRepos']);
    TestBed.configureTestingModule({
      declarations: [GithubUserComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
      ],
      providers: [{provide: GithubService, useValue: spy}]
    }).compileComponents();
    githubServiceSpy = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should take input value and search user', () => {
    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('.input-container input');
    const searchButton: HTMLButtonElement = fixture.nativeElement.querySelector('.button-container button');
    searchInput.value = 'test';
    fixture.detectChanges();
    searchButton.click();
    expect(githubServiceSpy.getGithubUser.calls.count()).withContext('one call').toBe(1);
    expect(githubServiceSpy.getGithubUser.calls.first().args[0]).withContext('user').toBe(searchInput.value);
  });

  it('ui should show user information', () => {
    githubServiceSpy.getGithubUser.and.returnValue(of(expectedUser));
    component.getUser(expectedUser.login);
    fixture.detectChanges();
    const name: HTMLElement = fixture.nativeElement.querySelector('mat-card-title');
    const login: HTMLElement = fixture.nativeElement.querySelector('mat-card-subtitle');

    expect(name.textContent).withContext('expected user name').toBe(expectedUser.name);
    expect(login.textContent).withContext('expected user login').toBe(expectedUser.login);
  });

  it('should search user repos', () => {
    component.$gitHubUser = of(expectedUser);
    fixture.detectChanges();
    const showReposButton: HTMLButtonElement = fixture.nativeElement.querySelector('mat-card-actions button');
    showReposButton.click();
    expect(githubServiceSpy.getUserRepos.calls.count()).withContext('one call').toBe(1);
    expect(githubServiceSpy.getUserRepos.calls.first().args[0]).withContext('user').toBe(expectedUser.login);
  });

  it('ui should show repos information', () => {
    githubServiceSpy.getUserRepos.and.returnValue(of(expectedRepos));
    component.getRepos(expectedUser.login);
    fixture.detectChanges();
    const repoCards: NodeList = fixture.nativeElement.querySelectorAll('.repo-card');

    expect(repoCards.length).withContext('repo count').toBe(expectedRepos.length);
  });
});
