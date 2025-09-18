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
  template: `
    <main class="container mx-auto px-4  md:py-5 max-w-5xl">


    <!-- Page Header (card-like hero) -->
    <header class="text-center mb-6 md:mb-0">
      <div class=" bg-white p-5 pb-0 md:p-7 ">
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3" i18n="@@email20min.title">
          20 Minute Temporary Email
        </h1>
        <p class="mx-auto max-w-3xl text-sm md:text-base text-gray-600" i18n="@@email20min.subtitle">
  Generate a <strong>20-minute temporary email address</strong> instantly for sign-ups, OTPs, and multi-step verifications. Enjoy a secure, private inbox with no registration and no spam.
         
        </p>
      </div>
    </header>

    <!-- App Component Placeholder -->
    <section class="mb-6">
      <div class="rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 ">
        <app-quick-email [pageTimeCount]="20"></app-quick-email>
      </div>
    </section>

    <!-- FAQ Section (homepage-style accordion) -->
    <section class="bg-white rounded-2xl ring-1 ring-gray-200 p-5 md:p-7 shadow-sm mb-4" id="faq">
      <h2 i18n="@@email20min.faqTitle" class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        20 Minute Temporary Email – FAQs
      </h2>

      <div class="divide-y divide-gray-200">

        <!-- Q1 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email20min.faq1Question">What is a 20 minute temporary email?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email20min.faq1Answer" class="mt-2 text-sm md:text-base text-gray-700">
              It’s a disposable email address that stays active for 20 minutes. Use it to receive messages without using your personal inbox.
              Need different durations? Try our 
              <a [routerLink]="routes.email10min" class="text-blue-600 hover:underline">10-minute email</a> or
              <a [routerLink]="routes.email30min" class="text-blue-600 hover:underline">30-minute email</a>.
            </p>
          </details>
        </div>

        <!-- Q2 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email20min.faq2Question">Is it really free?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email20min.faq2Answer" class="mt-2 text-sm md:text-base text-gray-700">
              Yes, it's 100% free to use. No registration or payment needed.
            </p>
          </details>
        </div>

        <!-- Q3 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email20min.faq3Question">Can I use it to receive OTPs and verification emails?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email20min.faq3Answer" class="mt-2 text-sm md:text-base text-gray-700">
              Yes. You can receive one-time passwords, activation links, and other verification emails safely.
            </p>
          </details>
        </div>

        <!-- Q4 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email20min.faq4Question">Will the email address delete itself?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email20min.faq4Answer" class="mt-2 text-sm md:text-base text-gray-700">
              Yes. All emails and the inbox itself are automatically deleted after 20 minutes.
            </p>
          </details>
        </div>

        <!-- Q5 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email20min.faq5Question">Is my identity protected?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email20min.faq5Answer" class="mt-2 text-sm md:text-base text-gray-700">
              Absolutely. We do not track or store any personal information. Your privacy is our priority.
            </p>
          </details>
        </div>

      </div>
    </section>

  </main>
  `
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
}
