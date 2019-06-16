import {Injectable, Type} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {WindowComponent, WindowComponentWithFile} from '../windows/window.interface';
import {File, FileHolder} from '../os/fs.models';

@Injectable({
  providedIn: 'root'
})
export class WindowControllerService {

  constructor() { }

  public windowOpeningQueue$: ReplaySubject<[Type<WindowComponent | WindowComponentWithFile>, FileHolder<File>?]>
    = new ReplaySubject<[Type<WindowComponent | WindowComponentWithFile>, FileHolder<File>?]>();

  public openNewWindow(type: Type<WindowComponent | WindowComponentWithFile>, file?: FileHolder<File>): void {
    this.windowOpeningQueue$.next([type, file]);
  }
}
