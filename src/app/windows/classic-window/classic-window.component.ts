import { Component, OnInit } from '@angular/core';
import {CSSDimension, Size, WindowComponent} from '../window.interface';

@Component({
  selector: 'app-classic-window',
  templateUrl: './classic-window.component.html',
  styleUrls: ['./classic-window.component.sass']
})
export class ClassicWindowComponent extends WindowComponent {
   readonly maxSize = {
    width: new CSSDimension(80, 'vw'),
    height: new CSSDimension(80, 'vh')
  };
  readonly minSize = {
    width: new CSSDimension(5, 'vw'),
    height: new CSSDimension(10, 'vh')
  };
  size: Size;

  constructor() {
    super();
    this.size = {
      width: new CSSDimension(
        Math.floor(
          Math.random() * (this.maxSize.width.size - this.minSize.width.size + 1)
        ) + this.minSize.width.size, 'vw'
      ),
      height: new CSSDimension(
        Math.floor(
          Math.random() * (this.maxSize.height.size - this.minSize.height.size + 1)
        ) + this.minSize.height.size, 'vh'
      )
    };
  }

  askForResize(desiredSize: Size) {
  }

}
