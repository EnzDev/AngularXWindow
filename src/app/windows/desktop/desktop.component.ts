import {Component} from '@angular/core';
import {WindowComponent} from '../window.interface';
import {FsService} from '../../os/fs.service';
import {File, FileHolder, Folder} from '../../os/fs.models';
import {CSSDimension, Position, Size} from '../css.models';
import {KeyValuePipe} from '@angular/common';


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

  private desktop: FileHolder<File>[];

  constructor(private fs: FsService, kvPipe: KeyValuePipe) {
    super();
    this.size = this.maxSize;

    try {
      const desktop = fs.resolve('/home/root/Desktop');
      if (desktop instanceof Folder) {
        const kvMap = kvPipe.transform(desktop.files);
        this.desktop = kvMap.map((kv) => new FileHolder<File>(kv.key, kv.value));
      }
    } catch (e) {
      console.error('No Such File', e);
    }
  }

  askForResize(desiredSize: Size) {
    return false;
  }

}
