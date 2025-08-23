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
  selector: 'app-email-10min',
  standalone: true,
  imports: [QuickEmailComponent, LucideAngularModule, RouterModule],
  template: `
  <main class="container mx-auto px-4 py-8 md:py-10 max-w-5xl">

    <!-- Page Header (card-like hero) -->
    <header class="text-center mb-6">
      <div class=" bg-white p-5 md:p-7 ">
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3" i18n="@@email10minTitle">
          10 Minutes Temporary Email – Free Disposable Inbox Without Signup
        </h1>
        <p class="mx-auto max-w-3xl text-sm md:text-base text-gray-600" i18n="@@email10minSubtitle">
          Instantly generate a <strong>10 minutes temporary email address</strong>. Perfect for email verifications, OTPs, and anonymous sign-ups without exposing your personal inbox.
        </p>
      </div>
    </header>

    <!-- App Component Placeholder -->
    <section class="mb-6">
      <div class="rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 p-3 md:p-4">
        <app-quick-email [pageTimeCount]="10"></app-quick-email>
      </div>
    </section>

    <!-- About Section -->
    <section class="bg-white rounded-2xl ring-1 ring-gray-200 p-5 md:p-7 shadow-sm mb-6">
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3" i18n="@@whatIs10minEmail">What is a 10 Minutes Temporary Email?</h2>
      <div class="text-sm md:text-base text-gray-700 space-y-4 leading-relaxed">
        <p i18n="@@10minEmailDesc1">
          A <strong>10 minutes temporary email</strong> is a disposable, anonymous inbox that lasts only 10 minutes. It's ideal for one-time registrations, email confirmations, downloading files, and avoiding spam.
        </p>
        <p i18n="@@10minEmailDesc2">
          No sign-up or personal data is required, making it the safest way to stay anonymous online. Use it as a throwaway email whenever you need a quick, secure inbox.
        </p>
        <ul class="list-disc pl-5 space-y-2">
          <li i18n="@@feature1">Automatically expires after 10 minutes</li>
          <li i18n="@@feature2">Completely anonymous and untraceable</li>
          <li i18n="@@feature3">Receive OTPs, confirmations, and attachments securely</li>
        </ul>
      </div>
    </section>

    <!-- Features -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="rounded-xl ring-1 ring-inset ring-gray-200 bg-gray-50 p-4">
        <div class="flex items-center gap-2 mb-1.5">
          <lucide-icon name="clock" [size]="16" class="text-blue-500"></lucide-icon>
          <h3 class="font-semibold text-gray-900 text-sm" i18n="@@featureTitle1">Self-Destructing Inboxes</h3>
        </div>
        <p class="text-xs md:text-sm text-gray-600" i18n="@@featureDesc1">All messages are automatically deleted after 10 minutes to protect your privacy.</p>
      </div>

      <div class="rounded-xl ring-1 ring-inset ring-gray-200 bg-gray-50 p-4">
        <div class="flex items-center gap-2 mb-1.5">
          <lucide-icon name="user" [size]="16" class="text-green-500"></lucide-icon>
          <h3 class="font-semibold text-gray-900 text-sm" i18n="@@featureTitle2">No Sign-Up Required</h3>
        </div>
        <p class="text-xs md:text-sm text-gray-600" i18n="@@featureDesc2">Simply visit the page to start — no login, no password, no hassle.</p>
      </div>

      <div class="rounded-xl ring-1 ring-inset ring-gray-200 bg-gray-50 p-4">
        <div class="flex items-center gap-2 mb-1.5">
          <lucide-icon name="shield" [size]="16" class="text-purple-500"></lucide-icon>
          <h3 class="font-semibold text-gray-900 text-sm" i18n="@@featureTitle3">Anonymous & Secure</h3>
        </div>
        <p class="text-xs md:text-sm text-gray-600" i18n="@@featureDesc3">We don't store or log any user data; all inboxes are wiped clean after use.</p>
      </div>
    </section>

    <!-- How It Works -->
    <section class="bg-white rounded-2xl ring-1 ring-gray-200 p-5 md:p-7 shadow-sm mb-8">
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4" i18n="@@howToUseTitle">How to Use a 10 Minutes Temporary Email</h2>
      <ol class="space-y-2 text-sm md:text-base text-gray-700 md:pl-8">
        <li class="flex items-start" i18n="@@step1">
          <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
          <span>Visit our site to instantly receive a free temporary inbox.</span>
        </li>
        <li class="flex items-start" i18n="@@step2">
          <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
          <span>Copy your 10 minutes temporary email address and use it for registrations or verifications.</span>
        </li>
        <li class="flex items-start" i18n="@@step3">
          <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
          <span>Receive OTPs or confirmation emails instantly — inbox refreshes every 10 seconds.</span>
        </li>
        <li class="flex items-start" i18n="@@step4">
          <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
          <span>All data is permanently deleted after 10 minutes for maximum privacy.</span>
        </li>
      </ol>
    </section>

    <!-- Use Cases -->
    <section class="bg-white rounded-2xl ring-1 ring-gray-200 p-5 md:p-7 shadow-sm mb-10">
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4" i18n="@@useCasesTitle">When to Use a Disposable Email Address</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 class="font-medium text-gray-900 mb-2" i18n="@@techUseCases">Tech & Testing</h3>
          <ul class="list-disc pl-5 text-sm md:text-base text-gray-700 space-y-1">
            <li i18n="@@techUseCase1">Testing sign-up flows</li>
            <li i18n="@@techUseCase2">Previewing email templates</li>
            <li i18n="@@techUseCase3">Debugging email APIs</li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium text-gray-900 mb-2" i18n="@@privacyUseCases">Privacy & Productivity</h3>
          <ul class="list-disc pl-5 text-sm md:text-base text-gray-700 space-y-1">
            <li i18n="@@privacyUseCase1">Avoid spam from new websites</li>
            <li i18n="@@privacyUseCase2">Access gated content securely</li>
            <li i18n="@@privacyUseCase3">Download software & resources</li>
            <li i18n="@@privacyUseCase4">Anonymous sign-ups for forums</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
  
   <!-- FAQ Section (homepage-style accordion) -->
<section class="bg-white rounded-2xl ring-1 ring-gray-200 p-5 md:p-7 shadow-sm mb-4" id="faq">
  <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center" i18n="@@faqTitle">
    Frequently Asked Questions
  </h2>

  <div class="divide-y divide-gray-200">

    <!-- Q1 -->
    <div class="py-3">
      <details class="group">
        <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
          <span i18n="@@faq1Question">What is a 10 minutes email?</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 transition-transform group-open:rotate-180"
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
          </svg>
        </summary>
        <p class="mt-2 text-sm md:text-base text-gray-700" i18n="@@faq1Answer">
          A temporary email address that expires after 10 minutes, perfect for receiving one-time messages or verification links.
          Need more time? Try our free
          <a [routerLink]="routes.email20min" class="text-blue-600 hover:underline">20-minute temporary email</a> or
          <a [routerLink]="routes.email30min" class="text-blue-600 hover:underline">30-minute temporary email</a> instead.
        </p>
      </details>
    </div>

    <!-- Q2 -->
    <div class="py-3">
      <details class="group">
        <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
          <span i18n="@@faq2Question">Is it free to use?</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 transition-transform group-open:rotate-180"
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
          </svg>
        </summary>
        <p class="mt-2 text-sm md:text-base text-gray-700" i18n="@@faq2Answer">
          Yes, it's completely free. No sign-up needed, no ads, and no premium charges.
        </p>
      </details>
    </div>

    <!-- Q3 -->
    <div class="py-3">
      <details class="group">
        <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
          <span i18n="@@faq3Question">Can I receive OTPs and confirmation emails?</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 transition-transform group-open:rotate-180"
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
          </svg>
        </summary>
        <p class="mt-2 text-sm md:text-base text-gray-700" i18n="@@faq3Answer">
          Yes, the temporary inbox supports all common email types including OTPs and confirmation links.
        </p>
      </details>
    </div>

    <!-- Q4 -->
    <div class="py-3">
      <details class="group">
        <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
          <span i18n="@@faq4Question">Can I extend the timer for my temporary email?</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 transition-transform group-open:rotate-180"
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
          </svg>
        </summary>
        <p class="mt-2 text-sm md:text-base text-gray-700" i18n="@@faq4Answer">
          Yes, simply click the "Reset" button to restart the 10-minute countdown.
        </p>
      </details>
    </div>

    <!-- Q5 -->
    <div class="py-3">
      <details class="group">
        <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
          <span i18n="@@faq5Question">Is this email address truly anonymous?</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 transition-transform group-open:rotate-180"
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
          </svg>
        </summary>
        <p class="mt-2 text-sm md:text-base text-gray-700" i18n="@@faq5Answer">
          Absolutely. We do not collect or track any personal data; every inbox is temporary and private.
        </p>
      </details>
    </div>

    <!-- Q6 -->
    <div class="py-3">
      <details class="group">
        <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
          <span i18n="@@faq6Question">How many temporary emails can I create?</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 transition-transform group-open:rotate-180"
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
          </svg>
        </summary>
        <p class="mt-2 text-sm md:text-base text-gray-700" i18n="@@faq6Answer">
          Unlimited. Create as many temporary inboxes as you want, each with its own time limit.
        </p>
      </details>
    </div>

    <!-- Q7 -->
    <div class="py-3">
      <details class="group">
        <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
          <span i18n="@@faq7Question">Does it work on mobile?</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 transition-transform group-open:rotate-180"
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
          </svg>
        </summary>
        <p class="mt-2 text-sm md:text-base text-gray-700" i18n="@@faq7Answer">
          Yes, the service is fully responsive and works seamlessly on all devices.
        </p>
      </details>
    </div>

    <!-- Q8 -->
    <div class="py-3">
      <details class="group">
        <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
          <span i18n="@@faq8Question">Is it safe for important messages?</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 transition-transform group-open:rotate-180"
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
          </svg>
        </summary>
        <p class="mt-2 text-sm md:text-base text-gray-700" i18n="@@faq8Answer">
          It's suitable for short-term use like OTPs and confirmation emails. Avoid using it for sensitive personal information.
        </p>
      </details>
    </div>

    <!-- Q9 -->
    <div class="py-3">
      <details class="group">
        <summary class="flex cursor-pointer items-center justify-between text-left font-medium text-gray-900">
          <span i18n="@@faq9Question">Is it better than using a fake email?</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 transition-transform group-open:rotate-180"
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
          </svg>
        </summary>
        <p class="mt-2 text-sm md:text-base text-gray-700" i18n="@@faq9Answer">
          Yes! Unlike fake emails, this service provides a real, functioning inbox for legitimate message receipt.
        </p>
      </details>
    </div>

  </div>
</section>


  </main>
  `
})
export class Email10MinComponent implements OnInit {
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);
  private routeTranslation = inject(RouteTranslationService);

  get routes() {
    return {
      email20min: this.routeTranslation.getRoute('email-20min'),
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
    const translatedRoute = this.routeTranslation.getRoute('email-10min');

    this.seoService.updateSeoTags({
      title: seoContent.title,
      description: seoContent.description,
      keywords: seoContent.keywords,
      ogUrl: baseUrl + '/10-minutes-temporary-email',
      ogImage: 'https://tempmail4u.com/assets/images/10-minute-email-preview.jpg',
      ogSiteName: 'TempMail4u',
      twitterSite: '@tempmails'
    });
  }

  private getLocalizedSeoContent() {
    return {
      title: $localize`:@@seo.email10min.title:10-Minute Temporary Email - Free Disposable Inbox | TempMail4u`,
      description: $localize`:@@seo.email10min.description:Get a free 10-minute disposable email for instant verifications. No signup needed. Protect your privacy with our temporary self-destructing inbox.`,
      keywords: $localize`:@@seo.email10min.keywords:10 minute email, disposable email, temporary inbox, burner email, email verification, OTP email, privacy protection, spam prevention, anonymous email, quick email`
    };
  }
}
