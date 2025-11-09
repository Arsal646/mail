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
  selector: 'app-email-20min',
  standalone: true,
  imports: [QuickEmailComponent, LucideAngularModule, RouterModule],
  templateUrl: './email-20min.component.html',
})
export class Email20MinComponent implements OnInit {
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);
  private routeTranslation = inject(RouteTranslationService);

  get routes() {
    return {
      email10min: this.routeTranslation.getRoute('email-10min'),
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
    const translatedRoute = '';

    this.seoService.updateSeoTags({
      title: seoContent.title,
      description: seoContent.description,
      keywords: seoContent.keywords,
      ogUrl: baseUrl + (translatedRoute ? '/' + translatedRoute : '/20-minutes-temporary-email'),
      ogImage: 'https://tempmail4u.com/assets/images/20-minute-email-preview.jpg',
      ogSiteName: 'TempMail4u',
      twitterSite: '@tempmails',
      breadcrumbs: [
        { name: $localize`:@@seo.breadcrumbs.home:Home`, url: baseUrl + '/' },
        { name: $localize`:@@seo.email20min.titleShort:20 Minute Temporary Email – Free Disposable Inbox`, url: baseUrl + '/20-minutes-temporary-email' }
      ],
      faq: this.getFaqItems()
    });
  }

  private getLocalizedSeoContent() {
    return {
      title: $localize`:@@seo.email20min.title:20 Minute Temporary Email - Free Disposable Inbox | TempMail4u`,
      description: $localize`:@@seo.email20min.description:Get a free 20 minute temporary email address. No registration, no spam, just a secure disposable inbox for sign-ups, verifications, and one-time messages.`,
      keywords: $localize`:@@seo.email20min.keywords:20 minute email, temporary email, disposable inbox, temp mail, burner email, secure temp email, free email for verification, 20 min email`
    };
  }

  private getFaqItems() {
    return [
      {
        question: $localize`:@@seo.email20min.faq.q1:What is a 20 minute temporary email?`,
        answer: $localize`:@@seo.email20min.faq.a1:It's a disposable email address that stays active for 20 minutes. Use it to receive messages without using your personal inbox.`
      },
      {
        question: $localize`:@@seo.email20min.faq.q2:Is it really free?`,
        answer: $localize`:@@seo.email20min.faq.a2:Yes, it's 100% free to use. No registration or payment needed.`
      },
      {
        question: $localize`:@@seo.email20min.faq.q3:Can I use it to receive OTPs and verification emails?`,
        answer: $localize`:@@seo.email20min.faq.a3:Yes. You can receive one-time passwords, activation links, and other verification emails safely.`
      },
      {
        question: $localize`:@@seo.email20min.faq.q4:Will the email address delete itself?`,
        answer: $localize`:@@seo.email20min.faq.a4:Yes. All emails and the inbox itself are automatically deleted after 20 minutes.`
      },
      {
        question: $localize`:@@seo.email20min.faq.q5:Is my identity protected?`,
        answer: $localize`:@@seo.email20min.faq.a5:Absolutely. We do not track or store any personal information. Your privacy is our priority.`
      }
    ];
  }

    scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}
