import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WindowManagerComponent } from './window-manager/window-manager.component';
import { DesktopComponent } from './windows/desktop/desktop.component';
import {WinHost} from './windows/win-host.directive';
import {TaskbarComponent} from './windows/taskbar/taskbar.component';
import { ClassicWindowComponent } from './windows/classic-window/classic-window.component';

@NgModule({
  declarations: [
    AppComponent,
    WindowManagerComponent,
    DesktopComponent,
    TaskbarComponent,
    WinHost,
    ClassicWindowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DesktopComponent, TaskbarComponent, ClassicWindowComponent]
})
export class AppModule { }
