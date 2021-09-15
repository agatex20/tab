import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { AbsenceTypeUpdateDTO } from 'src/app/dto/absenceTypeUpdateDTO';
import { AbsenceTypeService } from 'src/app/services/absence-type.service';
import { UserUpdateDTO } from 'src/app/dto/userUpdateDTO';

@Component({
  selector: 'app-leaves-types',
  templateUrl: './leaves-types.component.html',
  styleUrls: ['./leaves-types.component.css']
})
export class LeavesTypesComponent implements OnInit {
  title: string = 'Typy urlopów:';
  absenceTypes: AbsenceTypeUpdateDTO[];
  currentUser: UserUpdateDTO;

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
    setTimeout(() => location.reload(), 1000);
  }

  translate(word: string) {
    if(word==='maternity')
      return 'urlop macierzyński';
    if(word==='vacation')
      return 'urlop wypoczynkowy';
    if(word==='on demand')
      return 'urlop na żądanie';;
    return word;
  }
}
