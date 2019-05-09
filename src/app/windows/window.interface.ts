import {OnInit} from '@angular/core';

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
}


// Defined as [Width/X, Height/Y]
export class Position {
  left!: CSSDimension;
  top!: CSSDimension;
}

export class Size {
  height!: CSSDimension;
  width!: CSSDimension;
}

