import {Directive, ElementRef, HostListener, inject} from '@angular/core';

@Directive({
  selector: '[gemini]'
})
export class GeminiDirective {

  private el: ElementRef<HTMLDivElement> = inject(ElementRef);

  @HostListener('input')
  checkValue() {
    const divEle = this.el.nativeElement as HTMLDivElement;
    const text = divEle.innerText;

    if (!text || text.length === 0) {
      divEle.innerHTML = text; // Reset to plain text if no words or text is empty.
      return;
    }

    const regex = new RegExp(/@gemini\b/gi);
    let highlightedText = text.replace(regex, `<mark>@Gemini</mark>`);

    console.log(highlightedText)
    divEle.innerHTML = highlightedText; // Set the highlighted HTML

  }

}
