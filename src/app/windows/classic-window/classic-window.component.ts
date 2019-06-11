import {Component} from '@angular/core';
import {WindowComponent} from '../window.interface';
import {CSSDimension, Size} from '../css.models';

@Component({
  selector: 'app-classic-window',
  templateUrl: './classic-window.component.html',
  styleUrls: ['./classic-window.component.sass']
})
export class ClassicWindowComponent extends WindowComponent {
   readonly maxSize = new Size(
    new CSSDimension(80, 'vh'),
    new CSSDimension(80, 'vw'),
  );
  readonly minSize = new Size(
    new CSSDimension(10, 'vh'),
    new CSSDimension(5, 'vw'),
  );
  size: Size;

  constructor() {
    super();
    this.size = new Size(
      new CSSDimension(
        Math.floor(
          Math.random() * (this.maxSize.height.size - this.minSize.height.size + 1)
        ) + this.minSize.height.size, 'vh'
      ),
      new CSSDimension(
        Math.floor(
          Math.random() * (this.maxSize.width.size - this.minSize.width.size + 1)
        ) + this.minSize.width.size, 'vw'
      ),
    );
  }
}
