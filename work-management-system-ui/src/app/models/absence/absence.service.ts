import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Absence } from './absence.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Absence[]>(`https://workmanagementsystemtab.azurewebsites.net/index.html/absences`);
  }

  addAbsence(absence: Absence) {
    return this.http.post(`https://workmanagementsystemtab.azurewebsites.net/index.html/addAbsence`, absence);
  }

  delete(id: number) {
    return this.http.delete(`https://workmanagementsystemtab.azurewebsites.net/index.html/absences/${id}`);
  }
}
