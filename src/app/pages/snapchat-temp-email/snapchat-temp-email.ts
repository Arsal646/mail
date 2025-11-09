import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, LOCALE_ID, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { ScrollService } from '../../services/scroll.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-snapchat-temp-email',
  standalone: true,
  imports: [MainTempMail, RouterModule, CommonModule],
  templateUrl: './snapchat-temp-email.html'
})
export class SnapchatTempEmail {
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
    const pagePath = '/temporary-email-for-snapchat';
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
        { name: 'Temporary Email for Snapchat', url: baseUrl + pagePath }
      ],
      faq: this.getFaqItems()
    });
  }

  private getSeoContent() {
    return {
      title: 'Snapchat Temp Email - Disposable Email for Snapchat Verification Codes',
      description: 'Create a temporary email for Snapchat sign up and OTPs. Get verification codes instantly without revealing your real inbox.',
      keywords: 'snapchat temp email, disposable email snapchat, snapchat verification code, snapchat otp, burner email snapchat, temporary inbox, spam protection, snapchat sign up'
    };
  }

  faqItems = this.getFaqItems();

  private getFaqItems() {
    return [
      {
        question: 'Does this work with Snapchat verification?',
        answer: 'Yes. Use the temp email when Snapchat requests an address, and the verification email or code will appear in this inbox.'
      },
      {
        question: 'What if Snapchat rejects the email?',
        answer: 'Generate a new inbox. Snapchat sometimes blocks a domain, so refreshing for a different address usually fixes it.'
      },
      {
        question: 'Can I reopen the inbox later?',
        answer: 'Select “Save Inbox” to copy a shareable link. You can reopen that link on your phone or desktop while it stays active.'
      },
      {
        question: 'Is this safe for my main Snapchat account?',
        answer: 'Disposable inboxes are best for backups, testing, or temporary logins. Keep your primary account tied to an email you own long term.'
      },
      {
        question: 'How long do emails stay available?',
        answer: 'Messages are cleared automatically when the countdown finishes. Save anything important before the timer ends.'
      },
      {
        question: 'Do I need to register to use this?',
        answer: 'No account required. Just open the page, copy the email, and use it immediately.'
      }
    ];
  }
}
