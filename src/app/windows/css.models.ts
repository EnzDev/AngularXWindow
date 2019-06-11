/*
 * Copyright Enzo Mallard (c) 2019. All Rights Reserved
 */

// Defined as [Width/X, Height/Y]
// Number is a px size
export type CSSUnit = '%' | 'px' | 'vh' | 'vw' | 'em' | 'ex' | '';

class CSSUnitUnsuportedError implements Error {
  message: string;
  name: string;
}

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
