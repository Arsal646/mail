import { isPlatformBrowser } from '@angular/common';
import { Component, inject, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink, RouterModule } from '@angular/router';
import { RouteTranslationService } from '../../services/route-translation.service';
import { SeoService } from '../../services/seo.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-about',
  imports: [RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
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
  const translatedRoute = this.routeTranslation.getRoute('/about') || '/about';

  this.seoService.updateSeoTags({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    ogUrl: baseUrl + translatedRoute,
    ogImage: 'https://tempmail4u.com/assets/images/og/about-us.jpg',
    ogSiteName: 'TempMail4u',
    twitterSite: '@tempmails'
  });
}

private getLocalizedSeoContent() {
  return {
    title: $localize`:@@seo.about.title:About TempMail4u - Privacy First Temporary Email Service`,
    description: $localize`:@@seo.about.description:Learn how TempMail4u helps you stay private online with disposable inboxes, instant setup, and spam control.`,
    keywords: $localize`:@@seo.about.keywords:about tempmail, temp mail info, disposable email service, privacy email, spam control`
  };
}
}