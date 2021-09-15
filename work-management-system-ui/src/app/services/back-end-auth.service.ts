import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConsts } from '../constants';
import { AddUserDTO } from '../dto/addUserDTO';
import { AuthResponse } from '../dto/authResponse';
import { UserAuthorizationDTO } from '../dto/userAuthorizationDTO';

@Injectable({
  providedIn: 'root',
})
export class BackEndAuthService {
  constructor(private http: HttpClient) {}

  register(user: AddUserDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      UrlConsts.localhost + '/Authorization/register',
      user
    );
  }

  login(user: UserAuthorizationDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      UrlConsts.localhost + '/Authorization/login',
      user
    );
  }
}
