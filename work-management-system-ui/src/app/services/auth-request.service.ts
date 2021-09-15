import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConsts } from '../constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRequestService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(UrlConsts.localhost + `/${endpoint}`, {
      headers: this.auth.headers,
    });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(UrlConsts.localhost + `/${endpoint}`, body, {
      headers: this.auth.headers,
    });
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(UrlConsts.localhost + `/${endpoint}`, body, {
      headers: this.auth.headers,
    });
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(UrlConsts.localhost + `/${endpoint}`, {
      headers: this.auth.headers,
    });
  }
}
