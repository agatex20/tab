import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AbsenceService } from 'src/app/models/absence/absence.service';
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
  absences: Array<any>;
  
  constructor(
    private userService: UserService,
    private absenceService: AbsenceService
  ){
    this.loadEmployees();
    this.loadAbsences();
}
  
  ngOnInit(): void {
  }

  loadEmployees() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(employees => this.employees = employees);
  }

  loadAbsences() {
    this.absenceService.getAll()
      .pipe(first())
      .subscribe(absences => this.absences = absences);
  }
}
