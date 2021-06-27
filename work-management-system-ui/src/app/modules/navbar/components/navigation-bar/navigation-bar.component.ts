import {Component, OnInit} from '@angular/core';
import {NavigationBarService} from "../../services/navigation-bar.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {


  public title(): string {
    return this._title;
  }


  private _title: string = "title";
  private _referals: string[] = [];

  constructor(private readonly _service: NavigationBarService) {
  }

  ngOnInit(): void {
    //to powinno być inaczej zrobione. Powinien sie pobierać cały json z donośnikami do stronek
    this._service.getTitle().subscribe(t => this._title = t.toString());
    this._service.getReferals().subscribe(r=>this._referals = r);

  }



}
