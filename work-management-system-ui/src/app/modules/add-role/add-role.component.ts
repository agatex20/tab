import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  roleName: string = '';
  ifValu1: boolean =true;
  ifValu2: boolean =true;

title: string = 'Dodaj rolę';
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){

  }
}
