export abstract class WindowComponent {
  readonly forcedLayer?: number;
  readonly forcedPosition?: Position;
  // Sizes
  abstract size: Size;
  abstract readonly minSize: Size;
  abstract readonly maxSize: Size;

  abstract askForResize(desiredSize: Size);
}

export type CSSUnit = '%'|'px'|'vh'|'vw'|'em'|'ex'|'';

class CSSUnitUnsuportedError implements Error {
  message: string;
  name: string;
}

// Number is a px size
export class CSSDimension {
  constructor(public size: number, public unit: CSSUnit) {}

  get() {
    if (this.unit === '' && this.size !== 0) {
      throw new CSSUnitUnsuportedError();
    }
    return this.size.toString() + this.unit;
  }

  add(value: number): void { this.size += value; }
  sub(value: number): void { this.size -= value; }
  copy(): CSSDimension {
    return new CSSDimension(this.size, this.unit);
  }
}


// Defined as [Width/X, Height/Y]
export class Position {
  constructor(public top: CSSDimension, public left: CSSDimension) {}
  copy(): Position {
    return new Position(this.top.copy(), this.left.copy());
  }
}

export class Size {
  constructor(public height: CSSDimension, public width: CSSDimension) {}

  copy(): Size {
    return new Size(this.height.copy(), this.width.copy());
  }
}

