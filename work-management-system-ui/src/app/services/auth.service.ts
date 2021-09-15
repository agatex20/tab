import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessLevelEnum } from '../dto/accessLevelEnum';
import { AuthResponse } from '../dto/authResponse';
import { UserResponse } from '../dto/userResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public auth_token?: string;
  public accessLvl?: AccessLevelEnum = AccessLevelEnum.Undefined;
  public loggedUser?: UserResponse;

  public get headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth_token}`,
    });
  }
  constructor() {}

  login(authResponse: AuthResponse, accessLvl?: AccessLevelEnum) {
    this.loggedUser = authResponse.loggedUser;
    this.auth_token = authResponse.token;
    this.accessLvl = accessLvl;
    console.log(authResponse, accessLvl);
  }

  logout() {
    this.loggedUser = undefined;
    this.auth_token = '';
    this.accessLvl = AccessLevelEnum.Undefined;
  }
}
