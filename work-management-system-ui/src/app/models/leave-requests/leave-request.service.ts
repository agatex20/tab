import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LeaveRequest } from './leave-request.model';
import { Configuration } from "../../config";

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<LeaveRequest[]>(`${Configuration.API_URL}leaveRequests`);
  }

  addRequest(leaveRequest: LeaveRequest) {
    return this.http.post(`${Configuration.API_URL}addLeaveRequest`, leaveRequest);
  }

  delete(id: number) {
    return this.http.delete(`${Configuration.API_URL}leaveRequests/${id}`);
  }
}
