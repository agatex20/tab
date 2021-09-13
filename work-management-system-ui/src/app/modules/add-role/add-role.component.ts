import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { RoleService } from 'src/app/models/roles/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  roleName: string = '';
  accessLevels: Array<number> = [0, 1, 2, 3];
  accessLevel: number;
  title: string = 'Dodaj rolę';

  constructor(
    private roleService: RoleService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.roleService.add(this.roleName, Number(this.accessLevel))
      .pipe(first())
      .subscribe(data => this.alertService.success("Dodano nową rolę"));;
  }

  setAccessLevel(event: any) {
    this.accessLevel = event.target.value;
  }
}
