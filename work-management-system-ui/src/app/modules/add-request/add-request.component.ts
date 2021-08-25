import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

    
leaveTypes = ['typ 1','typ 2','typ 3'];
selectedType: string = '';
startDate: string = '';
endDate: string = '';
title: string = 'Wnioskuj o urlop';
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){

  }
}
