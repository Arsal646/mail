// pipes/safe-html-or-text.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtmlOrText',
  standalone: true
})
export class SafeHtmlOrTextPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';

    const hasHtml = /<\/?[a-z][\s\S]*>/i.test(value);
    const displayValue = hasHtml ? value : value.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(displayValue);
  }
}
