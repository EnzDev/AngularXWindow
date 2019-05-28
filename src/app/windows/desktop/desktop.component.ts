import {Component} from '@angular/core';
import {CSSDimension, Position, Size, WindowComponent} from '../window.interface';
import {ClassicWindowComponent} from '../classic-window/classic-window.component';


@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.sass']
})
export class DesktopComponent extends WindowComponent {
  readonly forcedLayer = 5;
  readonly forcedPosition = new Position(
    new CSSDimension(0, ''),
    new CSSDimension(0, ''),
);

  readonly maxSize = new Size(
    new CSSDimension(96, 'vh'),
    new CSSDimension(100, 'vw'),
  );
  readonly minSize = this.maxSize;
  size: Size;

  private apps  = {
    classic: ClassicWindowComponent
  };

  constructor() {
    super();
    this.size = this.maxSize;
  }

  askForResize(desiredSize: Size) {
  }

}
