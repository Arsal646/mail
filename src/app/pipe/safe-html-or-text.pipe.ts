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

    if (hasHtml) {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }

    // Convert URLs to clickable links
    const linkedText = value.replace(
      /((https?:\/\/|www\.)[^\s<]+)/g,
      (match) => {
        const href = match.startsWith('http') ? match : `https://${match}`;
        return `<a href="${href}" class="custom-link" target="_blank" rel="noopener noreferrer">${match}</a>`;
      }
    );

    // Convert newlines to <br>
    const finalText = linkedText.replace(/(?:\r\n|\r|\n)/g, '<br>');

    return this.sanitizer.bypassSecurityTrustHtml(finalText);
  }
}
