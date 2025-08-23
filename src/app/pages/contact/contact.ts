import { isPlatformBrowser } from '@angular/common';
import { Component, inject, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouteTranslationService } from '../../services/route-translation.service';
import { ScrollService } from '../../services/scroll.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [RouterModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
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
  const translatedRoute = this.routeTranslation.getRoute('/contact') || '/contact';

  this.seoService.updateSeoTags({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    ogUrl: baseUrl + translatedRoute,
    ogImage: 'https://tempmail4u.com/assets/images/og/contact.jpg',
    ogSiteName: 'TempMail4u',
    twitterSite: '@tempmails'
  });
}

private getLocalizedSeoContent() {
  return {
    title: $localize`:@@seo.contact.title:Contact TempMail4u - Support and Feedback`,
    description: $localize`:@@seo.contact.description:Reach out to the TempMail4u team for support, suggestions, and partnership inquiries.`,
    keywords: $localize`:@@seo.contact.keywords:contact tempmail, support temp mail, disposable email help, feedback, partnership`
  };
}
}