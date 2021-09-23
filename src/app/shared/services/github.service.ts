import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { GithubRepo, GithubUser } from '../models';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly gitHubApi = 'https://api.github.com'

  constructor(private api: ApiService) { }

  public getGithubUser(user: string): Observable<GithubUser> {    
    return this.api.get(`${this.gitHubApi}/users/${user}`);
  }

  public getUserRepos(user: string): Observable<GithubRepo[]> {
    const headers = new HttpHeaders({'Accept': 'application/vnd.github.v3+json'})
    return this.api.get(`${this.gitHubApi}/users/${user}/repos`, headers);
  }
}
