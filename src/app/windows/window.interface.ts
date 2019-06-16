import {ReplaySubject} from 'rxjs';
import {File, FileHolder} from '../os/fs.models';
import {CSSDimension, Position, Size} from './css.models';

export abstract class WindowComponent {
  title = 'Default title';
  readonly forcedLayer?: number;
  readonly forcedPosition?: Position;
  // Sizes
  abstract size: Size;
  abstract readonly minSize: Size;
  abstract readonly maxSize: Size;

  askForResize(desiredSize: Size): boolean {
    const newSize = this.size;
    let changed = false;
    if (desiredSize.width.size <= CSSDimension.convertUnitToPixel(this.maxSize.width).size
      && desiredSize.width.size >= CSSDimension.convertUnitToPixel(this.minSize.width).size) {
      this.size.width = desiredSize.width.copy();
      changed = true;
    }
    if (desiredSize.height.size <= CSSDimension.convertUnitToPixel(this.maxSize.height).size
      && desiredSize.height.size >= CSSDimension.convertUnitToPixel(this.minSize.height).size) {
      this.size.height = desiredSize.height.copy();
      changed = true;
    }
    this.size = newSize;
    return changed;
  }

  close() {
  }
}

export abstract class WindowComponentWithFile extends WindowComponent {
  public input?: ReplaySubject<FileHolder<File>> = new ReplaySubject<FileHolder<File>>();
}
