import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LeaveRequest } from './leave-request.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<LeaveRequest[]>(`https://workmanagementsystemtab.azurewebsites.net/index.html/leaveRequests`);
  }

  addRequest(leaveRequest: LeaveRequest) {
    return this.http.post(`https://workmanagementsystemtab.azurewebsites.net/index.html/addLeaveRequest`, leaveRequest);
  }

  delete(id: number) {
    return this.http.delete(`https://workmanagementsystemtab.azurewebsites.net/index.html/leaveRequests/${id}`);
  }
}
