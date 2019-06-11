import {AfterViewInit, Component} from '@angular/core';
import {WindowComponentWithFile} from '../../window.interface';
import {PDFFile} from '../../../os/fs.models';
import {CSSDimension, Size} from '../../css.models';

@Component({
  selector: 'app-cv-reader',
  templateUrl: './cv-reader.component.html',
  styleUrls: ['./cv-reader.component.sass']
})
export class CvReaderComponent extends WindowComponentWithFile implements AfterViewInit {
  title = 'PDF Reader';

  readonly maxSize = new Size(
    new CSSDimension(80, 'vh'),
    new CSSDimension(80, 'vw'),
  );
  readonly minSize = this.maxSize;
  readonly size: Size = this.maxSize;
  public pdfSrc: string;

  askForResize(desiredSize: Size) {
    return false;
  }


  ngAfterViewInit(): void {
    this.input.subscribe(fileReady => {
      if (fileReady instanceof PDFFile) {
        this.pdfSrc = fileReady.sourceUrl;
      }
    });
  }
}
