import {AfterViewInit, Component, Inject} from '@angular/core';
import {WindowComponentWithFile} from '../../window.interface';
import {PDFFile} from '../../../os/fs.models';
import {CSSDimension, Size} from '../../css.models';
import {APP_BASE_HREF, Location} from '@angular/common';

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

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) {
    super();
  }

  askForResize(desiredSize: Size) {
    return false;
  }


  ngAfterViewInit(): void {
    this.input.subscribe(fileReady => {
      if (fileReady.file instanceof PDFFile) {
        this.pdfSrc = Location.joinWithSlash(this.baseHref, fileReady.file.sourceUrl);
      }
    });
  }
}
