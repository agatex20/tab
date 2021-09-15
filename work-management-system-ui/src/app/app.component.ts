import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isNavbarVisible: boolean = false;

  constructor(public _service: AuthService, private router: Router) {}

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
