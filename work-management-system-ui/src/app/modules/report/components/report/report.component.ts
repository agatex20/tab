import { Component, OnInit } from '@angular/core';
import { LeaveRequest } from 'src/app/models/leave-requests/leave-request.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  requests: LeaveRequest[];
  title: string = 'Prośby o urlop:';
  employees = ['pracownik 1','pracownik 2','pracownik 3'];
  constructor() { }

  ngOnInit(): void {
  }

}
