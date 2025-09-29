import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, LOCALE_ID, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { ScrollService } from '../../services/scroll.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-discord-temp-email',
  standalone: true,
  imports: [MainTempMail, RouterModule],
  templateUrl: './discord-temp-email.html'
})
export class DiscordTempEmail {
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
    const pagePath = '/temporary-email-for-discord';
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
        { name: 'Temporary Email for Discord', url: baseUrl + pagePath }
      ],
      faq: this.getFaqItems()
    });
  }

  private getSeoContent() {
    return {
      title: 'Temporary Email for Discord | Verify Accounts Without Spam',
      description: 'Get a temporary email for Discord to verify accounts, reset passwords, and test bots without cluttering your main inbox.',
      keywords: 'temporary email for discord, discord temp mail, discord verification email'
    };
  }

  private getFaqItems() {
    return [
      {
        question: 'Can I join Discord with a temporary email?',
        answer: 'Yes. Enter the temporary address during signup and copy the code from the inbox before the timer ends.'
      },
      {
        question: 'Does Discord block temporary domains?',
        answer: 'Most emails are delivered. If nothing shows up, refresh the inbox or tap New Email and request the code again.'
      },
      {
        question: 'Can I reuse the same inbox?',
        answer: 'You can while the countdown is active. Save the link or bookmark the page to revisit it later.'
      },
      {
        question: 'Is this inbox private?',
        answer: 'We do not ask for personal info and the inbox clears itself. Avoid sharing anything that must stay stored long term.'
      }
    ];
  }
}


