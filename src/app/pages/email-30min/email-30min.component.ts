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
  selector: 'app-email-30min',
  standalone: true,
  imports: [QuickEmailComponent, LucideAngularModule, RouterModule],
  templateUrl: './email-30min.component.html',
})
export class Email30MinComponent implements OnInit {
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);
  private routeTranslation = inject(RouteTranslationService);

  get routes() {
    return {
      email10min: this.routeTranslation.getRoute('email-10min'),
      email20min: this.routeTranslation.getRoute('email-20min')
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
      ogUrl: baseUrl + (translatedRoute ? '/' + translatedRoute : '/30-minutes-temporary-email'),
      ogImage: 'https://tempmail4u.com/assets/images/30-minute-email-preview.jpg',
      ogSiteName: 'TempMail4u',
      twitterSite: '@tempmails',
      breadcrumbs: [
        { name: $localize`:@@seo.breadcrumbs.home:Home`, url: baseUrl + '/' },
        { name: $localize`:@@seo.email30min.titleShort:30 Minute Temporary Email – Free Disposable Inbox`, url: baseUrl + '/30-minutes-temporary-email' }
      ],
      faq: this.getFaqItems()
    });
  }

  private getLocalizedSeoContent() {
    return {
      title: $localize`:@@seo.email30min.title:30 Minute Temporary Email - Free Disposable Inbox | TempMail4u`,
      description: $localize`:@@seo.email30min.description:Free 30-minute temp mail for secure sign-ups, multi-step verification, and business use. Instant access, no signup needed.`,
      keywords: $localize`:@@seo.email30min.keywords:30 minute email, extended temporary email, disposable inbox, temp mail, burner email, business email verification, long term temp email, 30 min email`
    };
  }

  private getFaqItems() {
    return [
      {
        question: $localize`:@@seo.email30min.faq.q1:What is a 30 minute temporary email?`,
        answer: $localize`:@@seo.email30min.faq.a1:A 30 minute temporary email is an extended disposable inbox that remains active for half an hour.`
      },
      {
        question: $localize`:@@seo.email30min.faq.q2:Is it free to use?`,
        answer: $localize`:@@seo.email30min.faq.a2:Yes, it's completely free with no registration required.`
      },
      {
        question: $localize`:@@seo.email30min.faq.q3:Can I receive OTP and verification emails?`,
        answer: $localize`:@@seo.email30min.faq.a3:Yes, you can receive OTPs, activation links, and other verification emails safely.`
      },
      {
        question: $localize`:@@seo.email30min.faq.q4:What happens after 30 minutes?`,
        answer: $localize`:@@seo.email30min.faq.a4:The email address and all received messages are permanently deleted. No data is retained or recoverable.`
      },
      {
        question: $localize`:@@seo.email30min.faq.q5:Can I extend the 30-minute timer?`,
        answer: $localize`:@@seo.email30min.faq.a5:Yes, click Reset to get another full 30 minutes.`
      },
      {
        question: $localize`:@@seo.email30min.faq.q6:Is my privacy protected?`,
        answer: $localize`:@@seo.email30min.faq.a6:We don't track, store, or log any personal information.`
      },
      {
        question: $localize`:@@seo.email30min.faq.q7:How many emails can I receive?`,
        answer: $localize`:@@seo.email30min.faq.a7:There's no limit within the 30-minute window.`
      }
    ];
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
