import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleChangeService {

  private _titleSource: BehaviorSubject<string>;
  public get titleSource(): BehaviorSubject<string> { return this._titleSource; }
  public set titleSource(value: BehaviorSubject<string>) { this._titleSource = value; }

  private _currentTitle: Observable<string>;
  public get currentTitle(): Observable<string> { return this._currentTitle; }
  public set currentTitle(value: Observable<string>) { this._currentTitle = value; }

  constructor() {
    this.titleSource = new BehaviorSubject('Clients');
    this.currentTitle = this.titleSource.asObservable();
  }

  changeTitle(title: string) {
    this.titleSource.next(title);
  }

}
