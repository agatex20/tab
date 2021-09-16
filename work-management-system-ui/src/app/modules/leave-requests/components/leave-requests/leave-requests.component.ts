import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserUpdateDTO } from 'src/app/dto/userUpdateDTO';
import { UsersService } from 'src/app/services/user.service';
import { AbsenceUpdateDTO } from 'src/app/dto/absenceUpdateDTO';
import { AbsencesService } from 'src/app/services/absences.service';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { AbsenceTypeService } from 'src/app/services/absence-type.service';
import { AbsenceTypeUpdateDTO } from 'src/app/dto/absenceTypeUpdateDTO';

declare var $: any;
@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css'],
})
export class LeaveRequestsComponent implements OnInit {
  requests: AbsenceUpdateDTO[] = [];
  employees: UserUpdateDTO[] = [];
  absenceTypes: AbsenceTypeUpdateDTO[] = [];
  title: string = 'Prośby o urlop:';

  constructor(
    private userService: UsersService,
    private absenceService: AbsencesService,
    private alertService: AlertService,
    private absenceTypeService: AbsenceTypeService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
    this.loadEmployees();
    this.loadAbsenceTypes();
  }

  onSubmit(absence: AbsenceUpdateDTO) {
    absence.confirmed = true;
    this.absenceService
      .update(absence)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Zatwierdzono');
          location.reload();
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }

  onReject(absenceId: string) {
    this.absenceService
      .delete(absenceId)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Usunięto');
          location.reload();
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }

  loadRequests() {
    this.absenceService
      .getActive()
      .pipe(first())
      .subscribe((requests) => (this.requests = requests));
  }

  loadEmployees() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((employees) => (this.employees = employees));
  }

  loadAbsenceTypes() {
    this.absenceTypeService
      .getAll()
      .pipe(first())
      .subscribe((absenceTypes) => (this.absenceTypes = absenceTypes));
  }

  getTypeName(id: string) {
    const type = this.absenceTypes.find((type) => type.absenceTypeId === id);
    if (!type) {
      return '';
    }
    return this.translate(type.name);
  }

  getUsername(id: string) {
    const username = this.employees.find((username) => username.userId === id);
    if (!username) {
      return '';
    }
    return username.firstName + ' ' + username.lastName;
  }

  getDate(date: string) {
    return date.substring(0, 10);
  }

  translate(word: string) {
    if (word === 'maternity') return 'urlop macierzyński';
    if (word === 'vacation') return 'urlop wypoczynkowy';
    if (word === 'on-demand') return 'urlop na żądanie';
    return word;
  }
}
