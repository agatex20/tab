import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConsts } from '../constants';
import { AccessLevelEnum } from '../dto/accessLevelEnum';
import { UserResponse } from '../dto/userResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthRequestService {
  private auth_token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZyIsImp0aSI6IjM0N2YxYjRlLTQwOTQtNDQyZC1iMTQ1LTU4MDU4YjBjZmMxMiIsImFjY2Vzc0xldmVsIjoiTWFuYWdlciIsIm5iZiI6MTYzMTYzODkzOSwiZXhwIjoxNjMxNjQwNzM5LCJpYXQiOjE2MzE2Mzg5Mzl9.FX2JLho-888DFBDthGD1DPV0TLhGHOhbVrwMtZSkOhQ';

  //po zalogowaniu nalezy ustawic logged user i accessLvl
  public accessLvl: AccessLevelEnum = AccessLevelEnum.Undefined;
  public loggedUser?: UserResponse;

  private get headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth_token}`,
    });
  }
  constructor(private http: HttpClient) {}

  addUser(user: UserResponse) {
    this.loggedUser = user;
  }

  removeUser() {
    this.loggedUser = undefined;
  }

  addToken(token: string) {
    this.auth_token = token;
  }

  removeToken() {
    this.auth_token = '';
  }

  logout() {
    this.removeUser();
    this.removeToken();
    this.accessLvl = AccessLevelEnum.Undefined;
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(UrlConsts.localhost + `/${endpoint}`, {
      headers: this.headers,
    });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(UrlConsts.localhost + `/${endpoint}`, body, {
      headers: this.headers,
    });
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(UrlConsts.localhost + `/${endpoint}`, body, {
      headers: this.headers,
    });
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(UrlConsts.localhost + `/${endpoint}`, {
      headers: this.headers,
    });
  }
}
