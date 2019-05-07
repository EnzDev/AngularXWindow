import {AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, QueryList, Type, ViewChildren} from '@angular/core';
import {WinHost} from '../windows/win-host.directive';
import {DesktopComponent} from '../windows/desktop/desktop.component';
import {TaskbarComponent} from '../windows/taskbar/taskbar.component';
import {WindowComponent} from '../windows/window.interface';
import {createComponent} from '@angular/compiler/src/core';

@Component({
  selector: 'app-window-manager',
  templateUrl: './window-manager.component.html',
  styleUrls: ['./window-manager.component.sass']
})
export class WindowManagerComponent implements AfterViewInit {
  @ViewChildren(WinHost)
  winHosts: QueryList<WinHost>;

  private windows: WindowRef[] = [{id: 0, window: undefined}];

  private _generateId = 0;
  public get generateId() {
    return this._generateId++;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.createInstance(TaskbarComponent);
    this.createInstance(DesktopComponent);
  }

  private createInstance(type: Type<any>): number {
    const factory = this.componentFactoryResolver.resolveComponentFactory(type);
    const id = this.generateId;

    this.windows.push({id, window: null});
    const win = this.windows.find((w) => w.id === id);
    if (win) {
      if (this.winHosts.find((host: WinHost) => host.id === id)) {
        win.window = this.winHosts.find((host: WinHost) => host.id === id)
        .viewContainerRef
        .createComponent(factory);
      }
    }
    return id;
  }

}

interface WindowRef {
  id: number;
  window: ComponentRef<WindowComponent>;
}
