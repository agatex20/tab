import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-leaves-type',
  templateUrl: './add-leaves-type.component.html',
  styleUrls: ['./add-leaves-type.component.css']
})
export class AddLeavesTypeComponent implements OnInit {

  leaveName: string = '';
  ifTakesLeave: boolean =true;

title: string = 'Dodaj typ urlopu';

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
    
  }
}
