import {Component, Input, OnInit} from '@angular/core';
import {WindowControllerService} from '../../../window-manager/window-controller.service';
import {MimeService} from '../../../os/mime.service';
import {App, File} from '../../../os/fs.models';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./app-icon.component.sass']
})
export class IconComponent implements OnInit {

  @Input()
  public file: File;

  @Input()
  private title: string;

  @Input('src')
  private pictureRef: string;
  private selected = false;

  constructor(private windowController: WindowControllerService, private mimeService: MimeService) { }

  ngOnInit() {}

  public ifApp(file: File) {
    return file instanceof App;
  }

  select() {
    this.selected = true;
  }
}
