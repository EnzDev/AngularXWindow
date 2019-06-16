import {AfterViewInit, Component, ComponentRef, ViewChild} from '@angular/core';
import {WindowComponentWithFile} from '../../window.interface';
import {CSSDimension, Size} from '../../css.models';
import {FileHolder, TextFile} from '../../../os/fs.models';
import {first} from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent, CKEditorComponent} from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-text-reader',
  templateUrl: './text-reader.component.html',
  styleUrls: ['./text-reader.component.sass']
})
export class TextReaderComponent extends WindowComponentWithFile implements AfterViewInit {
  title = 'Text editor';
  readonly minSize: Size = new Size(new CSSDimension(100, 'px'), new CSSDimension(350, 'px'));
  readonly maxSize: Size = new Size(new CSSDimension(96, 'vh'), new CSSDimension(100, 'vw'));
  size: Size = this.maxSize.copy();
  private holder: FileHolder<TextFile> = null;
  private textEditor = ClassicEditor;
  private configuration: any = null;
  @ViewChild('ckeditor')
  private ckRef: ComponentRef<CKEditorComponent>;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.size.height.size -= 5;
    this.size.width.size -= 5;

    // @ts-ignore
    // noinspection TypeScriptUnresolvedFunction
    /*
    $(this._elementRef.nativeElement).summernote({
      disableResizeEditor: true,
      height: '100%',
      maxHeight: null,
    });
*/

    this.input.pipe(first()).subscribe(fileReady => {
      if (fileReady.file instanceof TextFile) {
        this.title = `Text editor - ${fileReady.name}`;
        this.configuration = {initialData: fileReady.file.content};

        this.holder = fileReady as FileHolder<TextFile>;
      }
    });
  }

  onChange({editor}: ChangeEvent) {
    this.holder.file.content = editor.getData(); // Write data on the fly
  }
}
