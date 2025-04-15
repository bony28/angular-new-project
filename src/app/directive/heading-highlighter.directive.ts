import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  input,
} from '@angular/core';

@Directive({
  selector: '[appHeadingHighlighter]',
})
export class HeadingHighlighterDirective {
  private el = inject(ElementRef);

  @Input() appHeadingHighlighter = '';

  @Input() defaultColor = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.highLight(this.appHeadingHighlighter || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highLight('');
  }

  private highLight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  constructor() {}
}
