import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlOrTextPipe } from '../../pipe/safe-html-or-text.pipe';

@Component({
  selector: 'app-email-body',
  standalone: true,
  imports: [CommonModule, SafeHtmlOrTextPipe],
  template: `
    <div class="email-body" [innerHTML]="htmlContent | safeHtmlOrText"></div>
  `,
  styles: [`
    .email-body {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 35px;
      max-width: 100%;
      color: #1f2937; /* gray-800 */
      font-size: 0.875rem; /* text-sm */
      word-break: break-word;
      height: auto;
      display: block;
      padding-top:10px;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EmailBodyComponent {
  @Input() htmlContent: string = '';
}
