import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { UsersService } from 'src/app/services/user.service';
import { RoleUpdateDTO } from 'src/app/dto/roleUpdateDTO';
import { RolesService } from 'src/app/services/roles.service';
import { AddUserDTO } from 'src/app/dto/addUserDTO';

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
roles: RoleUpdateDTO[];
selectedRoleId: string;

  constructor(
    private router: Router,
    private userService: UsersService,
    private alertService: AlertService,
    private roleService: RolesService
  ) {}

  ngOnInit() {
    this.loadRoles();  
  }

  onSubmit(){

    if(!this.username)
    {
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

    this.alertService.clear();

    this.loading = true;
    this.userService.add(this.username, this.firstname, this.lastname, this.password, this.selectedRoleId)
      .pipe(first())
      .subscribe(data => {
        this.alertService.success("Dodano nowego pracownika");
      },
      (error) => {
        this.alertService.error(error);
        this.loading = false;
      })
  }

  loadRoles() {
    this.roleService.getAll()
      .pipe(first())
      .subscribe(roles => this.roles = roles);
  }

  selectChangeHandler(event: any) {
    this.selectedRoleId = event.target.value;
  }

  translate(word: string) {
    if(word==='worker')
      return 'pracownik';
    if(word==='admin')
      return 'administrator';
    if(word==='unassigned')
      return 'nieprzypisana';;
    return word;
  }
}
