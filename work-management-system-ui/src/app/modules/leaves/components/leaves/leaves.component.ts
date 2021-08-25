import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {

  title: string = 'Urlopy:';
  leaveTypes = ['pracownik 1','pracownik 2','pracownik 3'];
  selectedType: string = '';

  data: Array<any>;constructor(){
    this.data = [
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021' },
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021' },
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021' },
        { type: 'Urlop', startDate: '01.09.2021', endDate: '24.12.2021' }
    ];
}
  

  ngOnInit(): void {
  }

}
