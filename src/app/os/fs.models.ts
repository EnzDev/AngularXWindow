import {Type} from '@angular/core';
import {WindowComponent} from '../windows/window.interface';

export class NoFileOrFolder extends Error {
  constructor(...params) {
    super(...params);
  }
}

export class File {
}

export class TextFile extends File {
  content: string;
}

export class App extends File {
  constructor(public launchClass: Type<WindowComponent>, public appIcon: string) {
    super();
  }
}

export class PDFFile extends File {
  constructor(public sourceUrl: string) {
    super();
  }
}

export class Folder extends File {
  files: { [key: string]: File } = {};
}
