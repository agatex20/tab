import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConsts } from '../constants';
import { AuthResponse } from '../dto/authResponse';
import { UserAuthorizationDTO } from '../dto/userAuthorizationDTO';
import { UserRegistrationDTO } from '../dto/userRegistrationDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: UserRegistrationDTO): Observable<AuthResponse> {
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
