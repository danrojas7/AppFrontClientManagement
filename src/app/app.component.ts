import { Component } from '@angular/core';
import { TitleChangeService } from './services/title-change.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _title: string;
  public get title() { return this._title; }
  public set title(value) { this._title = value; }

  constructor(
    private titleChangeService: TitleChangeService
  ) {
    this.title = 'Clients';
  }

  ngOnInit() {
    this.titleChangeService.currentTitle.subscribe((title: string) => this.title = title);
  }

}
