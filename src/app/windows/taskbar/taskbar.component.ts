import {Component, OnInit} from '@angular/core';
import {CSSDimension, Size, WindowComponent} from '../window.interface';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.sass']
})
export class TaskbarComponent extends WindowComponent {
  readonly  forcedLayer = 5001; // Force layer
  readonly forcedPosition = {
    left: new CSSDimension(0, ''),
    top: new CSSDimension(96, 'vh'),
  };
  readonly maxSize = {
    height: new CSSDimension(4, 'vh'),
    width: new CSSDimension(100, 'vw')
  };
  readonly minSize = this.maxSize; // Immutable size

  size: Size;

  constructor() {
    super();
    this.size = this.maxSize;
  }

  // Ignore resizing
  askForResize(desiredSize: Size) {}
}
