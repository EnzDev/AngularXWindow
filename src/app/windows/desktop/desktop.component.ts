import {Component} from '@angular/core';
import {WindowComponent} from '../window.interface';
import {FsService} from '../../os/fs.service';
import {File, Folder} from '../../os/fs.models';
import {CSSDimension, Position, Size} from '../css.models';


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

  private desktop: { [p: string]: File };

  constructor(private fs: FsService) {
    super();
    this.size = this.maxSize;

    try {
      const desktop = fs.resolve('/home/root/Desktop');
      if (desktop instanceof Folder) {
        this.desktop = desktop.files;
      }
    } catch (e) {
      console.error('No Such File', e);
    }
  }

  askForResize(desiredSize: Size) {
    return false;
  }

}
