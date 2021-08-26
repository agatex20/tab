import { Component, OnInit } from '@angular/core';
import { Absence } from 'src/app/models/absence/absence.model';
import { LeaveRequest } from 'src/app/models/leave-requests/leave-request.model';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  title: string = 'Prośby o urlop:';
  startDate: string;
  endDate: string;
  employees: User[];
  absences: Absence[]; 
  constructor() { }

  ngOnInit(): void {
  }

}
