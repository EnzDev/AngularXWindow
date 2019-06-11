import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WindowManagerComponent} from './window-manager/window-manager.component';
import {DesktopComponent} from './windows/desktop/desktop.component';
import {WinHost} from './windows/win-host.directive';
import {TaskbarComponent} from './windows/taskbar/taskbar.component';
import {ClassicWindowComponent} from './windows/classic-window/classic-window.component';
import {IconComponent} from './windows/desktop/app-icon/icon.component';
import {FsService} from './os/fs.service';
import {MimeService} from './os/mime.service';
import {CvReaderComponent} from './windows/apps/cv-reader/cv-reader.component';
import {HttpClientModule} from '@angular/common/http';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import {ResizableModule} from 'angular-resizable-element';
import {APP_BASE_HREF, PlatformLocation} from '@angular/common';

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

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
    ResizableModule,
    BrowserModule,
    HttpClientModule,
    PdfJsViewerModule
  ],
  providers: [
    FsService,
    MimeService,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    }],
  bootstrap: [AppComponent],
  entryComponents: [DesktopComponent, TaskbarComponent, ClassicWindowComponent, CvReaderComponent]
})
export class AppModule { }
