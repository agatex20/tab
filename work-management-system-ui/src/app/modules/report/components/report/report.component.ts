import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AbsenceUpdateDTO } from 'src/app/dto/absenceUpdateDTO';
import { AbsenceTypeUpdateDTO } from 'src/app/dto/absenceTypeUpdateDTO';
import { AbsenceTypeService } from 'src/app/services/absence-type.service';
import { UserUpdateDTO } from 'src/app/dto/userUpdateDTO';
import { UsersService } from 'src/app/services/user.service';
import { AbsencesService } from 'src/app/services/absences.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
          if (!(String(a.startDate) > this.endDate && (String(a.endDate) > this.endDate)) &&
              !(String(a.startDate) < this.startDate && (String(a.endDate) < this.startDate))) {
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
    return type.name;
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
    setTimeout(() => {
      const doc = new jsPDF();
      let userInfo = this.getUserInfo(this.selectedUserId);
      let userText = "Name: " + userInfo.firstName + " " + userInfo.lastName + "\n";
      userText += "Email: " + userInfo.email + "\n";
      userText += "Left days of vacation: " + userInfo.vacationDaysCount + "\n";
      userText += "Absences\n";
      if(this.startDate) {
        userText += "From: " + this.startDate + "\n";
      }
      if(this.endDate) {
        userText += "To: " + this.endDate + "\n";
      }
      doc.text(userText , 20, 20);
      if(this.selectedAbsences && this.selectedAbsences.length > 0) {
        let body: string[][] = this.getAbsenceTable();
        autoTable(doc, {startY: 70, head: [['Type', 'Start Date', 'End Date', 'Is Approved']], body: body});
        }
      doc.save('report_'+ userInfo.firstName + userInfo.lastName + '.pdf');
    }, 500);
  }

  getUserInfo(userId: string): UserUpdateDTO {
    const user = this.employees.find((user) => user.userId === userId);
    return user;
  }

  getAbsenceTable(): string[][] {
    let abs: AbsenceUpdateDTO = this.selectedAbsences[0];
    let table: string[][] = [[this.getTypeName(abs.absenceTypeId), String(abs.startDate), String(abs.endDate), String(abs.confirmed)]];
    for (let i=1; i < this.selectedAbsences.length; i++) {
      abs = this.selectedAbsences[i];
      table.push([this.getTypeName(abs.absenceTypeId), String(abs.startDate), String(abs.endDate), String(abs.confirmed)])
    }
    return table;
  }

  translate(word: string) {
    if (word === 'maternity') return 'urlop macierzyński';
    if (word === 'vacation') return 'urlop wypoczynkowy';
    if (word === 'on-demand') return 'urlop na żądanie';
    return word;
  }

  translateBool(word: boolean) {
    if (word == true) return 'tak';
    if (word == false) return 'nie';
    return '';
  }
}
