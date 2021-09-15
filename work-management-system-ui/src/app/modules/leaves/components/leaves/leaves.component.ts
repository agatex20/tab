import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Absence } from 'src/app/dto/absence';
import { AbsenceTypeUpdateDTO } from 'src/app/dto/absenceTypeUpdateDTO';
import { AbsencesService } from 'src/app/services/absences.service';
import { AbsenceTypeService } from 'src/app/services/absence-type.service';
import { UsersService } from 'src/app/services/user.service';
import { UserUpdateDTO } from 'src/app/dto/userUpdateDTO';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  employees: UserUpdateDTO[];
  title: string = 'Urlopy:';
  selectedType: string;
  absences: Absence[];
  absenceTypes: AbsenceTypeUpdateDTO[];//AbsenceType[];
  
  constructor(
    private userService: UsersService,
    private absenceTypeService: AbsenceTypeService,
    private absencesService: AbsencesService,
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
    this.absencesService.getFromWorker(userId)
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
    return this.translate(type.name);
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

  translateBool(word: boolean) {
    if(word==true)
      return 'tak';
    if(word==false)
      return 'nie';
    return '';
  }
}
