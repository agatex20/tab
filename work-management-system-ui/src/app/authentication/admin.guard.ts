import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccessLevelEnum } from '../dto/accessLevelEnum';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.loggedUser;
    if (!currentUser) {
      // logged in so return true
      return false;
    }
    if (this.authService.accessLvl === AccessLevelEnum.Admin) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['un-authorized']);
    return false;
  }
}
