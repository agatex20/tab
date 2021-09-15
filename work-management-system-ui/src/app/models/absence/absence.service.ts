import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Absence } from './absence.model';
import { Configuration } from "../../config";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Absence[]>(`http://localhost:25889/Absences`);
  }

  addAbsence(startDate: string, endDate: string, userId: string, absenceTypeId: string) {
    return this.http.post(`http://localhost:25889/Absences`, {startDate, endDate, userId, absenceTypeId});
  }

  getAbsence(userId: string) {
    return this.http.get<Absence[]>(`http://localhost:25889/Absences/worker/${userId}`);
  }

  getAllActive() {
    return this.http.get<Absence[]>(`http://localhost:25889/Absences/active`);
  }

  delete(id: string) {
    return this.http.delete(`http://localhost:25889/Absences/${id}`);
  }

  approve(absence: Absence) {
    absence.confirmed = true;
    return this.http.put(`http://localhost:25889/Absences`, absence);
  }
}
