import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, LOCALE_ID, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { ScrollService } from '../../services/scroll.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-twitter-temp-email',
  standalone: true,
  imports: [MainTempMail, RouterModule, CommonModule],
  templateUrl: './twitter-temp-email.html'
})
export class TwitterTempEmail {
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollToTopInstant();
    }
    this.setSeoTags();
  }

  private setSeoTags(): void {
    const baseUrl = this.seoService.getBaseUrl(this.locale);
    const pagePath = '/temporary-email-for-twitter-x';
    const seo = this.getSeoContent();

    this.seoService.updateSeoTags({
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      ogUrl: baseUrl + pagePath,
      ogImage: 'https://tempmail4u.com/assets/images/temp-mail-preview.jpg',
      ogSiteName: 'TempMail4u',
      twitterSite: '@tempmails',
      breadcrumbs: [
        { name: 'Home', url: baseUrl + '/' },
        { name: 'Temporary Email for Twitter X', url: baseUrl + pagePath }
      ]
    });
  }

  private getSeoContent() {
    return {
      title: 'Twitter X Temp Email - Quick Disposable Email for Twitter Codes',
      description: 'Generate a temporary email for Twitter X sign up or security codes. Keep your personal inbox clean while you test ideas or recover accounts.',
      keywords: 'twitter temp email, twitter x email, disposable email twitter, burner email twitter, temporary inbox twitter, twitter verification code, spam free twitter signup'
    };
  }
}

