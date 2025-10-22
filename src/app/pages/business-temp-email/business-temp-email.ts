import { isPlatformBrowser, NgFor } from '@angular/common';
import { Component, Inject, LOCALE_ID, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { ScrollService } from '../../services/scroll.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-business-temp-email',
  standalone: true,
  imports: [MainTempMail, RouterModule, NgFor],
  templateUrl: './business-temp-email.html'
})
export class BusinessTempEmail {
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);

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
    const baseUrl = this.seoService.getBaseUrl(this.locale);
    const pagePath = '/temporary-business-email';
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
        { name: 'Temporary Email for Business', url: baseUrl + pagePath }
      ],
      faq: this.getFaqItems()
    });
  }

  private getSeoContent() {
    return {
      title: 'Temporary Business Email - Free Disposable Email for Work & Business',
      description: 'Get a free temporary business email for SaaS trials, work sign-ups, and business verifications. Keep your work email safe from spam. No registration needed.',
      keywords: 'temporary business email, business temp email, disposable business email, work email, saas trial email, business verification email, temporary work email, free business email, burner business email, business email for testing'
    };
  }

  faqItems = this.getFaqItems();

  private getFaqItems() {
    return [
      {
        question: 'Does this work with business verification?',
        answer: 'Yes. Use the temp email when a business tool requests an address, and the verification email or code will appear in this inbox.'
      },
      {
        question: 'What if a vendor rejects the email?',
        answer: 'Generate a new inbox. Some vendors block certain domains, so refreshing for a different address usually fixes it.'
      },
      {
        question: 'Can I reopen the inbox later?',
        answer: 'Select "Save Inbox" to copy a shareable link. You can reopen that link on your phone or desktop while it stays active.'
      },
      {
        question: 'How long do emails stay available?',
        answer: 'Your temporary email and messages stay active for more than 2 months, giving you plenty of time to complete verifications and trials.'
      },
      {
        question: 'Is this safe for my main business accounts?',
        answer: 'Disposable inboxes are best for trials, testing, or temporary access. Keep your primary accounts tied to an email you own long term.'
      },
      {
        question: 'Do I need to register to use this?',
        answer: 'No account required. Just open the page, copy the email, and use it immediately.'
      }
    ];
  }
}
