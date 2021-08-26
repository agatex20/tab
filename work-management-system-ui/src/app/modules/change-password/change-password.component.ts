import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string;
  newPassword2: string;
  oldPassword: string;
  title: string = 'Zmień hasło';
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }
}
