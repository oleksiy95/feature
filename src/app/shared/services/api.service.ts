import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public get<T>(url: string, headers?: HttpHeaders) {
    return this.httpClient.get<T>(url, { headers });
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body);
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(url, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url);
  }

}