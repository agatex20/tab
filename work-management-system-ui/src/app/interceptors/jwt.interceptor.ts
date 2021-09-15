import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service'
import { Configuration } from "../config";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const currentUser = this.authenticationService.loggedUser;
    const isLoggedIn = currentUser && this.authenticationService.auth_token;

    const isApiUrl = request.url.startsWith(Configuration.API_URL);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.auth_token}`
        }
      });
    }

    return next.handle(request);
  }
}
