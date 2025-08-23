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
  template: `
  <main class="container mx-auto px-4 py-8 md:py-10 max-w-5xl">

    <!-- Page Header (card-like hero) -->
    <header class="text-center mb-6">
      <div class=" bg-white p-5 md:p-7 ">
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3" i18n="@@email30min.title">
          30-Minute Temporary Email – Free Disposable Inbox
        </h1>
        <p class="mx-auto max-w-3xl text-sm md:text-base text-gray-600" i18n="@@email30min.subtitle">
          Get a <strong>30-minute temporary email address</strong> for longer processes like account setups, multi-step verifications, and extended communications. Perfect when you need more time than standard temporary emails offer.
        </p>
      </div>
    </header>

    <!-- App Component Placeholder -->
    <section class="mb-6">
      <div class="rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 p-3 md:p-4">
        <app-quick-email [pageTimeCount]="30"></app-quick-email>
      </div>
    </section>

    <!-- About Section -->
    <section class="bg-white rounded-2xl ring-1 ring-gray-200 p-5 md:p-7 shadow-sm mb-6">
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3" i18n="@@email30min.whatIsTitle">What is a 30-Minute Temporary Email?</h2>
      <div class="text-sm md:text-base text-gray-700 space-y-4 leading-relaxed">
        <p i18n="@@email30min.description1">
          A <strong>30-minute temporary email</strong> is an extended disposable inbox that remains active for half an hour. It's perfect for complex sign-up processes, multi-step verifications, and situations where you need more time to complete your tasks.
        </p>
        <p i18n="@@email30min.description2">
          This extended timeframe makes it ideal for account activations that involve multiple confirmation steps, downloading large files, or completing lengthy registration processes without rushing.
        </p>
        <ul class="list-disc pl-5 space-y-2">
          <li i18n="@@email30min.feature1">Extended 30-minute lifespan for complex processes</li>
          <li i18n="@@email30min.feature2">Perfect for multi-step verifications and account setups</li>
          <li i18n="@@email30min.feature3">Completely anonymous and secure</li>
          <li i18n="@@email30min.feature4">Receive confirmations, OTPs, and attachments safely</li>
        </ul>
      </div>
    </section>

    <!-- Features -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="rounded-xl ring-1 ring-inset ring-gray-200 bg-gray-50 p-4">
        <div class="flex items-center gap-2 mb-1.5">
          <lucide-icon name="clock" [size]="16" class="text-blue-500"></lucide-icon>
          <h3 i18n="@@email30min.featureTitle1" class="font-semibold text-gray-900 text-sm">Extended 30-Minute Window</h3>
        </div>
        <p i18n="@@email30min.featureDesc1" class="text-xs md:text-sm text-gray-600">More time for complex processes while maintaining privacy and security.</p>
      </div>

      <div class="rounded-xl ring-1 ring-inset ring-gray-200 bg-gray-50 p-4">
        <div class="flex items-center gap-2 mb-1.5">
          <lucide-icon name="user" [size]="16" class="text-green-500"></lucide-icon>
          <h3 i18n="@@email30min.featureTitle2" class="font-semibold text-gray-900 text-sm">No Registration Needed</h3>
        </div>
        <p i18n="@@email30min.featureDesc2" class="text-xs md:text-sm text-gray-600">Instant access without any personal information or account creation.</p>
      </div>

      <div class="rounded-xl ring-1 ring-inset ring-gray-200 bg-gray-50 p-4">
        <div class="flex items-center gap-2 mb-1.5">
          <lucide-icon name="shield" [size]="16" class="text-purple-500"></lucide-icon>
          <h3 i18n="@@email30min.featureTitle3" class="font-semibold text-gray-900 text-sm">Complete Privacy</h3>
        </div>
        <p i18n="@@email30min.featureDesc3" class="text-xs md:text-sm text-gray-600">All data is automatically deleted after 30 minutes with no traces left behind.</p>
      </div>
    </section>

    <!-- How It Works -->
    <section class="bg-white rounded-2xl ring-1 ring-gray-200 p-5 md:p-7 shadow-sm mb-8">
      <h2 i18n="@@email30min.howToUseTitle" class="text-xl md:text-2xl font-bold text-gray-900 mb-4">How to Use a 30-Minute Temporary Email</h2>
      <ol class="space-y-2 text-sm md:text-base text-gray-700 md:pl-8">
        <li i18n="@@email30min.step1" class="flex items-start">
          <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
          <span>Get your free 30-minute temporary email address instantly upon visiting.</span>
        </li>
        <li i18n="@@email30min.step2" class="flex items-start">
          <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
          <span>Use it for extended sign-up processes, account verifications, or multi-step registrations.</span>
        </li>
        <li i18n="@@email30min.step3" class="flex items-start">
          <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
          <span>Monitor your inbox with automatic refreshes every 10 seconds for incoming messages.</span>
        </li>
        <li i18n="@@email30min.step4" class="flex items-start">
          <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
          <span>Complete your tasks within 30 minutes before the inbox automatically expires.</span>
        </li>
      </ol>
    </section>

    <!-- Use Cases -->
    <section class="bg-white rounded-2xl ring-1 ring-gray-200 p-5 md:p-7 shadow-sm mb-10">
      <h2 i18n="@@email30min.useCasesTitle" class="text-xl md:text-2xl font-bold text-gray-900 mb-4">Perfect Use Cases for 30-Minute Email</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 i18n="@@email30min.extendedProcesses" class="font-medium text-gray-900 mb-2">Extended Processes</h3>
          <ul class="list-disc pl-5 text-sm md:text-base text-gray-700 space-y-1">
            <li i18n="@@email30min.useCase1">Complex account registrations</li>
            <li i18n="@@email30min.useCase2">Multi-step verification processes</li>
            <li i18n="@@email30min.useCase3">Software trials with multiple confirmations</li>
            <li i18n="@@email30min.useCase4">Educational platform sign-ups</li>
          </ul>
        </div>
        <div>
          <h3 i18n="@@email30min.businessProfessional" class="font-medium text-gray-900 mb-2">Business & Professional</h3>
          <ul class="list-disc pl-5 text-sm md:text-base text-gray-700 space-y-1">
            <li i18n="@@email30min.useCase5">B2B service trials</li>
            <li i18n="@@email30min.useCase6">Professional tool evaluations</li>
            <li i18n="@@email30min.useCase7">Conference and webinar registrations</li>
            <li i18n="@@email30min.useCase8">Extended download processes</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ Section (homepage-style accordion) -->
    <section class="bg-white rounded-2xl ring-1 ring-gray-200 p-5 md:p-7 shadow-sm mb-4" id="faq">
      <h2 i18n="@@email30min.faqTitle" class="text-xl md:text-2xl font-bold text-gray-900 mb-4">30-Minute Temporary Email – FAQs</h2>

      <div class="divide-y divide-gray-200">

        <!-- Q1 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email30min.faq1Question">What is a 30-minute temporary email?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email30min.faq1Answer" class="mt-2 text-sm md:text-base text-gray-700">
              It's an extended disposable email address that stays active for 30 minutes, perfect for longer processes that need more time than standard temporary emails.
              Need shorter options? Try our 
              <a [routerLink]="routes.email10min" class="text-blue-600 hover:underline"> 10-minute email</a> or 
              <a [routerLink]="routes.email20min" class="text-blue-600 hover:underline">20-minute email</a>.
            </p>
          </details>
        </div>

        <!-- Q2 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email30min.faq2Question">Is it completely free?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email30min.faq2Answer" class="mt-2 text-sm md:text-base text-gray-700">Yes, it's 100% free with no hidden costs, registration requirements, or premium features.</p>
          </details>
        </div>

        <!-- Q3 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email30min.faq3Question">Can I use it for business registrations?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email30min.faq3Answer" class="mt-2 text-sm md:text-base text-gray-700">Absolutely. The 30-minute window is perfect for business tool trials, B2B service sign-ups, and professional platform evaluations.</p>
          </details>
        </div>

        <!-- Q4 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email30min.faq4Question">What happens after 30 minutes?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email30min.faq4Answer" class="mt-2 text-sm md:text-base text-gray-700">The email address and all received messages are permanently deleted. No data is retained or recoverable.</p>
          </details>
        </div>

        <!-- Q5 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email30min.faq5Question">Can I extend the 30-minute timer?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email30min.faq5Answer" class="mt-2 text-sm md:text-base text-gray-700">Yes, you can reset the timer by clicking the "Reset" button to get another full 30 minutes.</p>
          </details>
        </div>

        <!-- Q6 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email30min.faq6Question">Is my privacy protected?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email30min.faq6Answer" class="mt-2 text-sm md:text-base text-gray-700">Completely. We don't track, store, or log any personal information. Your anonymity is guaranteed.</p>
          </details>
        </div>

        <!-- Q7 -->
        <div class="py-3">
          <details class="group">
            <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
              <span i18n="@@email30min.faq7Question">How many emails can I receive?</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-4 w-4 transition-transform group-open:rotate-180"
                   viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
              </svg>
            </summary>
            <p i18n="@@email30min.faq7Answer" class="mt-2 text-sm md:text-base text-gray-700">There's no limit on the number of emails you can receive within the 30-minute window.</p>
          </details>
        </div>

      </div>
    </section>

  </main>
  `
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
      twitterSite: '@tempmails'
    });
  }

  private getLocalizedSeoContent() {
    return {
      title: $localize`:@@seo.email30min.title:30-Minute Temporary Email - Free Disposable Inbox | TempMail4u`,
      description: $localize`:@@seo.email30min.description:Free 30-minute temp mail for secure sign-ups, multi-step verification, and business use. Instant access, no signup needed.`,
      keywords: $localize`:@@seo.email30min.keywords:30 minute email, extended temporary email, disposable inbox, temp mail, burner email, business email verification, long term temp email, 30 min email`
    };
  }
}
