import { Component } from '@angular/core';
import {CSSDimension, Size, WindowComponent} from '../window.interface';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.sass']
})
export class DesktopComponent implements WindowComponent {
  readonly forcedLayer: number;
  readonly maxSize = {
    width: new CSSDimension(100, 'vw'),
    height: new CSSDimension(96, 'vh')
  };
  readonly minSize = this.maxSize;
  size: Size;

  constructor() {
    this.size = this.maxSize;
  }

  askForResize(desiredSize: Size) {
  }

}
