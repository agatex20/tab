import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbsenceTypeDTO } from '../dto/absenceTypeDTO';
import { AbsenceTypeUpdateDTO } from '../dto/absenceTypeUpdateDTO';
import { AuthRequestService } from './auth-request.service';

@Injectable({
  providedIn: 'root'
})
export class AbsenceTypeService {

  constructor(private authService: AuthRequestService) { }

  getAll() {
    return this.authService.get<AbsenceTypeUpdateDTO[]>(`AbsenceTypes`);
  }

  delete(absenceTypeId: string) {
    return this.authService.delete<any>(`AbsenceTypes/${absenceTypeId}`);
  }

  update(absenceType: AbsenceTypeUpdateDTO) {
    return this.authService.put<AbsenceTypeUpdateDTO>(`AbsenceTypes`, absenceType);
  }

  add(name: string, ifShorted: boolean) {
    return this.authService.post<AbsenceTypeUpdateDTO>(`AbsenceTypes`, {name, ifShorted});
  }
}