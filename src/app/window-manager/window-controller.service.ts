import {Injectable, Type} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {WindowComponent, WindowComponentWithFile} from '../windows/window.interface';
import {File} from '../os/fs.service';

@Injectable({
  providedIn: 'root'
})
export class WindowControllerService {

  constructor() { }

  public windowOpeningQueue$: ReplaySubject<[Type<WindowComponent | WindowComponentWithFile>, File?]>
    = new ReplaySubject<[Type<WindowComponent | WindowComponentWithFile>, File?]>();

  public openNewWindow(type: Type<WindowComponent | WindowComponentWithFile>, file?: File): void {
    this.windowOpeningQueue$.next([type, file]);
  }
}
