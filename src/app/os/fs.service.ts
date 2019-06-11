import {Injectable} from '@angular/core';
import {ClassicWindowComponent} from '../windows/classic-window/classic-window.component';
import {App, File, Folder, NoFileOrFolder, PDFFile, TextFile} from './fs.models';

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


