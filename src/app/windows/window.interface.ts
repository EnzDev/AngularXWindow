export abstract class WindowComponent {

  readonly forcedLayer?: number;
  // Sizes
  size: Size;
  readonly minSize: Size;
  readonly maxSize: Size;

  abstract askForResize(desiredSize: Size);
}

export type CSSUnit = '%'|'px'|'vh'|'vw'|'em'|'ex';

// Number is a px size
export class CSSDimension {
  constructor(public size: number, public unit: CSSUnit) {}

  get() {
    return this.size.toString() + this.unit;
  }
}


// Defined as [Width/X, Height/Y]
export class Position {
  left: CSSDimension;
  top: CSSDimension;
}

export class Size {
  height: CSSDimension;
  width: CSSDimension;
}

