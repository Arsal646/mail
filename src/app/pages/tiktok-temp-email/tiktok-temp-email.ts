import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, LOCALE_ID, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { ScrollService } from '../../services/scroll.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-tiktok-temp-email',
  standalone: true,
  imports: [MainTempMail, RouterModule],
  templateUrl: './tiktok-temp-email.html'
})
export class TiktokTempEmail {
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
    const pagePath = '/temporary-email-for-tiktok';
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
        { name: 'Temporary Email for TikTok', url: baseUrl + pagePath }
      ],
      faq: this.getFaqItems()
    });
  }

  private getSeoContent() {
    return {
      title: 'TikTok Temp Email - Free Temporary Email for TikTok Verification',
      description: 'Free temporary email for TikTok verification. Keep your personal inbox safe from spam while signing up for accounts. No registration required.',
      keywords: 'tiktok email, temp email tiktok, disposable email, tiktok verification, burner email, tiktok sign up, creator account, tiktok otp, temporary inbox, spam protection, tiktok business, fake email tiktok'
    };
  }

  private getFaqItems() {
    return [
      {
        question: 'Will this work for TikTok sign up?',
        answer:
          "Absolutely! Just copy the disposable address, paste it when TikTok asks for your email, and we'll catch the verification code for you."
      },
      {
        question: "What if TikTok doesn't accept the temporary email address?",
        answer:
          'No worries! Just click "New Email" to get a fresh address. Sometimes TikTok prefers certain address types, so trying a different one usually works.'
      },
      {
        question: 'Can I check my temporary inbox on another device?',
        answer:
          'Definitely! Click "Save Inbox" to get a special link you can open on your phone, tablet, or any other device.'
      },
      {
        question: 'Can I reuse the same it?',
        answer:
          'Yes, you can use it multiple times! Just make sure to save your inbox link so you can come back to it whenever needed.'
      },
      {
        question: 'Should I use this for my main TikTok account?',
        answer:
          'These disposable addresses are great for testing new accounts, but for your important main profile, we recommend using your real email.'
      },
      {
        question: 'What happens to my messages later?',
        answer:
          "They automatically disappear to keep everything private and clean. This means your temporary messages won't stick around forever."
      }
    ];
  }
}

