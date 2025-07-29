import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { QuickEmailComponent } from '../../compoents/quick-email/quick-email.component';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { MetaService } from '../../services/meta.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-email-10min',
  standalone: true,
  imports: [QuickEmailComponent],
  template: `
    <div class="container mx-auto px-4 py-6 max-w-5xl">
      <!-- Main Component -->
      <app-quick-email [pageTimeCount]="10"></app-quick-email>

      <!-- About Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Instant Disposable Email for Quick Verifications</h2>
        <div class="text-gray-600 space-y-4">
          <p class="text-base leading-relaxed">
            Need an email address just for a quick verification? Our disposable email service creates temporary inboxes that automatically expire after 10 minutes. Perfect for signing up to services without revealing your personal email or cluttering your main inbox.
          </p>
          
          <p class="text-base leading-relaxed">
            Unlike standard temporary email services that keep addresses active for hours, our solution prioritizes your privacy by ensuring all data is permanently deleted after a short period. This prevents spam and protects your digital identity.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 class="font-semibold text-blue-900 mb-2">Time-Sensitive Inboxes</h3>
              <p class="text-sm text-blue-700">Automatically deletes all messages after 10 minutes for enhanced security</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 class="font-semibold text-green-900 mb-2">Instant Access</h3>
              <p class="text-sm text-green-700">No signup required - get a working email address in seconds</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 class="font-semibold text-purple-900 mb-2">Complete Anonymity</h3>
              <p class="text-sm text-purple-700">We never ask for or store any personal information</p>
            </div>
          </div>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
        
        <div class="space-y-6">
          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <span class="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">1</span>
              Get Your Temporary Address
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              We instantly generate a unique email address when you visit our page. The 10-minute countdown begins immediately, giving you plenty of time for most verification processes.
            </p>
          </div>

          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <span class="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">2</span>
              Complete Your Verification
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Use your temporary address wherever you need email confirmation. Our system checks for new messages every 10 seconds, so you'll never miss important verification links.
            </p>
          </div>

          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <span class="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">3</span>
              Automatic Data Removal
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              After 10 minutes, everything is permanently erased - your temporary address becomes inactive and all received messages are securely deleted from our servers.
            </p>
          </div>
        </div>
      </div>

      <!-- Use Cases & Benefits Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Practical Uses for Temporary Emails</h2>
        <div class="text-gray-600 space-y-4">
          <p class="text-base leading-relaxed">
            Whether you're a developer testing features or someone who values online privacy, temporary email addresses solve multiple problems. They prevent spam, protect your identity, and help maintain inbox organization.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="space-y-3">
              <h3 class="font-semibold text-gray-900">Development & Testing</h3>
              <ul class="text-sm text-gray-600 space-y-2">
                <li>• QA testing for registration flows</li>
                <li>• Verifying email templates</li>
                <li>• Debugging authentication systems</li>
                <li>• Testing multi-account scenarios</li>
              </ul>
            </div>
            <div class="space-y-3">
              <h3 class="font-semibold text-gray-900">Personal Privacy</h3>
              <ul class="text-sm text-gray-600 space-y-2">
                <li>• Accessing gated content</li>
                <li>• Signing up for limited trials</li>
                <li>• Downloading resources</li>
                <li>• Protecting against data breaches</li>
              </ul>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg mt-6">
            <h3 class="font-semibold text-gray-900 mb-3">Why Our Service Stands Out:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• <strong>Built for speed</strong> - Get verified and move on</li>
                <li>• <strong>Zero commitment</strong> - No accounts or passwords</li>
                <li>• <strong>Privacy focused</strong> - We don't track or profile users</li>
              </ul>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• <strong>Automatic cleanup</strong> - No manual deletion needed</li>
                <li>• <strong>Mobile-friendly</strong> - Works perfectly on all devices</li>
                <li>• <strong>Truly free</strong> - No upsells or premium features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Common Questions</h2>
        <div class="space-y-4">
          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">How is this different from regular email?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Unlike permanent email services, these addresses are designed for one-time use and automatically expire. They're perfect when you need to receive a verification link but don't want to use your personal email.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Can I receive attachments?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Yes, you can view and download attachments just like with regular email, but remember they'll be deleted when your temporary inbox expires.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">What if I need more time?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Simply click the refresh button to reset your timer if you need additional minutes. For longer-term needs, consider creating multiple temporary addresses.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Is there a limit to how many I can create?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              No, you can generate as many temporary addresses as you need. Each functions independently with its own 10-minute lifespan.
            </p>
          </div>

          <div class="pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">How secure is this service?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              We prioritize your security with encrypted connections and automatic data deletion. Since we don't require any personal information, there's nothing sensitive to compromise.
            </p>
          </div>
        </div>
      </div>
    </div>
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
    const pageTitle = '10-Minute Disposable Email - Instant Temporary Inbox | TempMail4U';
    const pageDescription = 'Get a free temporary email address that expires in 10 minutes. Perfect for quick verifications, testing, and protecting your privacy. No registration required.';
    this.title.setTitle(pageTitle);
    
    // Standard meta tags
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({ name: 'keywords', content: 'disposable email, temporary inbox, burner email, email verification, privacy protection, spam prevention, quick email' });

    // Open Graph / Social Media meta tags
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    
    this.meta.updateTag({ rel: 'canonical', href: 'https://tempmail4u.com/10-minutes-temporary-email' });
  }
}