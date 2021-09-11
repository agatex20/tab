import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || "null"));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject?.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`https://workmanagementsystemtab.azurewebsites.net/users/authenticate`, {
      username,
      password
    })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._isLoggedIn.next(true);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._isLoggedIn.next(false);
    this.currentUserSubject.next(null);
  }
}
