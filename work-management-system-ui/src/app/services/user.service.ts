import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUserDTO } from '../dto/addUserDTO';
import { UserUpdateDTO } from '../dto/userUpdateDTO';
import { AuthRequestService } from './auth-request.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private authService: AuthRequestService) {}

  getAll(): Observable<UserUpdateDTO[]> {
    return this.authService.get<UserUpdateDTO[]>('Users');
  }

  add(user: AddUserDTO): Observable<UserUpdateDTO> {
    return this.authService.post<UserUpdateDTO>('Users', user);
  }

  update(user: UserUpdateDTO): Observable<UserUpdateDTO> {
    return this.authService.put<UserUpdateDTO>('Users', user);
  }

  get(userId: string): Observable<UserUpdateDTO> {
    return this.authService.get<UserUpdateDTO>(`Users/${userId}`);
  }

  delete(userId: string): Observable<UserUpdateDTO> {
    return this.authService.delete<UserUpdateDTO>(`Users/${userId}`);
  }
}
