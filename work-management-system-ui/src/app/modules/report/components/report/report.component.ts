import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AbsenceUpdateDTO } from 'src/app/dto/absenceUpdateDTO';
import { AbsenceTypeUpdateDTO } from 'src/app/dto/absenceTypeUpdateDTO';
import { AbsenceTypeService } from 'src/app/services/absence-type.service';
import { UserUpdateDTO } from 'src/app/dto/userUpdateDTO';
import { UsersService } from 'src/app/services/user.service';
import { AbsencesService } from 'src/app/services/absences.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  title: string = 'Raport';
  leftDays: number;
  startDate: string;
  endDate: string;
  employees: UserUpdateDTO[];
  absences: AbsenceUpdateDTO[];
  absenceTypes: AbsenceTypeUpdateDTO[];
  selectedAbsences: AbsenceUpdateDTO[];
  selectedType: string;
  selectedUserId: string;

  constructor(
    private userService: UsersService,
    private absenceService: AbsencesService,
    private absenceTypeService: AbsenceTypeService
  ) {
    this.selectedAbsences = this.absences;
    this.loadEmployees();
    this.loadAbsenceTypes();
  }

  ngOnInit(): void {}

  loadEmployees() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((employees) => (this.employees = employees));
  }

  loadAbsences(userId: string) {
    this.absenceService
      .getFromWorker(userId)
      .pipe(first())
      .subscribe((absences) => {
        this.absences = absences;
        this.selectedAbsences = [];

        for (let a of this.absences) {
          if (
            !this.startDate ||
            a.startDate.toDateString() >= this.startDate ||
            !this.endDate ||
            a.endDate.toDateString() <= this.endDate
          ) {
            this.selectedAbsences.push(a);
          }
        }
      });
  }

  loadAbsenceTypes() {
    this.absenceTypeService
      .getAll()
      .pipe(first())
      .subscribe((absenceTypes) => (this.absenceTypes = absenceTypes));
  }

  selectChangeHandler(event: any) {
    this.selectedUserId = event.target.value;
  }

  getTypeName(id: string) {
    const type = this.absenceTypes.find((type) => type.absenceTypeId === id);
    if (!type) {
      return '';
    }
    return this.translate(type.name);
  }

  loadDaysCount(id: string) {
    const user = this.employees.find((user) => user.userId === id);
    if (user) {
      this.leftDays = user.vacationDaysCount;
    }
  }

  onSubmit() {
    this.loadAbsences(this.selectedUserId);
    this.loadDaysCount(this.selectedUserId);
  }

  translate(word: string) {
    if (word === 'maternity') return 'urlop macierzyński';
    if (word === 'vacation') return 'urlop wypoczynkowy';
    if (word === 'on demand') return 'urlop na żądanie';
    return word;
  }

  translateBool(word: boolean) {
    if (word == true) return 'tak';
    if (word == false) return 'nie';
    return '';
  }
}
