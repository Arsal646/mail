import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, LOCALE_ID, PLATFORM_ID, inject } from '@angular/core';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-facebook-temp-email',
  standalone: true,
  imports: [MainTempMail, RouterModule],
  templateUrl: './facebook-temp-email.html'
})
export class FacebookTempEmail {
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollToTopInstant();
    }
    this.setSeoTags();
  }

  private setSeoTags(): void {
    const baseUrl = this.seoService.getBaseUrl(this.locale);
    const pagePath = '/temporary-email-for-facebook';
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
        { name: 'Temporary Email for Facebook', url: baseUrl + pagePath }
      ],
      faq: this.getFaqItems()
    });
  }

  private getSeoContent() {
    return {
      title: 'Temporary Email for Facebook | Disposable Inbox for Meta Accounts',
      description: 'Generate a temporary email for Facebook signups, OTP codes, and account recovery. Stay private, block spam, and rotate inboxes instantly with TempMail4U.',
      keywords: 'temporary email for facebook, facebook temp mail, disposable email facebook, facebook otp email, meta temporary inbox, burner email for facebook'
    };
  }

  private getFaqItems() {
    return [
      {
        question: 'Can I use a temporary email to verify a Facebook account?',
        answer: 'Yes. Paste the disposable address during signup or recovery, then copy the verification code from the inbox above. Codes remain accessible until the timer ends.'
      },
      {
        question: 'Will Facebook accept disposable email domains?',
        answer: 'Most verifications succeed. If a code fails to arrive, wait a moment, refresh the inbox, or create a new temporary address and try again.'
      },
      {
        question: 'Is this safe for long-term Facebook pages and ads?',
        answer: 'Use disposable addresses for quick tests or secondary profiles. For business pages, payments, or long-term access, add a permanent email once verified.'
      },
      {
        question: 'How do I keep the same inbox for later?',
        answer: 'Click Save in the inbox widget to generate a unique link. Bookmark it to return within the active window, or create a new email when you need a fresh start.'
      }
    ];
  }
}








