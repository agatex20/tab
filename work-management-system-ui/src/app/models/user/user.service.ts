import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { Configuration } from "../../config";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`http://localhost:25889/Users`);
  }

  register(user: User) {
    return this.http.post(`${Configuration.API_URL}users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${Configuration.API_URL}users/${id}`);
  }
}
