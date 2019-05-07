import { Component, OnInit } from '@angular/core';
import {WindowComponent} from '../window.interface';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.sass']
})
export class TaskbarComponent implements OnInit, WindowComponent {

  constructor() { }

  ngOnInit() {
  }

}
