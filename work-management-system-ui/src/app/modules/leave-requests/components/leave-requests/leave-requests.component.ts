import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit {


  title: string = 'Prośby o urlop:';
  workers = ['pracownik 1','pracownik 2','pracownik 3'];
  

  data: Array<any>;constructor(){
    this.data = [
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021', selectedWorker:'' },
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021', selectedWorker:''  },
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021', selectedWorker:'' },
        { type: 'Urlop', startDate: '01.09.2021', endDate: '24.12.2021', selectedWorker:''  }
    ];
}
  onSubmit(){

  }
  onReject(){

  }
  ngOnInit(): void {
  }
}
