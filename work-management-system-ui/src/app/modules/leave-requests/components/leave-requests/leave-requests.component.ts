import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/models/user/user.service';
import { Absence } from 'src/app/models/absence/absence.model';
import { AbsenceService } from 'src/app/models/absence/absence.service';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { AbsenceTypeService } from 'src/app/models/absenceType/absence-type.service';
import { AbsenceType } from 'src/app/models/absenceType/absence-type.model';

declare var $: any;
@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit {
  requests: Absence[];
  employees: User[];
  absenceTypes: AbsenceType[];
  title: string = 'Prośby o urlop:';

  constructor(
    private userService: UserService,
    private absenceService: AbsenceService,
    private alertService: AlertService,
    private absenceTypeService: AbsenceTypeService
    ) {}

  ngOnInit(): void {
    this.loadRequests();
    this.loadEmployees();
    this.loadAbsenceTypes();
  }

  onSubmit(absence: Absence) {
    this.absenceService.approve(absence)
      .pipe(first())
      .subscribe(data => {
        this.alertService.success("Zatwierdzono");
        location.reload();});
  }

  onReject(absenceId: string) {
    this.absenceService.delete(absenceId)
      .pipe(first())
      .subscribe(data => {
        this.alertService.success("Usunięto");
        location.reload();
      });
  }
  
  loadRequests() {
    this.absenceService.getAllActive()
      .pipe(first())
      .subscribe(requests => this.requests = requests);
  }

  loadEmployees() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(employees => this.employees = employees);
  }

  loadAbsenceTypes() {
    this.absenceTypeService.getAll()
      .pipe(first())
      .subscribe(absenceTypes => this.absenceTypes = absenceTypes);
  }

  getTypeName(id: string) {
    const type =  this.absenceTypes.find((type) => type.absenceTypeId === id)
    if (!type) {
      return ''
    }
    return type.name
  }

  getUsername(id: string) {
    const username = this.employees.find((username) => username.userId === id)
    if (!username) {
      return ''
    }
    return username.firstName + ' ' + username.lastName;
  }

  getDate(date: string) {
    return date.substring(0,10);
  }
}
