import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Role } from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Role[]>(`http://localhost:25889/Roles`);
  }

  delete(roleId: string) {
    return this.http.delete(`http://localhost:25889/Roles/${roleId}`);
  }

  update(role: Role) {
    let body = JSON.stringify(role);
    let index = body.indexOf("\"accessLevel\":")
    body = body.substring(0, index+14) + role.accessLevel + "}";
    let json = JSON.parse(body);
    return this.http.put<Role>(`http://localhost:25889/Roles`, json);
  }

  add(name: string, accessLevel: number) {
    return this.http.post(`http://localhost:25889/Roles`, {name, accessLevel});
  }
}
