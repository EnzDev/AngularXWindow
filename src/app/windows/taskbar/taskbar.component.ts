import {Component} from '@angular/core';
import {WindowComponent} from '../window.interface';
import {CSSDimension, Position, Size} from '../css.models';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.sass']
})
export class TaskbarComponent extends WindowComponent {
  readonly forcedLayer = 5001; // Force layer
  readonly forcedPosition = new Position(
    new CSSDimension(96, 'vh'),
    new CSSDimension(0, ''),
  );
  readonly maxSize = new Size(
    new CSSDimension(4, 'vh'),
    new CSSDimension(100, 'vw')
  );
  readonly minSize = this.maxSize; // Immutable size

  size: Size;

  constructor() {
    super();
    this.size = this.maxSize;
  }

  // Ignore resizing
  askForResize(desiredSize: Size) {
    return false;
  }
}
