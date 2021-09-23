import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubRepo, GithubService, GithubUser } from 'src/app/shared';

@Component({
  selector: 'app-github-user',
  templateUrl: './github-user.component.html',
  styleUrls: ['./github-user.component.scss']
})
export class GithubUserComponent implements OnInit {
  public $gitHubUser: Observable<GithubUser>;
  public $repos: Observable<GithubRepo[]>;
  constructor(private gitHubService: GithubService) {}

  public ngOnInit() {
    
  }

  public getUser(user: string) {
    this.$gitHubUser = this.gitHubService.getGithubUser(user);
  }

  public getRepos(user: string) {
    this.$repos = this.gitHubService.getUserRepos(user);
  }
}
