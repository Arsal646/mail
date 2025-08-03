import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { QuickEmailComponent } from '../../compoents/quick-email/quick-email.component';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { MetaService } from '../../services/meta.service';
import { Title, Meta } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-email-20min',
  standalone: true,
  imports: [QuickEmailComponent, LucideAngularModule],
  template: `
  <main class="container mx-auto px-4 py-6 max-w-5xl">

  <!-- Page Header -->
<header class="mb-2 text-center">
  <h1 class="text-xl font-semibold text-gray-900 mb-3" i18n="@@email20min.title">
    20-Minute Temporary Email – free Disposable Inbox
  </h1>
  <p class="text-sm text-gray-600 mb-2" i18n="@@email20min.subtitle">
    Instantly generate a <strong>20-minute temporary email address</strong>,  ideal for sign-ups, OTPs, and multi-step verifications that take a bit more time. No registration, no spam, just a secure and private inbox that works when you need it.
  </p>
</header>


  <!-- App Component Placeholder -->
  <section class="mb-2">
    <app-quick-email [pageTimeCount]="20"></app-quick-email>
  </section>

  

  <section class="bg-white rounded-lg shadow-sm p-5 mb-10">
  <h2 i18n="@@email20min.faqTitle" class="text-lg font-semibold text-gray-900 mb-4">20-Minute Temporary Email – FAQs</h2>
  <div class="space-y-4 text-sm text-gray-600">

    <div class="pb-4 border-b border-gray-100">
      <h3 i18n="@@email20min.faq1Question" class="text-base font-medium text-gray-800">What is a 20-minute temporary email?</h3>
      <p i18n="@@email20min.faq1Answer" class="mt-2">
        It’s a disposable email address that stays active for 20 minutes. Use it to receive messages without using your personal inbox.
        Need different durations? Try our 
        <a href="/10-minutes-temporary-email" class="text-blue-500 hover:underline">10-minute email</a> or
        <a href="/30-minutes-temporary-email" class="text-blue-500 hover:underline">30-minute email</a>.
      </p>
    </div>

    <div class="pb-4 border-b border-gray-100">
      <h3 i18n="@@email20min.faq2Question" class="text-base font-medium text-gray-800">Is it really free?</h3>
      <p i18n="@@email20min.faq2Answer" class="mt-2">Yes, it's 100% free to use. No registration or payment needed.</p>
    </div>

    <div class="pb-4 border-b border-gray-100">
      <h3 i18n="@@email20min.faq3Question" class="text-base font-medium text-gray-800">Can I use it to receive OTPs and verification emails?</h3>
      <p i18n="@@email20min.faq3Answer" class="mt-2">Yes. You can receive one-time passwords, activation links, and other verification emails safely.</p>
    </div>

    <div class="pb-4 border-b border-gray-100">
      <h3 i18n="@@email20min.faq4Question" class="text-base font-medium text-gray-800">Will the email address delete itself?</h3>
      <p i18n="@@email20min.faq4Answer" class="mt-2">Yes. All emails and the inbox itself are automatically deleted after 20 minutes.</p>
    </div>

    <div class="pb-4 border-b border-gray-100">
      <h3 i18n="@@email20min.faq5Question" class="text-base font-medium text-gray-800">Is my identity protected?</h3>
      <p i18n="@@email20min.faq5Answer" class="mt-2">Absolutely. We do not track or store any personal information. Your privacy is our priority.</p>
    </div>

  </div>
</section>


  `

})
export class Email20MinComponent implements OnInit {
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

    const pageTitle = '20-Minute Temporary Email - Free Disposable Inbox | TempMail4U';
    const pageDescription = 'Get a free 20-minute temporary email address. No registration, no spam, just a secure disposable inbox for sign-ups, verifications, and one-time messages.';
    const canonicalUrl = 'https://tempmail4u.com/20-minutes-temporary-email';

    this.title.setTitle(pageTitle);

    // Basic SEO meta tags
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({
      name: 'keywords',
      content: '20 minute email, temporary email, disposable inbox, temp mail, burner email, secure temp email, free email for verification, 20 min email'
    });

    // Open Graph (Facebook / LinkedIn)
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:site_name', content: 'TempMail4U' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    this.meta.updateTag({ property: 'og:image', content: 'https://tempmail4u.com/assets/images/20-minute-email-preview.jpg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: '20 Minute Temporary Email Service' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
    this.meta.updateTag({ name: 'twitter:site', content: '@TempMail4U' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://tempmail4u.com/assets/images/20-minute-email-preview.jpg' });

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