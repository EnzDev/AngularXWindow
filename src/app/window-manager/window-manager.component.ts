/*
 * Copyright Enzo Mallard (c) 2019. All Rights Reserved
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  QueryList,
  Type,
  ViewChildren
} from '@angular/core';
import {WinHost} from '../windows/win-host.directive';
import {TaskbarComponent} from '../windows/taskbar/taskbar.component';
import {CSSDimension, Position, WindowComponent} from '../windows/window.interface';
import {DesktopComponent} from '../windows/desktop/desktop.component';

@Component({
  selector: 'app-window-manager',
  templateUrl: './window-manager.component.html',
  styleUrls: ['./window-manager.component.sass']
})
export class WindowManagerComponent implements AfterViewInit {
  @ViewChildren(WinHost)
  winHosts: QueryList<WinHost>;

  private windows: WindowRef[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) {

    // FIXME: Destroying test
    setTimeout(() => {
      const destroy = this.windows.pop();
      const classname = destroy.window.componentType.name;
      destroy.window.destroy();
      cdr.markForCheck();
      console.log(`DESTROYED ${classname}`);
    }, 7000);
  }

  private _generateId = 0;
  public get generateId() {
    return this._generateId++;
  }

  ngAfterViewInit() {
    this.createInstance(DesktopComponent);
    this.createInstance(TaskbarComponent);
  }

  /**
   * Instantiate a Window and insert it into X
   * @param type: the Window to instantiate
   */
  private createInstance(type: Type<WindowComponent>): number {
    const factory = this.componentFactoryResolver.resolveComponentFactory(type);
    const id = this.generateId;

    this.windows.push({id, window: null, position: null, layer: null});

    this.cdr.detectChanges();
    const ref = this.winHosts.find((host: WinHost) => host.id === id)
          .viewContainerRef;
    ref.clear();
    const selectedWindow = this.windows.find((w) => w.id === id);
    selectedWindow.window = ref.createComponent(factory);
    selectedWindow.position = this.findBestPositionFor(selectedWindow.window);
    selectedWindow.layer = this.updateLayersForNewWindow(selectedWindow);
    return id;
  }

  /**
   * Returns the best position for a new window (If not enough space is available, hover another window)
   * Compute a collision box to find a hole
   * @param window The window that need a position
   * @todo The following code is just some tests
   */
  private findBestPositionFor(window: ComponentRef<WindowComponent>): Position {
    const position: Position = {
      left: new CSSDimension(0, 'px'),
      top: new CSSDimension(0, 'px'),
    };

    if (window.componentType.name === 'TaskbarComponent') {
      position.top.size = 96;
      position.top.unit = 'vh';
    }

    return position;
  }

  /**
   * Reorder every non stucked windows to handle the new window on top
   */
  private updateLayersForNewWindow(window: WindowRef) {
    for (const _window of this.windows) {
      if (!window.stucked) {_window.layer -= 1; }
    }

    return window.window.instance.forcedLayer || 5000;
  }
}

interface WindowRef {
  id: number;
  window: ComponentRef<WindowComponent>;
  position: Position; // Top left position
  layer: number; // Layer number (uses z-index) default to 5000
  stucked?: boolean;
}
