import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/alerts/services/alert.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { AbsencesService } from 'src/app/services/absences.service';
import { AbsenceTypeUpdateDTO } from 'src/app/dto/absenceTypeUpdateDTO';
import { AbsenceTypeService } from 'src/app/services/absence-type.service';
import { UserUpdateDTO } from 'src/app/dto/userUpdateDTO';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {   
  absenceTypes: AbsenceTypeUpdateDTO[];
  selectedType: string;
  startDate: string;
  endDate: string;
  title: string = 'Wnioskuj o urlop';
  currentUser: UserUpdateDTO;

  constructor(
    private authenticationService: AuthenticationService,
    private absenceTypeService: AbsenceTypeService,
    private absenceService: AbsencesService,
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
    
    this.absenceService.add(this.startDate, this.endDate, '160e4f02-24c3-4660-23cd-08d93b33a952', this.selectedType)
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


