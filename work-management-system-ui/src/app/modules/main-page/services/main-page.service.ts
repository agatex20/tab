import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  public checkAuthorization(): boolean{
    return true;
  }
  constructor() { }
}
