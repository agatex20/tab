import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UrlConsts } from '../constants';
import { Absence } from '../dto/absence';
import { AbsenceDTO } from '../dto/absenceDTO';
import { WorktimeDTO } from '../dto/worktimeDTO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AbsencesService {
  constructor(private authService: AuthService) {}

  eg: AbsenceDTO = {
    absenceTypeId: '5fb0a622-8058-440c-a3c6-385544dafae0',
    startDate: new Date(),
    endDate: new Date(),
    userId: '160E4F02-24C3-4660-23CD-08D93B33A952',
  };

  getAll(): Observable<AbsenceDTO[]> {
    return this.authService.get<AbsenceDTO[]>('Absences');
  }

  add(absence: AbsenceDTO): Observable<AbsenceDTO> {
    return this.authService.post<AbsenceDTO>('Absences', absence);
  }

  getFromWorker(workerId: string): Observable<Absence> {
    return this.authService.get<Absence>(`Absences/worker/${workerId}`);
  }

  getActive() {
    return this.authService.get<Absence[]>('Absences/active');
  }

  getFromWorkerActive(workderId: string): Observable<Absence[]> {
    return this.authService.get<Absence[]>(
      `Absences/active/worker/${workderId}`
    );
  }

  getConfirmed(): Observable<Absence[]> {
    return this.authService.get<Absence[]>('Absences/confirmed');
  }

  getFromWorkerConfirmed(workerId: string): Observable<Absence[]> {
    return this.authService.get<Absence[]>(
      `Absences/confirmed/worker/${workerId}`
    );
  }

  get(absenceId: string): Observable<Absence> {
    return this.authService.get<Absence>(`Absences/${absenceId}`);
  }

  delete(absenceId: string): Observable<any> {
    return this.authService.delete<any>(`Absences/${absenceId}`);
  }

  approve(absenceId: string): Observable<Absence> {
    return this.authService.get<Absence>(`Absences/${absenceId}`);
  }

  //zwraca tablice tablic nalezy wybrac po jednym worktime z kazdej wewnetrznej tablicy
  //dostaje [[worktime1,worktime2,worktime3],[worktime4,worktime5,worktime6],[worktime7,worktime8,worktime9]]
  //potem dajesz do addWorktime np ([worktime2,worktime4,worktime9])
  findReplacement(absenceId: string): Observable<WorktimeDTO[]> {
    return this.authService.get<WorktimeDTO[]>(
      `Absences/find-replacement/${absenceId}`
    );
  }
}
