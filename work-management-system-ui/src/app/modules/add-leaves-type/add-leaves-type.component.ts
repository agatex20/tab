import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { AbsenceTypeService } from 'src/app/services/absence-type.service';

@Component({
  selector: 'app-add-leaves-type',
  templateUrl: './add-leaves-type.component.html',
  styleUrls: ['./add-leaves-type.component.css']
})
export class AddLeavesTypeComponent implements OnInit {

  leaveName: string = '';
  ifTakesLeave: boolean;

title: string = 'Dodaj typ urlopu';

  constructor(
    private absenceTypeService: AbsenceTypeService,
    private alertService: AlertService,
    ) { }

  ngOnInit(): void { }

  onSubmit(){
    this.absenceTypeService.add(this.leaveName, this.ifTakesLeave)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Dodano nowy typ urlopu")},
        error => {
          this.alertService.error(error);
        });
  }
}
