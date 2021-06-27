import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";
import {MainPageService} from "../../services/main-page.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public get isAuthorized(): boolean {
    return this._service.checkAuthorization();
  }

  constructor(private readonly _router: Router,
              private readonly _service: MainPageService) { }

  ngOnInit(): void {
  }

}
