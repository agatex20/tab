import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { Role } from 'src/app/models/roles/role.model';
import { RoleService } from 'src/app/models/roles/role.service';
import { AccessLevelEnum } from 'src/app/dto/accessLevelEnum';
import { RoleUpdateDTO } from 'src/app/dto/roleUpdateDTO'
import { RolesService } from 'src/app/services/roles.service';
//import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  accessLevels: Array<number> = [0, 1, 2, -1];
  title: string = 'Role:';
  roles: RoleUpdateDTO[];

  constructor(
    private roleService: RolesService,
    private alertService: AlertService
  ){
    this.loadRoles();
  }

  ngOnInit(): void {
  }

  loadRoles() {
    this.roleService.getAll()
      .pipe(first())
      .subscribe(roles => this.roles = roles);
  }

  onDelete(roleId: string) {
    this.roleService.delete(roleId)
      .pipe(first())
      .subscribe(data => {
        this.alertService.success("Usunięto");
        location.reload();
      },
      error => {
        this.alertService.error(error);
      })
  }

  Accept(){
    for (let i=0; i < this.roles.length; i++) {
      this.roleService.update(this.roles[i])
        .pipe(first())
        .subscribe(data => console.log(data))
    }
    setTimeout(() => location.reload(), 1000)
  }
}
