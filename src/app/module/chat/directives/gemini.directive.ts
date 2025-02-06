import {Directive, ElementRef, HostListener, inject, output} from '@angular/core';

@Directive({
  selector: '[gemini]'
})
export class GeminiDirective {

  showIa = output<boolean>()

  el: ElementRef<HTMLTextAreaElement> = inject(ElementRef);


  @HostListener('input')
  checkValue() {
    const textEle = this.el.nativeElement;
    const text = textEle.value;
    const regex = new RegExp(/@gemini\b/gi);

    if (regex.test(text)) {
      const parent = this.el.nativeElement.parentElement;
      this.showIa.emit(true);

      if (parent && parent.childNodes && parent.childNodes.length > 1) {
        this.el.nativeElement.value = this.el.nativeElement.value.replace(regex, '');
      }
    }
  }

}
