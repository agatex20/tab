import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-data',
  templateUrl: './login-data.component.html',
  styleUrls: ['./login-data.component.css']
})
export class LoginDataComponent implements OnInit {
login: string = '';
password: string = '';
title: string = 'Zaloguj';



  constructor(private router: Router,
              ) {


  }

  ngOnInit(): void {
  }
  onSubmit(){

    if(!this.login)
    {
      alert('Wpisz login');
      return;
    }

    if(!this.password)
    {
      alert('Wpisz haslo');
      return;
    }
    const newLoginData = {
      login: this.login,
      password: this.password
    };

    this.router.navigate(['main']);
    this.login = '';
    this.password = '';


  }

}
