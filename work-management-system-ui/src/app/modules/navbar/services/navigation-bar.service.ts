import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationBarService {

  public getTitle(): Observable<string>{
    return of("navigation bar");  //trzeba tak zrobic, bo cos sie sadzi, ze nie da sie od razu do observable lel
  }
  constructor() { }

  public getReferals() :Observable<string[]> {
    return of(["a", "b", "c", "d"]);
  }
}
