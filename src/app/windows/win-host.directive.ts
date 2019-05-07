import {Directive, Input, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[win-host]'
})
export class WinHost {
  // Unique id given by the windows manager
  @Input() id: number;

  constructor(public viewContainerRef: ViewContainerRef) { }
}
