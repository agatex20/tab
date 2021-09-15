import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorktimeDTO } from '../dto/worktimeDTO';
import { WorktimeUpdateDTO } from '../dto/worktimeUpdateDTO';
import { AuthRequestService } from './auth-request.service';

@Injectable({
  providedIn: 'root',
})
export class BEWorktimesService {
  constructor(private authService: AuthRequestService) {}

  getAll(): Observable<WorktimeUpdateDTO[]> {
    return this.authService.get<WorktimeUpdateDTO[]>('Worktimes');
  }

  get(worktimeId: string): Observable<WorktimeUpdateDTO> {
    return this.authService.get<WorktimeUpdateDTO>(`Worktimes/${worktimeId}`);
  }

  getAllFromUser(userId: string): Observable<WorktimeUpdateDTO[]> {
    return this.authService.get<WorktimeUpdateDTO[]>(
      `Worktimes/user/${userId}`
    );
  }

  add(worktime: WorktimeDTO): Observable<WorktimeUpdateDTO> {
    return this.authService.post<WorktimeUpdateDTO>('Worktimes', worktime);
  }

  update(worktime: WorktimeUpdateDTO): Observable<WorktimeUpdateDTO> {
    return this.authService.put<WorktimeUpdateDTO>('Worktimes', worktime);
  }

  delete(worktimeId: string): Observable<WorktimeUpdateDTO> {
    return this.authService.delete<WorktimeUpdateDTO>(
      `Worktimes/${worktimeId}`
    );
  }

  addMultiple(worktimeList: WorktimeDTO[]): Observable<WorktimeUpdateDTO[]> {
    return this.authService.post<WorktimeUpdateDTO[]>(
      'Worktimes/addWorktimeList',
      worktimeList
    );
  }
}
