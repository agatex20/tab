import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UrlConsts } from '../constants';
import { AbsenceDTO } from '../dto/absenceDTO';
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

  getAllAbsences(): Observable<AbsenceDTO[]> {
    return this.authService.get<AbsenceDTO[]>('Absences');
  }

  addAbsence(absence: AbsenceDTO): Observable<AbsenceDTO> {
    return this.authService.post<AbsenceDTO>('Absences', absence);
  }
}
