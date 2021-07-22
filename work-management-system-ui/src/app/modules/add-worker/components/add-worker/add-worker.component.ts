import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { HttpClient } from  "@angular/common/http";

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {

email: string = '';
password: string = '';
firstname: string = '';
lastname: string = '';
title: string = 'Dodaj pracownika';



  constructor(private router: Router,private http: HttpClient) {


  }

  ngOnInit(): void {
    
  }
  onSubmit(){

    if(!this.email)
    {
      alert('Wpisz email');
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
    const newAddWorkerData = {
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname
    };
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
    this.http.post<AddWorkerComponent>("https://workmanagementsystemtab.azurewebsites.net/Users",
    {
      "email": this.email,
      "password": this.password,
      "firstName": this.firstname,
      "lastName": this.lastname
    })
    .subscribe(
    data  => {
    console.log("POST Request is successful ", data);
    },
    error  => {
    
    console.log("Error", error);
    
    }
    
    );
    this.router.navigate(['main']);
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.password = '';


  }
}
