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
  <main class="container mx-auto px-4 py-6 max-w-5xl">

  <!-- Page Header -->
<header class="mb-2 text-center">
  <h1 class="text-xl font-semibold text-gray-900 mb-3" i18n="@@email30min.title">
    30-Minute Temporary Email – Free Disposable Inbox
  </h1>
  <p class="text-sm text-gray-600 mb-2" i18n="@@email30min.subtitle">
    Get a <strong>30-minute temporary email address</strong> for longer processes like account setups, multi-step verifications, and extended communications. Perfect when you need more time than standard temporary emails offer.
  </p>
</header>

  <!-- App Component Placeholder -->
  <section class="mb-2">
    <app-quick-email [pageTimeCount]="30"></app-quick-email>
  </section>

  <!-- About Section -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-2">
    <h2 class="text-lg font-semibold text-gray-900 mb-2" i18n="@@email30min.whatIsTitle">What is a 30-Minute Temporary Email?</h2>
    <div class="text-sm text-gray-600 space-y-4">
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
  <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
    <div class="bg-gray-50 p-3 rounded border border-gray-200">
      <div class="flex items-center gap-2 mb-1">
        <lucide-icon name="clock" [size]="16" class="text-blue-500"></lucide-icon>
        <h3 i18n="@@email30min.featureTitle1" class="font-medium text-gray-900 text-sm">Extended 30-Minute Window</h3>
      </div>
      <p i18n="@@email30min.featureDesc1" class="text-xs text-gray-600">More time for complex processes while maintaining privacy and security.</p>
    </div>
    <div class="bg-gray-50 p-3 rounded border border-gray-200">
      <div class="flex items-center gap-2 mb-1">
        <lucide-icon name="user" [size]="16" class="text-green-500"></lucide-icon>
        <h3 i18n="@@email30min.featureTitle2" class="font-medium text-gray-900 text-sm">No Registration Needed</h3>
      </div>
      <p i18n="@@email30min.featureDesc2" class="text-xs text-gray-600">Instant access without any personal information or account creation.</p>
    </div>
    <div class="bg-gray-50 p-3 rounded border border-gray-200">
      <div class="flex items-center gap-2 mb-1">
        <lucide-icon name="shield" [size]="16" class="text-purple-500"></lucide-icon>
        <h3 i18n="@@email30min.featureTitle3" class="font-medium text-gray-900 text-sm">Complete Privacy</h3>
      </div>
      <p i18n="@@email30min.featureDesc3" class="text-xs text-gray-600">All data is automatically deleted after 30 minutes with no traces left behind.</p>
    </div>
  </section>

  <!-- How It Works -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-10">
    <h2 i18n="@@email30min.howToUseTitle" class="text-lg font-semibold text-gray-900 mb-4">How to Use a 30-Minute Temporary Email</h2>
    <ol class="space-y-2 text-sm text-gray-600 md:pl-8">
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
  <section class="bg-white rounded-lg shadow-sm p-5 mb-10">
    <h2 i18n="@@email30min.useCasesTitle" class="text-lg font-semibold text-gray-900 mb-4">Perfect Use Cases for 30-Minute Email</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 i18n="@@email30min.extendedProcesses" class="font-medium text-gray-900 mb-2">Extended Processes</h3>
        <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li i18n="@@email30min.useCase1">Complex account registrations</li>
          <li i18n="@@email30min.useCase2">Multi-step verification processes</li>
          <li i18n="@@email30min.useCase3">Software trials with multiple confirmations</li>
          <li i18n="@@email30min.useCase4">Educational platform sign-ups</li>
        </ul>
      </div>
      <div>
        <h3 i18n="@@email30min.businessProfessional" class="font-medium text-gray-900 mb-2">Business & Professional</h3>
        <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li i18n="@@email30min.useCase5">B2B service trials</li>
          <li i18n="@@email30min.useCase6">Professional tool evaluations</li>
          <li i18n="@@email30min.useCase7">Conference and webinar registrations</li>
          <li i18n="@@email30min.useCase8">Extended download processes</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-10">
    <h2 i18n="@@email30min.faqTitle" class="text-lg font-semibold text-gray-900 mb-4">30-Minute Temporary Email – FAQs</h2>
    <div class="space-y-4 text-sm text-gray-600">

      <div class="pb-4 border-b border-gray-100">
        <h3 i18n="@@email30min.faq1Question" class="text-base font-medium text-gray-800">What is a 30-minute temporary email?</h3>
        <p i18n="@@email30min.faq1Answer" class="mt-2">
          It's an extended disposable email address that stays active for 30 minutes, perfect for longer processes that need more time than standard temporary emails.
          Need shorter options? Try our 
          <a [routerLink]="routes.email10min" class="text-blue-500 hover:underline"> 10-minute email</a> or 
          <a [routerLink]="routes.email20min" class="text-blue-500 hover:underline">20-minute email</a>.
        </p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 i18n="@@email30min.faq2Question" class="text-base font-medium text-gray-800">Is it completely free?</h3>
        <p i18n="@@email30min.faq2Answer" class="mt-2">Yes, it's 100% free with no hidden costs, registration requirements, or premium features.</p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 i18n="@@email30min.faq3Question" class="text-base font-medium text-gray-800">Can I use it for business registrations?</h3>
        <p i18n="@@email30min.faq3Answer" class="mt-2">Absolutely. The 30-minute window is perfect for business tool trials, B2B service sign-ups, and professional platform evaluations.</p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 i18n="@@email30min.faq4Question" class="text-base font-medium text-gray-800">What happens after 30 minutes?</h3>
        <p i18n="@@email30min.faq4Answer" class="mt-2">The email address and all received messages are permanently deleted. No data is retained or recoverable.</p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 i18n="@@email30min.faq5Question" class="text-base font-medium text-gray-800">Can I extend the 30-minute timer?</h3>
        <p i18n="@@email30min.faq5Answer" class="mt-2">Yes, you can reset the timer by clicking the "Reset" button to get another full 30 minutes.</p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 i18n="@@email30min.faq6Question" class="text-base font-medium text-gray-800">Is my privacy protected?</h3>
        <p i18n="@@email30min.faq6Answer" class="mt-2">Completely. We don't track, store, or log any personal information. Your anonymity is guaranteed.</p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 i18n="@@email30min.faq7Question" class="text-base font-medium text-gray-800">How many emails can I receive?</h3>
        <p i18n="@@email30min.faq7Answer" class="mt-2">There's no limit on the number of emails you can receive within the 30-minute window.</p>
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
    const translatedRoute = this.routeTranslation.getRoute('email-30min');
    
    this.seoService.updateSeoTags({
      title: seoContent.title,
      description: seoContent.description,
      keywords: seoContent.keywords,
      ogUrl: baseUrl + (translatedRoute ? '/' + translatedRoute : '/30-minutes-temporary-email'),
      ogImage: 'https://tempmails.online/assets/images/30-minute-email-preview.jpg',
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