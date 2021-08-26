import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/alerts/services/alert.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { LeaveRequest } from 'src/app/models/leave-requests/leave-request.model';
import { LeaveRequestService } from 'src/app/models/leave-requests/leave-request.service';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {   
  leaveTypes = [
    { value: "typ 1"},
    { value: "typ 2"}
  ];
  selectedType: string;
  startDate: string;
  endDate: string;
  title: string = 'Wnioskuj o urlop';
  loading = false;
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private leaveRequestService: LeaveRequestService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
   }

  ngOnInit(): void {}

  onSubmit() {
    if(!this.startDate)
    {
      alert('Wpisz datę rozpoczęcia');
      return;
    }

    if(!this.endDate)
    {
      alert('Wpisz datę zakończenia');
      return;
    }
    let typeCombo = document.getElementById("typeCombo") as HTMLSelectElement;
    this.selectedType = typeCombo.selectedOptions[0].value;
    if(!this.selectedType)
    {
      alert('Wybierz typ');
      return;
    }

    let newRequest: LeaveRequest = new LeaveRequest(this.startDate, this.endDate, this.selectedType, this.currentUser.username);

    this.alertService.clear();
    
    this.loading = true;
    this.leaveRequestService.addRequest(newRequest)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Zgłoszono prośbę o urlop', true);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
       });
  }
}
