import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WindowManagerComponent } from './window-manager/window-manager.component';
import { DesktopComponent } from './windows/desktop/desktop.component';
import {WinHost} from './windows/win-host.directive';
import {TaskbarComponent} from './windows/taskbar/taskbar.component';
import { ClassicWindowComponent } from './windows/classic-window/classic-window.component';
import { IconComponent } from './windows/desktop/app-icon/icon.component';
import {FsService} from './os/fs.service';
import {MimeService} from './os/mime.service';
import { CvReaderComponent } from './windows/apps/cv-reader/cv-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    WindowManagerComponent,
    DesktopComponent,
    TaskbarComponent,
    WinHost,
    ClassicWindowComponent,
    IconComponent,
    CvReaderComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [FsService, MimeService],
  bootstrap: [AppComponent],
  entryComponents: [DesktopComponent, TaskbarComponent, ClassicWindowComponent, CvReaderComponent]
})
export class AppModule { }
