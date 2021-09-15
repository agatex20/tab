import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorage } from '../constants';
import { AccessLevelEnum } from '../dto/accessLevelEnum';
import { AuthResponse } from '../dto/authResponse';
import { UserResponse } from '../dto/userResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth_token}`,
    });
  }

  public get accessLvl(): AccessLevelEnum {
    const accLvl = localStorage.getItem(LocalStorage.accessLvl);

    if (accLvl) {
      return JSON.parse(accLvl);
    }

    return AccessLevelEnum.Undefined;
  }

  public get loggedUser(): UserResponse | undefined {
    const lgUser = localStorage.getItem(LocalStorage.loggedUser);

    if (lgUser) {
      return JSON.parse(lgUser);
    }

    return undefined;
  }

  public get auth_token(): string | undefined {
    const token = localStorage.getItem(LocalStorage.auth_token);
    if (token) {
      return token;
    }

    return undefined;
  }

  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.loggedUser !== undefined
  );

  constructor() {}

  login(authResponse: AuthResponse, accessLvl?: AccessLevelEnum) {
    localStorage.setItem(
      LocalStorage.loggedUser,
      JSON.stringify(authResponse.loggedUser)
    );
    localStorage.setItem(LocalStorage.auth_token, authResponse.token);
    localStorage.setItem(LocalStorage.accessLvl, JSON.stringify(accessLvl));
    this._isLoggedIn.next(true);
  }

  logout() {
    localStorage.removeItem(LocalStorage.loggedUser);
    localStorage.removeItem(LocalStorage.auth_token);
    localStorage.removeItem(LocalStorage.accessLvl);
    this._isLoggedIn.next(false);
  }

  public get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }
}
