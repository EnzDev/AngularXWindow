import {Component, Input, OnInit, Type} from '@angular/core';
import {WindowControllerService} from '../../../window-manager/window-controller.service';
import {WindowComponent} from '../../window.interface';

@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.sass']
})
export class AppIconComponent implements OnInit {

  @Input()
  private app: Type<WindowComponent>;

  @Input('src')
  private pictureRef: string;
  private selected = false;

  constructor(private windowController: WindowControllerService) { }

  ngOnInit() {}

  select() {
    this.selected = true;
  }
}
