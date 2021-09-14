import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AbsencesService } from 'src/app/services/absences.service';

@Component({
  selector: 'app-login-data',
  templateUrl: './login-data.component.html',
  styleUrls: ['./login-data.component.css'],
})
export class LoginDataComponent implements OnInit {
  login: string = '';
  password: string = '';
  title: string = 'Zaloguj';

  constructor(private router: Router, private abs: AbsencesService) {}

  ngOnInit(): void {
    this.abs
      .getWorkersAbsences('260E4F02-24C3-4660-23CD-08D93B33A952')
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
