import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Role } from 'src/app/models/roles/role.model';
import { RoleService } from 'src/app/models/roles/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  accessLevels: Array<number> = [0, 1, 2, 3];
  title: string = 'Role:';
<<<<<<< Updated upstream
  data: Array<any>;
  constructor(){
    this.data = [
        { role: 'Rola1', value1: Boolean,value2: Boolean },
        { role: 'Rola2', value1: Boolean,value2: Boolean },
        { role: 'Rola3', value1: Boolean,value2: Boolean },
        { role: 'Rola4', value1: Boolean,value2: Boolean }
    ];
}
=======
  roles: Role[];
>>>>>>> Stashed changes

  constructor(
    private roleService: RoleService
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

  onDelete():void{

  }
  Accept(){
    
  }
}
