import { Component, OnInit } from '@angular/core';

import { Route, Router } from '@angular/router';

import { AuthenticationService } from './authentication/authentication.service';
import { User } from './models/user/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isNavbarVisible: boolean = false;

  constructor(public _service: AuthenticationService, private router: Router) {}

  public ngOnInit(): void {
    this._service.isLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn === true) {
        //navigate to default site
        this.isNavbarVisible = true;
      } else {
        this.router.navigate(['login']);
        this.isNavbarVisible = false;
      }
    });
  }
}
