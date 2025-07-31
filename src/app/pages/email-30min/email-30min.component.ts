import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { QuickEmailComponent } from '../../compoents/quick-email/quick-email.component';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { MetaService } from '../../services/meta.service';
import { Title, Meta } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-email-30min',
    standalone: true,
    imports: [QuickEmailComponent, LucideAngularModule],
    template: `
  <main class="container mx-auto px-4 py-6 max-w-5xl">

  <!-- Page Header -->
<header class="mb-2 text-center">
  <h1 class="text-xl font-semibold text-gray-900 mb-3">
    30-Minute Temporary Email – Extended Disposable Inbox
  </h1>
  <p class="text-sm text-gray-600 mb-2">
    Get a <strong>30-minute temporary email address</strong> for longer processes like account setups, multi-step verifications, and extended communications. Perfect when you need more time than standard temporary emails offer.
  </p>
</header>

  <!-- App Component Placeholder -->
  <section class="mb-2">
    <app-quick-email [pageTimeCount]="30"></app-quick-email>
  </section>

  <!-- About Section -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-2">
    <h2 class="text-lg font-semibold text-gray-900 mb-2">What is a 30-Minute Temporary Email?</h2>
    <div class="text-sm text-gray-600 space-y-4">
      <p>
        A <strong>30-minute temporary email</strong> is an extended disposable inbox that remains active for half an hour. It's perfect for complex sign-up processes, multi-step verifications, and situations where you need more time to complete your tasks.
      </p>
      <p>
        This extended timeframe makes it ideal for account activations that involve multiple confirmation steps, downloading large files, or completing lengthy registration processes without rushing.
      </p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Extended 30-minute lifespan for complex processes</li>
        <li>Perfect for multi-step verifications and account setups</li>
        <li>Completely anonymous and secure</li>
        <li>Receive confirmations, OTPs, and attachments safely</li>
      </ul>
    </div>
  </section>

  <!-- Features -->
  <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
    <div class="bg-gray-50 p-3 rounded border border-gray-200">
      <div class="flex items-center gap-2 mb-1">
        <lucide-icon name="clock" [size]="16" class="text-blue-500"></lucide-icon>
        <h3 class="font-medium text-gray-900 text-sm">Extended 30-Minute Window</h3>
      </div>
      <p class="text-xs text-gray-600">More time for complex processes while maintaining privacy and security.</p>
    </div>
    <div class="bg-gray-50 p-3 rounded border border-gray-200">
      <div class="flex items-center gap-2 mb-1">
        <lucide-icon name="user" [size]="16" class="text-green-500"></lucide-icon>
        <h3 class="font-medium text-gray-900 text-sm">No Registration Needed</h3>
      </div>
      <p class="text-xs text-gray-600">Instant access without any personal information or account creation.</p>
    </div>
    <div class="bg-gray-50 p-3 rounded border border-gray-200">
      <div class="flex items-center gap-2 mb-1">
        <lucide-icon name="shield" [size]="16" class="text-purple-500"></lucide-icon>
        <h3 class="font-medium text-gray-900 text-sm">Complete Privacy</h3>
      </div>
      <p class="text-xs text-gray-600">All data is automatically deleted after 30 minutes with no traces left behind.</p>
    </div>
  </section>

  <!-- How It Works -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-10">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">How to Use a 30-Minute Temporary Email</h2>
    <ol class="space-y-2 text-sm text-gray-600 md:pl-8">
      <li class="flex items-start">
        <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
        <span>Get your free 30-minute temporary email address instantly upon visiting.</span>
      </li>
      <li class="flex items-start">
        <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
        <span>Use it for extended sign-up processes, account verifications, or multi-step registrations.</span>
      </li>
      <li class="flex items-start">
        <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
        <span>Monitor your inbox with automatic refreshes every 10 seconds for incoming messages.</span>
      </li>
      <li class="flex items-start">
        <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
        <span>Complete your tasks within 30 minutes before the inbox automatically expires.</span>
      </li>
    </ol>
  </section>

  <!-- Use Cases -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-10">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Perfect Use Cases for 30-Minute Email</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 class="font-medium text-gray-900 mb-2">Extended Processes</h3>
        <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Complex account registrations</li>
          <li>Multi-step verification processes</li>
          <li>Software trials with multiple confirmations</li>
          <li>Educational platform sign-ups</li>
        </ul>
      </div>
      <div>
        <h3 class="font-medium text-gray-900 mb-2">Business & Professional</h3>
        <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>B2B service trials</li>
          <li>Professional tool evaluations</li>
          <li>Conference and webinar registrations</li>
          <li>Extended download processes</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-10">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">30-Minute Temporary Email – FAQs</h2>
    <div class="space-y-4 text-sm text-gray-600">

      <div class="pb-4 border-b border-gray-100">
        <h3 class="text-base font-medium text-gray-800">What is a 30-minute temporary email?</h3>
        <p class="mt-2">
          It's an extended disposable email address that stays active for 30 minutes, perfect for longer processes that need more time than standard temporary emails.
          Need shorter options? Try our 
          <a href="/10-minutes-temporary-email" class="text-blue-500 hover:underline">10-minute email</a> or 
          <a href="/20-minutes-temporary-email" class="text-blue-500 hover:underline">20-minute email</a>.
        </p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 class="text-base font-medium text-gray-800">Is it completely free?</h3>
        <p class="mt-2">Yes, it's 100% free with no hidden costs, registration requirements, or premium features.</p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 class="text-base font-medium text-gray-800">Can I use it for business registrations?</h3>
        <p class="mt-2">Absolutely. The 30-minute window is perfect for business tool trials, B2B service sign-ups, and professional platform evaluations.</p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 class="text-base font-medium text-gray-800">What happens after 30 minutes?</h3>
        <p class="mt-2">The email address and all received messages are permanently deleted. No data is retained or recoverable.</p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 class="text-base font-medium text-gray-800">Can I extend the 30-minute timer?</h3>
        <p class="mt-2">Yes, you can reset the timer by clicking the "Reset" button to get another full 30 minutes.</p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 class="text-base font-medium text-gray-800">Is my privacy protected?</h3>
        <p class="mt-2">Completely. We don't track, store, or log any personal information. Your anonymity is guaranteed.</p>
      </div>

      <div class="pb-4 border-b border-gray-100">
        <h3 class="text-base font-medium text-gray-800">How many emails can I receive?</h3>
        <p class="mt-2">There's no limit on the number of emails you can receive within the 30-minute window.</p>
      </div>

    </div>
  </section>

</main>
  `

})
export class Email30MinComponent implements OnInit {
    private structuredDataScript?: HTMLScriptElement;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private scrollService: ScrollService,
        private metaService: MetaService,
        private title: Title,
        private meta: Meta
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.scrollService.scrollToTopInstant();
        }

        const pageTitle = '30-Minute Temporary Email - Free Disposable Inbox | TempMail4U';
        const pageDescription = 'Free 30-minute temp mail for secure sign-ups, multi-step verification, and business use. Instant access, no signup needed.';
        const canonicalUrl = 'https://tempmail4u.com/30-minutes-temporary-email';

        this.title.setTitle(pageTitle);

        // Basic SEO meta tags
        this.meta.updateTag({ name: 'description', content: pageDescription });
        this.meta.updateTag({
            name: 'keywords',
            content: '30 minute email, extended temporary email, disposable inbox, temp mail, burner email, business email verification, long term temp email, 30 min email'
        });

        // Open Graph (Facebook / LinkedIn)
        this.meta.updateTag({ property: 'og:title', content: pageTitle });
        this.meta.updateTag({ property: 'og:description', content: pageDescription });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
        this.meta.updateTag({ property: 'og:site_name', content: 'TempMail4U' });
        this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
        this.meta.updateTag({ property: 'og:image', content: 'https://tempmail4u.com/assets/images/30-minute-email-preview.jpg' });
        this.meta.updateTag({ property: 'og:image:width', content: '1200' });
        this.meta.updateTag({ property: 'og:image:height', content: '630' });
        this.meta.updateTag({ property: 'og:image:alt', content: '30 Minute Temporary Email Service' });

        // Twitter Card
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
        this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
        this.meta.updateTag({ name: 'twitter:site', content: '@TempMail4U' });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://tempmail4u.com/assets/images/30-minute-email-preview.jpg' });

        // Canonical tag
        this.meta.updateTag({ rel: 'canonical', href: canonicalUrl });

        // Other standard meta tags
        this.meta.updateTag({ name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });
        this.meta.updateTag({ name: 'author', content: 'TempMail4U' });
        this.meta.updateTag({ name: 'language', content: 'English' });
        this.meta.updateTag({ name: 'revisit-after', content: '7 days' });
        this.meta.updateTag({ name: 'distribution', content: 'global' });
        this.meta.updateTag({ name: 'rating', content: 'general' });

    }
}