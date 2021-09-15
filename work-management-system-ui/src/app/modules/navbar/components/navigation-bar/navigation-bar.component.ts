import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessLevelEnum } from 'src/app/dto/accessLevelEnum';
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
  }

  logOut(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get isManager(): boolean {
    return (
      this.authenticationService.accessLvl === AccessLevelEnum.Manager ||
      this.authenticationService.accessLvl === AccessLevelEnum.Admin
    );
  }

  get isAdmin(): Boolean {
    return this.authenticationService.accessLvl === AccessLevelEnum.Admin;
  }

  get isWorker(): Boolean {
    return this.authenticationService.accessLvl !== AccessLevelEnum.Undefined;
  }
}
