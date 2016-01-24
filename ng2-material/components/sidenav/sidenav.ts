import {Directive, Renderer, ElementRef} from 'angular2/core';
import {Input} from 'angular2/core';

@Directive({selector: 'md-sidenav'})
export class MdSidenav {
  @Input() public opened: boolean = false; 
  
  constructor(private el: ElementRef, private renderer: Renderer) {
      renderer.setElementClass(el,"md-closed",true);
  }
  public toggle() {
      this.renderer.setElementClass(this.el,"md-closed",this.opened);
      this.renderer.setElementClass(this.el,"md-opened",!this.opened);
      this.opened = !this.opened;
  }
  
}
