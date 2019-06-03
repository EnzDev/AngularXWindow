import {Component, Input, OnInit, Type} from '@angular/core';
import {WindowControllerService} from '../../../window-manager/window-controller.service';
import {WindowComponent} from '../../window.interface';
import {App, File} from '../../../os/fs.service';
import {MimeService} from '../../../os/mime.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./app-icon.component.sass']
})
export class IconComponent implements OnInit {

  @Input()
  private file: File;

  @Input()
  private title: string;

  @Input('src')
  private pictureRef: string;
  private selected = false;

  constructor(private windowController: WindowControllerService, private mimeService: MimeService) { }

  ngOnInit() {}

  private ifApp(file: File) {
    return file instanceof App;
  }

  select() {
    this.selected = true;
  }
}
