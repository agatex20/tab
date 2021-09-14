import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Absence } from 'src/app/models/absence/absence.model';
import { AbsenceType } from 'src/app/models/absenceType/absence-type.model';
import { AbsenceService } from 'src/app/models/absence/absence.service';
import { AbsenceTypeService } from 'src/app/models/absenceType/absence-type.service';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/models/user/user.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  employees: User[];
  title: string = 'Urlopy:';
  selectedType: string;
  absences: Absence[];
  absenceTypes: AbsenceType[];
  
  constructor(
    private userService: UserService,
    private absenceService: AbsenceService,
    private absenceTypeService: AbsenceTypeService
  ){
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
  }

  loadAbsenceTypes() {
    this.absenceTypeService.getAll()
      .pipe(first())
      .subscribe(absenceTypes => this.absenceTypes = absenceTypes);
  }

  selectChangeHandler(event: any) {
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
}
