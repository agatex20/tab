import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { AlertService } from 'src/app/alerts/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-data',
  templateUrl: './login-data.component.html',
  styleUrls: ['./login-data.component.css']
})
export class LoginDataComponent implements OnInit {
loading = false;
login: string;
password: string;
title: string = 'Zaloguj';
returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['add-worker']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'main';
  }

  onSubmit() {
    if(!this.login)
    {
      alert('Wpisz login');
      return;
    }

    if(!this.password)
    {
      alert('Wpisz haslo');
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.login, this.password)
      .pipe(first())
      .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
  }
}
