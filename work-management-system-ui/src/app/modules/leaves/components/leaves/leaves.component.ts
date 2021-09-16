import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Absence } from 'src/app/dto/absence';
import { AbsenceTypeUpdateDTO } from 'src/app/dto/absenceTypeUpdateDTO';
import { AbsencesService } from 'src/app/services/absences.service';
import { AbsenceTypeService } from 'src/app/services/absence-type.service';
import { UsersService } from 'src/app/services/user.service';
import { UserUpdateDTO } from 'src/app/dto/userUpdateDTO';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css'],
})
export class LeavesComponent implements OnInit {
  employees: UserUpdateDTO[];
  title: string = 'Moje urlopy:';
  selectedType: string;
  absences: Absence[] = [];
  absenceTypes: AbsenceTypeUpdateDTO[];

  constructor(
    private userService: UsersService,
    private absenceTypeService: AbsenceTypeService,
    private absencesService: AbsencesService,
    private authService: AuthService
  ) {
    this.loadEmployees();
    this.loadAbsenceTypes();
  }

  ngOnInit() {
    this.loadAbsences(this.authService.loggedUser.userId);
  }

  loadEmployees() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((employees) => (this.employees = employees));
  }

  loadAbsences(userId: string) {
    this.absencesService
      .getFromWorker(userId)
      .pipe(first())
      .subscribe((absences) => (this.absences = absences));
  }

  loadAbsenceTypes() {
    this.absenceTypeService
      .getAll()
      .pipe(first())
      .subscribe((absenceTypes) => (this.absenceTypes = absenceTypes));
  }

  getTypeName(id: string) {
    const type = this.absenceTypes.find((type) => type.absenceTypeId === id);
    if (!type) {
      return '';
    }
    return this.translate(type.name);
  }

  translate(word: string) {
    if (word === 'maternity') return 'urlop macierzyński';
    if (word === 'vacation') return 'urlop wypoczynkowy';
    if (word === 'on demand') return 'urlop na żądanie';
    return word;
  }

  translateBool(word: boolean) {
    if (word == true) return 'tak';
    if (word == false) return 'nie';
    return '';
  }
}
