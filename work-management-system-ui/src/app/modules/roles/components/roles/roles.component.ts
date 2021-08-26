import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  title: string = 'Role:';
  data: Array<any>;constructor(){
    this.data = [
        { role: 'Rola1', value1: Boolean,value2: Boolean },
        { role: 'Rola2', value1: Boolean,value2: Boolean },
        { role: 'Rola3', value1: Boolean,value2: Boolean },
        { role: 'Rola4', value1: Boolean,value2: Boolean }
    ];
}


  ngOnInit(): void {
  }

  onDelete():void{

  }
  
}
