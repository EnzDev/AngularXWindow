import {Component, OnInit} from '@angular/core';
import {CSSDimension, Size, WindowComponent} from '../window.interface';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.sass']
})
export class DesktopComponent extends WindowComponent {
  readonly forcedLayer = 5;
  readonly forcedPosition = {
    left: new CSSDimension(0, ''),
    top: new CSSDimension(0, ''),
  };

  readonly maxSize = {
    width: new CSSDimension(100, 'vw'),
    height: new CSSDimension(96, 'vh')
  };
  readonly minSize = this.maxSize;
  size: Size;

  constructor() {
    super();
    this.size = this.maxSize;
  }

  askForResize(desiredSize: Size) {
  }

}
