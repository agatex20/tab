import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { AbsenceType } from 'src/app/models/absenceType/absence-type.model';
import { AbsenceTypeService } from 'src/app/models/absenceType/absence-type.service';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-leaves-types',
  templateUrl: './leaves-types.component.html',
  styleUrls: ['./leaves-types.component.css']
})
export class LeavesTypesComponent implements OnInit {
  title: string = 'Typy urlopów:';
  absenceTypes: AbsenceType[];
  currentUser: User;

  ngOnInit(): void { }

  constructor(
    private absenceTypeService: AbsenceTypeService,
    private alertService: AlertService
  ) {
    this.loadAbsenceTypes();
   }

  loadAbsenceTypes() {
    this.absenceTypeService.getAll()
      .pipe(first())
      .subscribe(absenceTypes => this.absenceTypes = absenceTypes);
  }
  
  onDelete(absenceTypeId: string) {
    this.absenceTypeService.delete(absenceTypeId)
      .pipe(first())
      .subscribe(data => this.alertService.success("Usunięto"));
      location.reload();
  }

  Accept(){
    for (let i=0; i < this.absenceTypes.length; i++) {
      this.absenceTypeService.update(this.absenceTypes[i])
        .pipe(first())
        .subscribe(data => console.log(data))
    }
    setTimeout(() => location.reload(), 1000)
  }

  
}
