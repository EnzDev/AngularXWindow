import {Injectable, Type} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {WindowComponent} from '../windows/window.interface';

@Injectable({
  providedIn: 'root'
})
export class WindowControllerService {

  constructor() { }

  public windowOpeningQueue$: ReplaySubject<Type<WindowComponent>> = new ReplaySubject<Type<WindowComponent>>();

  public openNewWindow(type: Type<WindowComponent>): void {
    this.windowOpeningQueue$.next(type);
  }
}
