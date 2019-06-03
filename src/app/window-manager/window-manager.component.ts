/*
 * Copyright Enzo Mallard (c) 2019. All Rights Reserved
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  QueryList,
  Type,
  ViewChildren
} from '@angular/core';
import {WinHost} from '../windows/win-host.directive';
import {TaskbarComponent} from '../windows/taskbar/taskbar.component';
import {CSSDimension, Position, WindowComponent, WindowComponentWithFile} from '../windows/window.interface';
import {DesktopComponent} from '../windows/desktop/desktop.component';
import {WindowControllerService} from './window-controller.service';
import {BehaviorSubject} from 'rxjs';
import {File} from '../os/fs.service';

@Component({
  selector: 'app-window-manager',
  templateUrl: './window-manager.component.html',
  styleUrls: ['./window-manager.component.sass']
})
export class WindowManagerComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(WinHost)
  winHosts: QueryList<WinHost>;

  private windows: WindowRef[] = [];

  private destroy$ = new BehaviorSubject(null);

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    private windowController: WindowControllerService) {
    // tslint:disable-next-line:no-string-literal
    window['old'] = [];
    // tslint:disable-next-line:no-string-literal
    window['new'] = [];
  }

  private _generateId = 0;
  public get generateId() {
    return this._generateId++;
  }

  ngAfterViewInit() {
    this.createInstance(DesktopComponent);
    this.createInstance(TaskbarComponent);

    // Draggable Elements
    this.windowController.windowOpeningQueue$.subscribe(
      ([input]: [Type<WindowComponent>, File]) => {
        // @ts-ignore Type is not clearly detected by tslint
        this.createInstance(...input);
    });
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

  public minimize(window: WindowRef|number) {
    if (typeof window === 'number') { // Switch ID reference to window
      window = this.windows.find((_window) => _window.id === window);
    }

    console.log('minimize');
    window.reduced = true;
  }

  public restore(window: WindowRef|number) {
    if (typeof window === 'number') { // Switch ID reference to window
      window = this.windows.find((_window) => _window.id === window);
    }

    console.log('restore');
    window.reduced = false;
  }

  public close(window: WindowRef|number) {
    if (typeof window === 'number') { // Switch ID reference to window
      window = this.windows.find((_window) => _window.id === window);
    }

    window.window.destroy();
    // @ts-ignore fixme: Type checking does not work here (see https://gist.github.com/EnzDev/6d1cdd5af265e5ff8094d6961a3a5434)
    this.windows.splice(this.windows.findIndex((_window) => _window.id === window.id), 1);
  }

  ngOnDestroy(): void {
    for (const window of this.windows) {
      this.close(window);
    }
    this.destroy$.next(true);
  }

  /**
   * Instantiate a Window and insert it into X
   * @param type: the Window to instantiate
   */
  private createInstance(type: Type<WindowComponent | WindowComponentWithFile>, fileInjector ?: File): number {
    const factory = this.componentFactoryResolver.resolveComponentFactory(type);
    const id = this.generateId;

    this.windows.push({id, window: null, position: null, layer: null, reduced: false});

    this.cdr.detectChanges();
    const ref = this.winHosts.find((host: WinHost) => host.id === id)
      .viewContainerRef;
    ref.clear(); // Clear the reference and make it ready to create the component
    const selectedWindow = this.windows.find((w) => w.id === id);

    selectedWindow.window = ref.createComponent(factory);
    const instance = selectedWindow.window.instance;
    if (instance instanceof WindowComponentWithFile) {
      instance.input.next(fileInjector);
    }
    selectedWindow.window.onDestroy(() => {

    });
    selectedWindow.position = this.findBestPositionFor(selectedWindow);
    selectedWindow.layer = this.updateLayersForNewWindow(selectedWindow);
    this.cdr.detectChanges();
    return id;
  }

  /**
   * Returns the best position for a new window (If not enough space is available, hover another window)
   * Compute a collision box to find a hole
   * @param window The window that need a position
   * @improvement get the position of the focused window plus a small gap (modulo the window)
   */
  private findBestPositionFor(window: WindowRef): Position {
    if (window.window.instance.forcedPosition) {
      return window.window.instance.forcedPosition;
    }

    this.pixelizePositions();

    const winBefore = this.windows.find((win) => win.layer === 5000);
    if (winBefore) {
      const pos = winBefore.position.copy();
      pos.left.add(50);
      pos.top.add(50);
      return pos;
    } else {
      return new Position(new CSSDimension(20, 'px'), new CSSDimension(20, 'px'));
    }

    /*
    window.position
    window.position.left.add(10);
    window.position.top.add(10);
    */
  }

  /**
   * Reorder every non stucked windows to handle the new window on top
   */
  private updateLayersForNewWindow(window: WindowRef) {
    for (const _window of this.windows) {
      _window.layer -= _window.window.instance.forcedLayer ? 0 : 1;
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

  private pixelizePositions() {
    for (const win of this.windows) {
      const elmRef = (win.window.location.nativeElement as HTMLElement).parentElement;

      if (!win.window.instance.forcedPosition) {
        win.position = new Position(
          new CSSDimension(elmRef.offsetTop, 'px'),
          new CSSDimension(elmRef.offsetLeft, 'px'),
        );
      }
    }
  }
}


interface WindowRef {
  id: number;
  window: ComponentRef<WindowComponent>;
  position: Position; // Top left position
  layer: number; // Layer number (uses z-index) default to 5000
  reduced: boolean;
}
