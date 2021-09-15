import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { AddUserDTO } from 'src/app/dto/addUserDTO';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css'],
})
export class AddWorkerComponent implements OnInit {
  loading = false;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  title: string = 'Dodaj pracownika';

  constructor(
    private router: Router,
    private userService: UsersService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    if (!this.username) {
      alert('Wpisz login');
      return;
    }

    if (!this.password) {
      alert('Wpisz haslo');
      return;
    }
    if (!this.firstname) {
      alert('Wpisz imię');
      return;
    }
    if (!this.lastname) {
      alert('Wpisz nazwisko');
      return;
    }

    //dodac wybieranie roli
    let newUser: AddUserDTO = {
      email: this.username,
      password: this.password,
      roleId: 'D682060E-033F-4995-D144-08D9207681EB',
      firstName: this.firstname,
      lastName: this.lastname,
    };

    this.alertService.clear();

    this.loading = true;
    this.userService
      .add(newUser)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Dodano pracownika');
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
