import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { RoleDTO } from 'src/app/dto/roleDTO';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  roleName: string = '';
  accessLevels: Array<number> = [0, 1, 2, -1];
  accessLevel: Number;
  title: string = 'Dodaj rolę';
  role: RoleDTO;

  constructor(
    private roleService: RolesService,
    private alertService: AlertService,
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
