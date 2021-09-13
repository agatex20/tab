import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
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
    private absenceTypeService: AbsenceTypeService
  ) {
    this.loadAbsenceTypes();
   }

  loadAbsenceTypes() {
    this.absenceTypeService.getAll()
      .pipe(first())
      .subscribe(absenceTypes => this.absenceTypes = absenceTypes);
  }
  
  onDelete():void{

  }

  Accept(){
    
  }
}
