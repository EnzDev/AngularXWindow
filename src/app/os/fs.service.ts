import {Injectable, Type} from '@angular/core';
import {WindowComponent} from '../windows/window.interface';
import {ClassicWindowComponent} from '../windows/classic-window/classic-window.component';

@Injectable({
  providedIn: 'root'
})
export class FsService {

  public root = new Folder();

  constructor() {
    const home = this.root.files.home = new Folder();
    const root = home.files.root = new Folder();
    const desktop = root.files.Desktop = new Folder();
    root.files.Documents = new Folder();
    root.files.Images = new Folder();

    desktop.files['File Explorer'] = new App(ClassicWindowComponent, 'https://img.icons8.com/cotton/64/000000/folder-invoices.png');
    desktop.files.test = new TextFile();
    (desktop.files.test as TextFile).content = 'coucou';
    desktop.files['cv.pdf'] = new PDFFile('/assets/cv.pdf');
  }

  public resolve(path: string): File {
    const commands = path.split('/').filter(c => c !== '');
    let actual: File = this.root;
    for (const command of commands) {
      if (actual instanceof Folder) {
        actual = actual.files[command];
        if (actual === undefined) {
          throw new NoFileOrFolder();
        }
      } else {
        throw new NoFileOrFolder();
      }
    }

    return actual;
  }
}

class NoFileOrFolder extends Error {
  constructor(...params) {
    super(...params);
  }
}

export class File {}

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
  files: {[key: string]: File} = {};
}
