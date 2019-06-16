import {Injectable, Type} from '@angular/core';
import {WindowComponent} from '../windows/window.interface';
import {CvReaderComponent} from '../windows/apps/cv-reader/cv-reader.component';
import {App, File, Folder, PDFFile} from './fs.models';
import {TextReaderComponent} from '../windows/apps/text-reader/text-reader.component';

@Injectable({
  providedIn: 'root'
})
export class MimeService {

  private picDB: {[type: string]: string} = {
    folder: 'https://img.icons8.com/cotton/64/000000/folder-invoices.png',
    text: 'https://img.icons8.com/cotton/64/000000/green-file.png',
    code: 'https://img.icons8.com/cotton/64/000000/code-file.png',
    default: 'https://img.icons8.com/cotton/64/000000/regular-file.png',
    pdf: 'https://img.icons8.com/cotton/64/000000/scroll.png',
  };

  constructor() {}

  public getPictureForFile(file: File, name?: string): string {
    if (file instanceof Folder) {
      return this.picDB.folder;
    }

    if (file instanceof App) {
      return file.appIcon;
    }

    if (file instanceof PDFFile) {
      return this.picDB.pdf;
    }

    return this.picDB.default;
  }

  public getAppForFile(file: File): Type<WindowComponent> {

    if (file instanceof  PDFFile) {
      return CvReaderComponent;
    }

    return TextReaderComponent;
  }
}
