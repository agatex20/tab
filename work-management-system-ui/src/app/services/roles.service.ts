import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleUpdateDTO } from '../dto/roleUpdateDTO';
import { AuthRequestService } from './auth-request.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private authService: AuthRequestService) {}

  getAll(): Observable<RoleUpdateDTO[]> {
    return this.authService.get<RoleUpdateDTO[]>('Roles');
  }

  add(name: string, accessLevel: number): Observable<RoleUpdateDTO> {
    return this.authService.post<RoleUpdateDTO>('Roles', {name, accessLevel});
  }

  update(role: RoleUpdateDTO): Observable<RoleUpdateDTO> {
    let body = JSON.stringify(role);
    let index = body.indexOf("\"accessLevel\":")
    body = body.substring(0, index+14) + role.accessLevel + "}";
    let json = JSON.parse(body);
    return this.authService.put<RoleUpdateDTO>('Roles', json);
  }

  get(roleId: string): Observable<RoleUpdateDTO> {
    return this.authService.get<RoleUpdateDTO>(`Roles/${roleId}`);
  }

  delete(roleId: string): Observable<RoleUpdateDTO> {
    return this.authService.delete(`Roles/${roleId}`);
  }
}
