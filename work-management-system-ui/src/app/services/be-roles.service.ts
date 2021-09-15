import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleDTO } from '../dto/roleDTO';
import { RoleUpdateDTO } from '../dto/roleUpdateDTO';
import { AuthRequestService } from './auth-request.service';

@Injectable({
  providedIn: 'root',
})
export class BERolesService {
  constructor(private authService: AuthRequestService) {}

  getAll(): Observable<RoleUpdateDTO[]> {
    return this.authService.get<RoleUpdateDTO[]>('Roles');
  }

  add(role: RoleDTO): Observable<RoleUpdateDTO> {
    return this.authService.post<RoleUpdateDTO>('Roles', role);
  }

  update(role: RoleUpdateDTO): Observable<RoleUpdateDTO> {
    return this.authService.put<RoleUpdateDTO>('Roles', role);
  }

  get(roleId: string): Observable<RoleUpdateDTO> {
    return this.authService.get<RoleUpdateDTO>(`Roles/${roleId}`);
  }

  delete(roleId: string): Observable<RoleUpdateDTO> {
    return this.authService.delete(`Roles/${roleId}`);
  }
}
