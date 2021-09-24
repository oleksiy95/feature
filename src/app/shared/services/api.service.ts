import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from './';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private httpClient: HttpClient, private notification: NotificationService) { }

  public get<T>(url: string, headers?: HttpHeaders) {
    return this.httpClient.get<T>(url, { headers }).pipe(catchError(error => this.handleError(error)));
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body).pipe(catchError(error => this.handleError(error)));
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(url, body).pipe(catchError(error => this.handleError(error)));
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url).pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    const message = (error.error instanceof ErrorEvent) ?
      error.error.message :
      `Server returned code ${error.status} with body "${error.error}"`;

    this.notification.showError(message);

    return throwError(error);
  }

}