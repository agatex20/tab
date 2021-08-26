import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaves-types',
  templateUrl: './leaves-types.component.html',
  styleUrls: ['./leaves-types.component.css']
})
export class LeavesTypesComponent implements OnInit {

  title: string = 'Typy urlopów:';
  data: Array<any>;constructor(){
    this.data = [
        { type: 'Urlop1', value1: Boolean},
        { type: 'Urlop2', value1: Boolean},
        { type: 'Urlop3', value1: Boolean},
        { type: 'Urlop4', value1: Boolean}
    ];
}
  ngOnInit(): void {
  }

  onDelete():void{

  }
  
}
