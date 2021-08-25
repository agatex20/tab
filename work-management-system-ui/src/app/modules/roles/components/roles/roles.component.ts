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
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021', selectedType:'' },
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021', selectedType:''  },
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021' },
        { type: 'Urlop', startDate: '01.09.2021', endDate: '24.12.2021' }
    ];
}

  ngOnInit(): void {
  }

}
