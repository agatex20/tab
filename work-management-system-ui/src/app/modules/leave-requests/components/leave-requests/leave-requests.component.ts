import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { LeaveRequestService } from 'src/app/models/leave-requests/leave-request.service';
import { LeaveRequest } from 'src/app/models/leave-requests/leave-request.model';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/models/user/user.service';
import { Absence } from 'src/app/models/absence/absence.model';
import { AbsenceService } from 'src/app/models/absence/absence.service';
import { AlertService } from 'src/app/alerts/services/alert.service';

declare var $: any;
@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit {
  requests: LeaveRequest[];
  employees: User[];
  title: string = 'Prośby o urlop:';

  constructor(
    private leaveRequestService: LeaveRequestService,
    private userService: UserService,
    private absenceService: AbsenceService,
    private alertService: AlertService
    ) {}

  ngOnInit(): void {
    this.loadRequests();
    this.loadEmployees();
  }

  onSubmit(leaveRequest: LeaveRequest) {
    let absence = this.cloneRequest(leaveRequest);

    this.absenceService.addAbsence(absence)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Zatwierdzono prośbę');
        },
        error => {
          this.alertService.error(error);
       });

    this.leaveRequestService.delete(leaveRequest.id)
      .pipe(first())
      .subscribe(
        data => {
          this.loadRequests()
        },
        error => {
          this.alertService.error(error);
        }
      )
  }

  onReject(id: number) {}
  
  loadRequests() {
    this.leaveRequestService.getAll()
      .pipe(first())
      .subscribe(requests => this.requests = requests);
  }

  loadEmployees() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(employees => this.employees = employees);
  }

  cloneRequest(leaveRequest: LeaveRequest): Absence {
  let absence = new Absence(
    leaveRequest.startDate,
    leaveRequest.endDate,
    leaveRequest.employee,
    leaveRequest.type
  )
  return absence;
  }
}
