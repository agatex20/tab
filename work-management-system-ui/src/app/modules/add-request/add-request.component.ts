import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/alerts/services/alert.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { AbsenceService } from 'src/app/models/absence/absence.service';
import { AbsenceType } from 'src/app/models/absenceType/absence-type.model';
import { AbsenceTypeService } from 'src/app/models/absenceType/absence-type.service';
import { LeaveRequest } from 'src/app/models/leave-requests/leave-request.model';
import { LeaveRequestService } from 'src/app/models/leave-requests/leave-request.service';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {   
  absenceTypes: AbsenceType[];
  selectedType: string;
  startDate: string;
  endDate: string;
  title: string = 'Wnioskuj o urlop';
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private absenceTypeService: AbsenceTypeService,
    private absenceService: AbsenceService,
    private alertService: AlertService
  ) {
    //this.currentUser = this.authenticationService.currentUserValue;
   }

  ngOnInit() {
    this.loadAbsenceTypes();
  }

  onSubmit() {
    if(!this.startDate || !this.endDate || !this.selectedType)
    {
      this.alertService.error("Uzupełnij wszystkie dane");
      return;
    }
    
    this.absenceService.addAbsence(this.startDate, this.endDate, '160e4f02-24c3-4660-23cd-08d93b33a952', this.selectedType)
      .pipe(first())
      .subscribe(data => this.alertService.success("Dodano nową prośbę"));
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

  selectChangeHandler(event: any) {
    this.selectedType = event.target.value;
  }
}


