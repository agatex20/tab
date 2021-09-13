import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Absence } from 'src/app/models/absence/absence.model';
import { AbsenceService } from 'src/app/models/absence/absence.service';
import { AbsenceType } from 'src/app/models/absenceType/absence-type.model';
import { AbsenceTypeService } from 'src/app/models/absenceType/absence-type.service';
import { LeaveRequest } from 'src/app/models/leave-requests/leave-request.model';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/models/user/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  title: string = 'Raport';
  leftDays: string = '0'
  startDate: string;
  endDate: string;
  employees: User[];
  absences: Absence[]; 
  absenceTypes: AbsenceType[];
  selectedAbsences: Absence[];
  selectedType: string;
  
  constructor(
    private userService: UserService,
    private absenceService: AbsenceService,
    private absenceTypeService: AbsenceTypeService
  ){
    this.selectedAbsences = this.absences;
    this.loadEmployees();
    this.loadAbsenceTypes();
    
}
  ngOnInit(): void {
  }

  loadEmployees() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(employees => this.employees = employees);
  }

  loadAbsences(userId: string) {
    this.absenceService.getAbsence(userId)
      .pipe(first())
      .subscribe(absences => this.absences = absences);

    this.selectedAbsences = []; 

    for (let a of this.absences)
    {
        if(a.startDate >=this.startDate && a.endDate <= this.endDate)
      {
        this.selectedAbsences.push(a);
      }
    } 
  }

  loadAbsenceTypes() {
    this.absenceTypeService.getAll()
      .pipe(first())
      .subscribe(absenceTypes => this.absenceTypes = absenceTypes);
  }

  selectChangeHandler(event: any) {
    console.log(event.target.value);
    this.loadAbsences(event.target.value);
  }

  getTypeName(id: string) {
    const type =  this.absenceTypes.find((type) => type.absenceTypeId === id)
    if (!type) {
      return ''
    }
    return type.name
  }

  getDate(date: string) {
    return date.substring(0,10);
  }

  onSubmit(){

  }

}
