/*
 * Copyright Enzo Mallard (c) 2019. All Rights Reserved
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef, NgZone,
  QueryList,
  Type,
  ViewChildren
} from '@angular/core';
import {WinHost} from '../windows/win-host.directive';
import {TaskbarComponent} from '../windows/taskbar/taskbar.component';
import {CSSDimension, Position, WindowComponent} from '../windows/window.interface';
import {DesktopComponent} from '../windows/desktop/desktop.component';
import {ClassicWindowComponent} from '../windows/classic-window/classic-window.component';

@Component({
  selector: 'app-window-manager',
  templateUrl: './window-manager.component.html',
  styleUrls: ['./window-manager.component.sass']
})
export class WindowManagerComponent implements AfterViewInit {
  @ViewChildren(WinHost)
  winHosts: QueryList<WinHost>;

  private windows: WindowRef[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef, private zone: NgZone) {
    /*
    // FIXME: Destroying test
    setTimeout(() => {
      const destroy = this.windows.pop();
      const classname = destroy.window.componentType.name;
      destroy.window.destroy();
      cdr.markForCheck();
      console.log(`DESTROYED ${classname}`);
    }, 7000);
    */
  }

  private _generateId = 0;
  public get generateId() {
    return this._generateId++;
  }

  ngAfterViewInit() {
    this.createInstance(DesktopComponent);
    this.createInstance(TaskbarComponent);

    // Draggable Elements
    this.createInstance(ClassicWindowComponent);
    this.createInstance(ClassicWindowComponent);
    this.createInstance(ClassicWindowComponent);
    this.createInstance(ClassicWindowComponent);
  }

  /**
   * Instantiate a Window and insert it into X
   * @param type: the Window to instantiate
   */
  private createInstance(type: Type<WindowComponent>): number {
    const factory = this.componentFactoryResolver.resolveComponentFactory(type);
    const id = this.generateId;

    this.windows.push({id, window: null, position: null, layer: null, reduced: false});

    this.cdr.detectChanges();
    const ref = this.winHosts.find((host: WinHost) => host.id === id)
      .viewContainerRef;
    ref.clear();
    const selectedWindow = this.windows.find((w) => w.id === id);

    selectedWindow.window = ref.createComponent(factory);
    selectedWindow.window.onDestroy(() => {

    });
    selectedWindow.position = this.findBestPositionFor(selectedWindow.window);
    selectedWindow.layer = this.updateLayersForNewWindow(selectedWindow);
    this.cdr.detectChanges();
    return id;
  }

  /**
   * Returns the best position for a new window (If not enough space is available, hover another window)
   * Compute a collision box to find a hole
   * @param window The window that need a position
   * @todo The following code is just some tests
   */
  private findBestPositionFor(window: ComponentRef<WindowComponent>): Position {
    if (window.instance.forcedPosition) {
      return window.instance.forcedPosition;
    }

    const position: Position = {
      left: new CSSDimension(0, 'px'),
      top: new CSSDimension(0, 'px'),
    };
    return position;
  }

  /**
   * Reorder every non stucked windows to handle the new window on top
   */
  private updateLayersForNewWindow(window: WindowRef) {
    for (const _window of this.windows) {
      if (!_window.window.instance.forcedLayer) {
        _window.layer -= 1;
      }
    }

    return window.window.instance.forcedLayer || 5000;
  }

  private startDrag($event: DragEvent, window: WindowRef) {
    if (window.window.instance.forcedPosition) {
      $event.preventDefault();
      return;
    }
    $event.dataTransfer.setDragImage(document.createElement('span'), 0, 0);


    $event.dataTransfer.dropEffect = 'move';
    this.switch(window);
    $event.dataTransfer.setData('application/json', JSON.stringify({id: window.id, originalOffset: [$event.offsetX, $event.offsetY]}));
  }

  private onDragOver($event: DragEvent, hoverZone: WindowRef) {
    // Prevent moving windows behind the Taskbar
    if (hoverZone.window.componentType.name === 'TaskbarComponent') {
      return;
    }

    $event.preventDefault();
    $event.dataTransfer.dropEffect = 'move';

    const parsedData = JSON.parse($event.dataTransfer.getData('application/json')) as { id: number, originalOffset: [number, number] };

    const toDrag = this.windows.find((window) => window.id === parsedData.id);
    toDrag.position.left = new CSSDimension($event.clientX - parsedData.originalOffset[0], 'px');
    toDrag.position.top = new CSSDimension($event.clientY - parsedData.originalOffset[1], 'px');
  }

  private onDragDrop($event: DragEvent, dropZone: WindowRef) {
    // Prevent moving windows behind the Taskbar
    if (dropZone.window.componentType.name === 'TaskbarComponent') {
      return;
    }

    $event.preventDefault();
    const parsedData = JSON.parse($event.dataTransfer.getData('application/json')) as { id: number, originalOffset: [number, number] };

    const toMove = this.windows.find((window) => window.id === parsedData.id);
    toMove.position.left = new CSSDimension($event.clientX - parsedData.originalOffset[0], 'px');
    toMove.position.top = new CSSDimension($event.clientY - parsedData.originalOffset[1], 'px');
  }

  public switch(window: WindowRef|number) {
    if (typeof window === 'number') { // Switch ID reference to window
      window = this.windows.find((_window) => _window.id === window);
    }

    if (window.window.instance.forcedLayer) {
      return;
    }

    const maxRef = window.layer;
    for (const _window of this.windows) {
      if (!_window.window.instance.forcedLayer && _window.layer > maxRef) {
        _window.layer -= 1;
      }
    }

    window.layer = 5000;
  }

  public minimize(id: number) {
    const window = this.windows.find((_window) => _window.id === id);
    console.log('minimize');
    window.reduced = true;
  }

  public restore(id: number) {
    const window = this.windows.find((_window) => _window.id === id);
    console.log('restore');
    window.reduced = false;
  }
}

interface WindowRef {
  id: number;
  window: ComponentRef<WindowComponent>;
  position: Position; // Top left position
  layer: number; // Layer number (uses z-index) default to 5000
  stucked?: boolean;
  reduced: boolean;
}
