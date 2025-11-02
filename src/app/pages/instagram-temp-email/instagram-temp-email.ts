import { CommonModule, isPlatformBrowser, NgFor } from '@angular/common';
import { Component, Inject, LOCALE_ID, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { ScrollService } from '../../services/scroll.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-instagram-temp-email',
  standalone: true,
  imports: [MainTempMail, RouterModule, NgFor, CommonModule],
  templateUrl: './instagram-temp-email.html'
})
export class InstagramTempEmail {
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
    const pagePath = '/temporary-email-for-instagram';
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
        { name: 'Temporary Email for Instagram', url: baseUrl + pagePath }
      ],
      faq: this.getFaqItems()
    });
  }

  private getSeoContent() {
    return {
      title: 'Instagram Temp Email - Instant Temporary Email for Instagram Verification',
      description: 'Create a temporary email for Instagram sign up or password resets. Protect your personal inbox while receiving Instagram verification codes in seconds.',
      keywords: 'instagram temp email, disposable email instagram, instagram otp, burner email, instagram verification code, temporary inbox, spam protection, instagram sign up, creator account, ig verification'
    };
  }

  faqItems = this.getFaqItems();

   getFaqItems() {
    return [
      {
        question: 'Will this work for Instagram sign up?',
        answer: 'Yes. Use the temp email during registration and the confirmation code will appear inside this inbox.'
      },
      {
        question: 'What if Instagram says the address is invalid?',
        answer: 'Try generating a new inbox. Some domains work better with Instagram than others, so a quick refresh usually fixes it.'
      },
      {
        question: 'Can I open this inbox on another device?',
        answer: 'Sure. Tap "Save Inbox" to get a shareable link that works on your phone, tablet, or desktop.'
      },
      {
        question: 'Can I reuse the same email later?',
        answer: 'Yes, as long as you keep the saved link. Otherwise, recycle a fresh address whenever you need another burner inbox.'
      },
      {
        question: 'Should I use this for my main Instagram account?',
        answer: 'Disposable emails are best for testing, backups, or throwaway accounts. Keep your primary profile tied to a real email you control.'
      },
      {
        question: 'What happens to emails once the timer ends?',
        answer: 'They are purged automatically for privacy. Save any codes you still need before the timer expires.'
      }
    ];
  }
}

