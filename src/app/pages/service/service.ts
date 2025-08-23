import { isPlatformBrowser } from '@angular/common';
import { Component, inject, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouteTranslationService } from '../../services/route-translation.service';
import { ScrollService } from '../../services/scroll.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-service',
  imports: [RouterModule],
  templateUrl: './service.html',
  styleUrl: './service.css'
})
export class Service {
private seoService = inject(SeoService);
private locale = inject(LOCALE_ID);
private routeTranslation = inject(RouteTranslationService);
private scrollService = inject(ScrollService);
private platformId = inject(PLATFORM_ID);

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.scrollService.scrollToTopInstant();
  }
  this.setSeoTags();
}

private setSeoTags(): void {
  const seo = this.getLocalizedSeoContent();
  const baseUrl = this.seoService.getBaseUrl(this.locale);
  const translatedRoute = this.routeTranslation.getRoute('/services') || '/services';

  this.seoService.updateSeoTags({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    ogUrl: baseUrl + translatedRoute,
    ogImage: 'https://tempmail4u.com/assets/images/og/services.jpg',
    ogSiteName: 'TempMail4u',
    twitterSite: '@tempmails'
  });
}

private getLocalizedSeoContent() {
  return {
    title: $localize`:@@seo.services.title:Temporary Email Services - Disposable Inboxes, Custom Aliases, OTP Support`,
    description: $localize`:@@seo.services.description:Use TempMail4u for quick signups, app testing, and OTP verifications. Create disposable inboxes instantly and keep your real email safe.`,
    keywords: $localize`:@@seo.services.keywords:temporary email services, disposable inbox, burner email, otp email, test email, spam protection`
  };
}
}