import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import { NgZone } from '@angular/core';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

@Directive({
  selector: '[appGoogleAdsense]',
  standalone: true,
})
export class GoogleAdsenseDirective implements AfterViewInit {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly ngZone = inject(NgZone);
  private retryCount = 0;
  private readonly maxRetries = 10;
  private readonly retryDelay = 500;

  ngAfterViewInit(): void {
    this.resetAdStatus();
    this.pushAdRequest();
  }

  private pushAdRequest(): void {
    this.ngZone.runOutsideAngular(() => {
      const tryPush = () => {
        const ads = window.adsbygoogle;

        if (Array.isArray(ads)) {
          try {
            ads.push({});
          } catch (error) {
            if (this.retryCount < this.maxRetries) {
              this.retryCount++;
              setTimeout(tryPush, this.retryDelay);
            }
          }
          return;
        }

        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          setTimeout(tryPush, this.retryDelay);
        }
      };

      tryPush();
    });
  }

  private resetAdStatus(): void {
    const element = this.element.nativeElement;
    element.removeAttribute('data-ad-status');
  }
}
