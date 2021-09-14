import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccessLevelEnum } from 'src/app/dto/accessLevelEnum';

import { AbsencesService } from 'src/app/services/absences.service';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/user.service';
import { WorktimesService } from 'src/app/services/worktimes.service';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-data',
  templateUrl: './login-data.component.html',
  styleUrls: ['./login-data.component.css'],
})
export class LoginDataComponent implements OnInit {
  login: string = '';
  password: string = '';
  title: string = 'Zaloguj';

  constructor(private router: Router, private abs: WorktimesService) {}

  ngOnInit(): void {
    var time1 = new Date();
    var time2 = new Date();
    time1.setHours(time2.getHours() + 19);
    time2.setHours(time2.getHours() + 25);
    console.log(time1);
    console.log(time2);
    this.abs
      .getAllFromUser('DE606048-0FB6-4D67-65D4-08D946D6A2CE')

      .subscribe({ next: (x) => console.log(x) });
  }
  onSubmit() {
    if (!this.login) {
      alert('Wpisz login');
      return;
    }

    if (!this.password) {
      alert('Wpisz haslo');
      return;
    }
    const newLoginData = {
      login: this.login,
      password: this.password,
    };

    this.router.navigate(['main']);
    this.login = '';
    this.password = '';
  }
}
