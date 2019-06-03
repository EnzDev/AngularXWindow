import {AfterViewInit, Component} from '@angular/core';
import {CSSDimension, Size, WindowComponentWithFile} from '../../window.interface';
import {PDFFile} from '../../../os/fs.service';

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
  private pdfSrc: string;

  askForResize(desiredSize: Size) {
  }

  ngAfterViewInit(): void {
    this.input.subscribe(fileReady => {
      if (fileReady instanceof PDFFile) {
        console.log('Opening', fileReady);
        this.pdfSrc = fileReady.sourceUrl;
      }
    });
  }
}
