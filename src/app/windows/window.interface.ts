import {File} from '../os/fs.service';
import {ReplaySubject} from 'rxjs';

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
}

export abstract class WindowComponentWithFile extends WindowComponent {
  public input?: ReplaySubject<File> = new ReplaySubject<File>();
}

export type CSSUnit = '%' | 'px' | 'vh' | 'vw' | 'em' | 'ex' | '';

class CSSUnitUnsuportedError implements Error {
  message: string;
  name: string;
}

// Number is a px size
export class CSSDimension {
  constructor(public size: number, public unit: CSSUnit) {
  }

  static convertUnitToPixel(input: CSSDimension): CSSDimension {
    switch (input.unit) {
      case 'vh':
        return new CSSDimension(input.size * (window.innerHeight / 100), 'px');
      case 'vw':
        return new CSSDimension(input.size * (window.innerWidth / 100), 'px');
      case '%':
        throw new CSSUnitUnsuportedError();
      case 'em':
        throw new CSSUnitUnsuportedError();
      case 'px':
        return input;
    }


    return new CSSDimension(0, '');
  }

  get() {
    if (this.unit === '' && this.size !== 0) {
      throw new CSSUnitUnsuportedError();
    }
    return this.size.toString() + this.unit;
  }

  add(value: number): void {
    this.size += value;
  }

  sub(value: number): void {
    this.size -= value;
  }

  copy(): CSSDimension {
    return new CSSDimension(this.size, this.unit);
  }
}


// Defined as [Width/X, Height/Y]
export class Position {
  constructor(public top: CSSDimension, public left: CSSDimension) {
  }

  copy(): Position {
    return new Position(this.top.copy(), this.left.copy());
  }
}

export class Size {
  constructor(public height: CSSDimension, public width: CSSDimension) {
  }

  copy(): Size {
    return new Size(this.height.copy(), this.width.copy());
  }
}

