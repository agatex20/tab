import { Component, OnInit } from '@angular/core';
import { first, take } from 'rxjs/operators';
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
  leftDays: number;
  startDate: string;
  endDate: string;
  employees: User[];
  absences: Absence[]; 
  absenceTypes: AbsenceType[];
  selectedAbsences: Absence[];
  selectedType: string;
  selectedUserId: string;
  
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
      .subscribe(absences => {
        this.absences = absences;
        this.selectedAbsences = []; 

        for (let a of this.absences)
        {
          if((!this.startDate || a.startDate >=this.startDate) && (!this.endDate || a.endDate <= this.endDate))
          {
            this.selectedAbsences.push(a);
          }
        } 
      });
  }

  loadAbsenceTypes() {
    this.absenceTypeService.getAll()
      .pipe(first())
      .subscribe(absenceTypes => this.absenceTypes = absenceTypes);
  }

  selectChangeHandler(event: any) {
    this.selectedUserId = event.target.value;
  }

  getTypeName(id: string) {
    const type =  this.absenceTypes.find((type) => type.absenceTypeId === id)
    if (!type) {
      return ''
    }
    return this.translate(type.name);
  }

  getDate(date: string) {
    return date.substring(0,10);
  }

  loadDaysCount(id: string) {
    const user = this.employees.find((user) => user.userId === id)
    if (user) {
      this.leftDays = user.vacationDaysCount;
    }  
  }

  onSubmit(){
    this.loadAbsences(this.selectedUserId);
    this.loadDaysCount(this.selectedUserId);
  }

  translate(word: string) {
    if(word==='maternity')
      return 'macierzyński';
    if(word==='vacation')
      return 'wakacje';
    if(word==='on demand')
      return 'na żądanie';;
    return word;
  }

  translateBool(word: boolean) {
    if(word==true)
      return 'tak';
    if(word==false)
      return 'nie';
    return '';
  }
}
