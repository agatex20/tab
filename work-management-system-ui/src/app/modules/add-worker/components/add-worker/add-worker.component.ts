import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/alerts/services/alert.service';
import { UserService } from 'src/app/user/user.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
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
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    
  }
  onSubmit(){

    if(!this.username)
    {
      alert('Wpisz login');
      return;
    }

    if(!this.password)
    {
      alert('Wpisz haslo');
      return;
    }
    if(!this.firstname)
    {
      alert('Wpisz imię');
      return;
    }
    if(!this.lastname)
    {
      alert('Wpisz nazwisko');
      return;
    }

    let newUser: User = new User;
    newUser.username = this.username;
    newUser.password = this.password;
    newUser.firstName = this.firstname;
    newUser.lastName = this.lastname;

    this.alertService.clear();
    
    this.loading = true;
    this.userService.register(newUser)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
       });
  }
}
