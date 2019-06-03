import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CSSDimension, Size, WindowComponent, WindowComponentWithFile} from '../../window.interface';
import {Document, ExternalDocument} from 'pdfjs';
import {HttpClient} from '@angular/common/http';
import {PDFFile} from '../../../os/fs.service';

@Component({
  selector: 'app-cv-reader',
  templateUrl: './cv-reader.component.html',
  styleUrls: ['./cv-reader.component.sass']
})
export class CvReaderComponent extends WindowComponentWithFile implements AfterViewInit {
  readonly maxSize = new Size(
    new CSSDimension(80, 'vh'),
    new CSSDimension(80, 'vw'),
  );
  readonly minSize = this.maxSize;
  readonly size: Size = this.maxSize;

  constructor(private http: HttpClient) {
    super();
  }

  askForResize(desiredSize: Size) {
  }

  ngAfterViewInit(): void {
    this.input.subscribe(fileReady => {
      if (fileReady instanceof PDFFile) {
        console.log('Opening', fileReady);
        this.http.get(fileReady.sourceUrl, {responseType: 'arraybuffer'}).subscribe( response => {
          // const doc = new ExternalDocument(response);
        });
      }
    });
  }

}
