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
    return this.http.get<Absence[]>(`${Configuration.API_URL}absences`);
  }

  addAbsence(absence: Absence) {
    return this.http.post(`${Configuration.API_URL}addAbsence`, absence);
  }

  delete(id: number) {
    return this.http.delete(`${Configuration.API_URL}absences/${id}`);
  }
}
