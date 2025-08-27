import { Component, Inject, OnInit, PLATFORM_ID, LOCALE_ID, inject } from '@angular/core';
import { QuickEmailComponent } from '../../compoents/quick-email/quick-email.component';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { SeoService } from '../../services/seo.service';
import { RouteTranslationService } from '../../services/route-translation.service';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

declare const $localize: any;

@Component({
  selector: 'app-email-10min',
  standalone: true,
  imports: [QuickEmailComponent, LucideAngularModule, RouterModule],
  templateUrl: './email-10min.component.html',
})
export class Email10MinComponent implements OnInit {
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);
  private routeTranslation = inject(RouteTranslationService);

  get routes() {
    return {
      email20min: this.routeTranslation.getRoute('email-20min'),
      email30min: this.routeTranslation.getRoute('email-30min')
    };
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private scrollService: ScrollService
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollToTopInstant();
    }
    this.setSeoTags();
  }

  private setSeoTags(): void {
    const seoContent = this.getLocalizedSeoContent();
    const baseUrl = this.seoService.getBaseUrl(this.locale);
    const translatedRoute = this.routeTranslation.getRoute('email-10min');

    this.seoService.updateSeoTags({
      title: seoContent.title,
      description: seoContent.description,
      keywords: seoContent.keywords,
      ogUrl: baseUrl + '/10-minutes-temporary-email',
      ogImage: 'https://tempmail4u.com/assets/images/10-minute-email-preview.jpg',
      ogSiteName: 'TempMail4u',
      twitterSite: '@tempmails'
    });
  }

private getLocalizedSeoContent() {
  return {
    title: $localize`:@@seo.email10min.title:10 Minute Temporary Email | Free, Secure & Spam-Free Inbox`,
    description: $localize`:@@seo.email10min.description:Generate your free 10 minute temporary email instantly. Protect your inbox with our secure disposable inbox service – fast, private, and spam-free.`,
    keywords: $localize`:@@seo.email10min.keywords:10 minute temporary email, 10 minute mail, disposable email, burner email, temporary mailbox, anonymous inbox, spam free email, OTP verification`
  };
}

}
