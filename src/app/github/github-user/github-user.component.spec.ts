import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { GithubService } from 'src/app/shared';
import { GithubUserComponent } from './github-user.component';

describe('GithubUserComponent', () => {
  let component: GithubUserComponent;
  let fixture: ComponentFixture<GithubUserComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;

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
});
