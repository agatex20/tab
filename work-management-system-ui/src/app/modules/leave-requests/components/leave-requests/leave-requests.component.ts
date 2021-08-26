import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { LeaveRequestService } from 'src/app/models/leave-requests/leave-request.service';
import { LeaveRequest } from 'src/app/models/leave-requests/leave-request.model';

declare var $: any;
@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit {
  requests: LeaveRequest[];
  title: string = 'Prośby o urlop:';
  workers = ['pracownik 1','pracownik 2','pracownik 3'];

  constructor(private leaveRequestService: LeaveRequestService) {}
/*
  data: Array<any>;constructor(){
    this.data = [
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021', selectedWorker:'' },
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021', selectedWorker:''  },
        { type: 'Urlop', startDate: '03.12.2021', endDate: '24.12.2021', selectedWorker:'' },
        { type: 'Urlop', startDate: '01.09.2021', endDate: '24.12.2021', selectedWorker:''  }
    ];
}*/

  ngOnInit(): void {
    this.loadRequests();
  }

  onSubmit() {}

  onReject() {}
  
  loadRequests() {
    this.leaveRequestService.getAll()
      .pipe(first())
      .subscribe(requests => this.requests = requests);
  }
}
