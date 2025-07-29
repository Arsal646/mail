import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { QuickEmailComponent } from '../../compoents/quick-email/quick-email.component';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { MetaService } from '../../services/meta.service';
import { Title, Meta } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-email-10min',
  standalone: true,
  imports: [QuickEmailComponent,LucideAngularModule],
  template:`
  <main class="container mx-auto px-4 py-6 max-w-5xl">

  <!-- Page Header -->
  <header class="mb-2 text-center">
    <h1 class="text-xl font-semibold text-gray-900 mb-3">
      10 Minutes Temporary Email – Free Disposable Inbox Without Signup
    </h1>
    <p class="text-sm text-gray-600 mb-2">
      Instantly generate a <strong>10 minutes temporary email address</strong>. Perfect for email verifications, OTPs, and anonymous sign-ups without exposing your personal inbox.
    </p>
  </header>

  <!-- App Component Placeholder -->
  <section class="mb-2">
    <app-quick-email [pageTimeCount]="10"></app-quick-email>
  </section>

  <!-- About Section -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-2">
    <h2 class="text-lg font-semibold text-gray-900 mb-2">What is a 10 Minutes Temporary Email?</h2>
    <div class="text-sm text-gray-600 space-y-4">
      <p>
        A <strong>10 minutes temporary email</strong> is a disposable, anonymous inbox that lasts only 10 minutes. It’s ideal for one-time registrations, email confirmations, downloading files, and avoiding spam.
      </p>
      <p>
        No sign-up or personal data is required, making it the safest way to stay anonymous online. Use it as a throwaway email whenever you need a quick, secure inbox.
      </p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Automatically expires after 10 minutes</li>
        <li>Completely anonymous and untraceable</li>
        <li>Receive OTPs, confirmations, and attachments securely</li>
      </ul>
    </div>
  </section>

  <!-- Features -->
  <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
    <div class="bg-gray-50 p-3 rounded border border-gray-200">
      <div class="flex items-center gap-2 mb-1">
        <lucide-icon name="clock" [size]="16" class="text-blue-500"></lucide-icon>
        <h3 class="font-medium text-gray-900 text-sm">Self-Destructing Inboxes</h3>
      </div>
      <p class="text-xs text-gray-600">All messages are automatically deleted after 10 minutes to protect your privacy.</p>
    </div>
    <div class="bg-gray-50 p-3 rounded border border-gray-200">
      <div class="flex items-center gap-2 mb-1">
        <lucide-icon name="user" [size]="16" class="text-green-500"></lucide-icon>
        <h3 class="font-medium text-gray-900 text-sm">No Sign-Up Required</h3>
      </div>
      <p class="text-xs text-gray-600">Simply visit the page to start — no login, no password, no hassle.</p>
    </div>
    <div class="bg-gray-50 p-3 rounded border border-gray-200">
      <div class="flex items-center gap-2 mb-1">
        <lucide-icon name="shield" [size]="16" class="text-purple-500"></lucide-icon>
        <h3 class="font-medium text-gray-900 text-sm">Anonymous & Secure</h3>
      </div>
      <p class="text-xs text-gray-600">We don’t store or log any user data; all inboxes are wiped clean after use.</p>
    </div>
  </section>

  <!-- How It Works -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-10">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">How to Use a 10 Minutes Temporary Email</h2>
    <ol class="space-y-2 text-sm text-gray-600 md:pl-8">
      <li class="flex items-start">
        <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
        <span>Visit our site to instantly receive a free temporary inbox.</span>
      </li>
      <li class="flex items-start">
        <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
        <span>Copy your 10 minutes temporary email address and use it for registrations or verifications.</span>
      </li>
      <li class="flex items-start">
        <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
        <span>Receive OTPs or confirmation emails instantly — inbox refreshes every 10 seconds.</span>
      </li>
      <li class="flex items-start">
        <lucide-icon name="circle" [size]="14" class="text-gray-400 mt-1 mr-2 flex-shrink-0"></lucide-icon>
        <span>All data is permanently deleted after 10 minutes for maximum privacy.</span>
      </li>
    </ol>
  </section>

  <!-- Use Cases -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-10">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">When to Use a Disposable Email Address</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 class="font-medium text-gray-900 mb-2">Tech & Testing</h3>
        <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Testing sign-up flows</li>
          <li>Previewing email templates</li>
          <li>Debugging email APIs</li>
        </ul>
      </div>
      <div>
        <h3 class="font-medium text-gray-900 mb-2">Privacy & Productivity</h3>
        <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Avoid spam from new websites</li>
          <li>Access gated content securely</li>
          <li>Download software & resources</li>
          <li>Anonymous sign-ups for forums</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="bg-white rounded-lg shadow-sm p-5 mb-10">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
    <div class="space-y-4 text-sm text-gray-600">
      <div>
        <h3 class="font-medium text-gray-900">What is a 10 minutes email?</h3>
        <p>A temporary email address that expires after 10 minutes, perfect for receiving one-time messages or verification links.</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Is it free to use?</h3>
        <p>Yes, it’s completely free. No sign-up needed, no ads, and no premium charges.</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Can I receive OTPs and confirmation emails?</h3>
        <p>Yes, the temporary inbox supports all common email types including OTPs and confirmation links.</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Can I extend the timer for my temporary email?</h3>
        <p>Yes, simply click the "Reset" button to restart the 10-minute countdown.</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Is this email address truly anonymous?</h3>
        <p>Absolutely. We do not collect or track any personal data; every inbox is temporary and private.</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">How many temporary emails can I create?</h3>
        <p>Unlimited. Create as many temporary inboxes as you want, each with its own time limit.</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Does it work on mobile?</h3>
        <p>Yes, the service is fully responsive and works seamlessly on all devices.</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Is it safe for important messages?</h3>
        <p>It’s suitable for short-term use like OTPs and confirmation emails. Avoid using it for sensitive personal information.</p>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Is it better than using a fake email?</h3>
        <p>Yes! Unlike fake emails, this service provides a real, functioning inbox for legitimate message receipt.</p>
      </div>
    </div>
  </section>

</main>

  `

})
export class Email10MinComponent implements OnInit {
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

    // Set SEO meta tags
const pageTitle = '10-Minute Temporary Email - Free Disposable Inbox | TempMail4U';
const pageDescription = 'Get a free 10-minute disposable email for instant verifications. No signup needed. Protect your privacy with our temporary self-destructing inbox.';
const canonicalUrl = 'https://tempmail4u.com/10-minutes-temporary-email';

this.title.setTitle(pageTitle);

// Standard meta tags
this.meta.updateTag({ name: 'description', content: pageDescription });
this.meta.updateTag({ name: 'keywords', content: '10 minute email, disposable email, temporary inbox, burner email, email verification, OTP email, privacy protection, spam prevention, anonymous email, quick email' });

// Open Graph / Facebook
this.meta.updateTag({ property: 'og:title', content: pageTitle });
this.meta.updateTag({ property: 'og:description', content: pageDescription });
this.meta.updateTag({ property: 'og:type', content: 'website' });
this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
this.meta.updateTag({ property: 'og:site_name', content: 'TempMail4U' });
this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

// Twitter Card
this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
this.meta.updateTag({ name: 'twitter:site', content: '@TempMail4U' });

// Canonical URL
this.meta.updateTag({ rel: 'canonical', href: canonicalUrl });

// Additional helpful tags
this.meta.updateTag({ name: 'robots', content: 'index, follow' });
this.meta.updateTag({ name: 'author', content: 'TempMail4U' });
  }
}