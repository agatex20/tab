import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequestService } from 'src/app/services/auth-request.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationBarService } from '../../services/navigation-bar.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  public title(): string {
    return this._title;
  }

  isAdmin: boolean;
  isManager: boolean;
  private _title: string = 'title';
  private _referals: string[] = [];

  constructor(
    private readonly _service: NavigationBarService,
    private router: Router,
    private authenticationService: AuthService
  ) {}

  ngOnInit(): void {
    //to powinno być inaczej zrobione. Powinien sie pobierać cały json z donośnikami do stronek
    this._service.getTitle().subscribe((t) => (this._title = t.toString()));
    this._service.getReferals().subscribe((r) => (this._referals = r));
    this.checkAccess();
  }

  logOut(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  checkAccess() {
    let accesLevel = this.authenticationService.accessLvl;
    if(accesLevel == 2) {
      this.isAdmin = true;
      this.isManager = true;
    } else if(accesLevel == 1) {
      this.isAdmin = false;
      this.isManager = true;
    } else {
      this.isAdmin = false;
      this.isManager = false;
    }
  }
}
