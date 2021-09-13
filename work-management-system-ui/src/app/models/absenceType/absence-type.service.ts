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
}
