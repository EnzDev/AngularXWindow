import { Component, OnInit } from '@angular/core';
import {WindowComponent} from '../window.interface';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.sass']
})
export class DesktopComponent implements OnInit, WindowComponent {

  constructor() { }

  ngOnInit() {
  }

}
