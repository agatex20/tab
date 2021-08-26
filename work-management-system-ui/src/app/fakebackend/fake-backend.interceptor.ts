import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { 
  Observable,
  of, 
  throwError
 } from 'rxjs';
import { 
  delay, 
  mergeMap, 
  materialize, 
  dematerialize 
} from 'rxjs/operators';
import { User } from '../models/user/user.model';

let users = JSON.parse(localStorage.getItem('users') || "null") || [];
let requests = JSON.parse(localStorage.getItem('requests') || "null") || [];
let absences = JSON.parse(localStorage.getItem('absences') || "null") || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    users = JSON.parse(localStorage.getItem('users') || "null") || [];
    requests = JSON.parse(localStorage.getItem('requests') || "null") || [];
    absences = JSON.parse(localStorage.getItem('absences') || "null") || [];

    // wrap in delayed observable to simulate server api call
    return of(null)
    .pipe(mergeMap(handleRoute))
    .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
    .pipe(delay(500))
    .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/addAbsence') && method === 'POST':
          return addAbsence();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        case url.endsWith('/addLeaveRequest') && method === 'POST':
          return addRequest();
        case url.endsWith('/leaveRequests') && method === 'GET':
          return getRequests();
        case url.match(/\/requests\/\d+$/) && method === 'DELETE':
          return deleteRequest();
        case url.endsWith('/absences') && method === 'GET':
          return getAbsences();
        default:
          return next.handle(request);
      }    
    }
    
    // route functions

    function authenticate() {
      const { username, password } = body;
      ////
      let razuser: User = new User('raz', 'raz', 'raz', 'raz');
      users.push(razuser); 
      ////
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      })
    }

    function register() {
      const user = body;

      if (users.find(x => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken')
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return ok();
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function addRequest() {
      const leaveRequest = body;

      leaveRequest.id = requests.length ? Math.max(...requests.map(x => x.id)) + 1 : 1;
      requests.push(leaveRequest);
      localStorage.setItem('requests', JSON.stringify(requests));

      return ok();
    }

    function getRequests() {
      if (!isLoggedIn()) return unauthorized();
      return ok(requests);
    }

    function deleteRequest() {
      if (!isLoggedIn()) return unauthorized();

      requests = requests.filter(x => x.id !== idFromUrl());
      localStorage.setItem('requests', JSON.stringify(requests));
      return ok();
    }

    function addAbsence() {
      const absence = body;

      absence.id = absences.length ? Math.max(...absences.map(x => x.id)) + 1 : 1;
      absences.push(absence);
      localStorage.setItem('absences', JSON.stringify(absences));

      return ok();
    }

    function getAbsences() {
      if (!isLoggedIn()) return unauthorized();
      return ok(absences);
    }

  // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    } 
  }
}

export const fakeBackendProvider = {
provide: HTTP_INTERCEPTORS,
useClass: FakeBackendInterceptor,
multi: true
};