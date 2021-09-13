import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbsenceType } from './absence-type.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenceTypeService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<AbsenceType[]>(`http://localhost:25889/AbsenceTypes`);
  }

  delete(absenceTypeId: string) {
    return this.http.delete(`http://localhost:25889/AbsenceTypes/${absenceTypeId}`);
  }

  update(absenceType: AbsenceType) {
    return this.http.put(`http://localhost:25889/AbsenceTypes`, absenceType);
  }

  add(name: string, ifShorted: boolean) {
    return this.http.post<AbsenceType>(`http://localhost:25889/AbsenceTypes`, {name, ifShorted});
  }
}
