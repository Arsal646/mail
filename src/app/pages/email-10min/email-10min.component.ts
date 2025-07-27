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
        <h2 class="text-2xl font-bold text-gray-900 mb-4">About Our 10-Minute Temporary Email Service</h2>
        <div class="text-gray-600 space-y-4">
          <p class="text-base leading-relaxed">
            Our <strong>10-minute temporary email service</strong> provides users with ultra-fast disposable email addresses 
            that automatically expire after just 10 minutes. This service is specifically designed for quick verifications, 
            one-time registrations, and situations where you need immediate but temporary email access.
          </p>
          
          <p class="text-base leading-relaxed">
            Unlike traditional temporary email services that last for hours or days, our 10-minute service offers 
            maximum privacy protection by ensuring your temporary email address disappears quickly. This prevents 
            spam accumulation and keeps your personal information secure.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 class="font-semibold text-blue-900 mb-2">Ultra-Fast Expiry</h3>
              <p class="text-sm text-blue-700">Emails automatically expire after 10 minutes for maximum privacy protection</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 class="font-semibold text-green-900 mb-2">Instant Generation</h3>
              <p class="text-sm text-green-700">Get a temporary email address instantly with no registration required</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 class="font-semibold text-purple-900 mb-2">Privacy First</h3>
              <p class="text-sm text-purple-700">No personal information stored, complete anonymity guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">How to Use 10-Minute Temporary Emails</h2>
        
        <div class="space-y-6">
          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <span class="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">1</span>
              Generate Your Temporary Email
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              When you visit our 10-minute email page, a temporary email address is automatically generated for you. 
              The 10-minute countdown timer starts immediately, and you can use this email for quick verifications.
            </p>
          </div>

          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <span class="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">2</span>
              Use for Quick Verifications
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Use your 10-minute email address for website registrations, app testing, or any service that requires 
              email verification. The inbox refreshes automatically every 10 seconds to check for new messages.
            </p>
          </div>

          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <span class="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center mr-2">3</span>
              Automatic Expiry
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              After 10 minutes, your temporary email address expires automatically. All received emails are permanently 
              deleted, ensuring your privacy and preventing data accumulation.
            </p>
          </div>
        </div>
      </div>

      <!-- Use Cases & Benefits Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Why Choose 10-Minute Temporary Emails?</h2>
        <div class="text-gray-600 space-y-4">
          <p class="text-base leading-relaxed">
            <strong>10-minute temporary emails</strong> are the perfect solution for users who need quick, 
            disposable email addresses for short-term use. Unlike traditional temporary email services that can 
            last for hours or even days, our 10-minute service provides maximum privacy protection by ensuring 
            your temporary email address disappears quickly.
          </p>
          
          <p class="text-base leading-relaxed">
            This service is ideal for developers testing applications, users who need to verify accounts quickly, 
            or anyone who wants to protect their privacy while accessing online services. The automatic expiry 
            feature ensures that no sensitive information remains accessible longer than necessary.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="space-y-3">
              <h3 class="font-semibold text-gray-900">Perfect For Website Testing</h3>
              <ul class="text-sm text-gray-600 space-y-2">
                <li>• Testing new websites and applications</li>
                <li>• Verifying signup processes</li>
                <li>• Checking email functionality</li>
                <li>• Development and debugging</li>
              </ul>
            </div>
            <div class="space-y-3">
              <h3 class="font-semibold text-gray-900">Quick Registrations</h3>
              <ul class="text-sm text-gray-600 space-y-2">
                <li>• One-time service registrations</li>
                <li>• Download access verifications</li>
                <li>• Trial account creation</li>
                <li>• Temporary access codes</li>
              </ul>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg mt-6">
            <h3 class="font-semibold text-gray-900 mb-3">Key Benefits:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• <strong>Ultra-fast expiry</strong> - Emails disappear after 10 minutes</li>
                <li>• <strong>No registration required</strong> - Start using immediately</li>
                <li>• <strong>Complete privacy</strong> - No personal information stored</li>
              </ul>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• <strong>Automatic cleanup</strong> - All data deleted after expiry</li>
                <li>• <strong>Instant generation</strong> - Get email addresses instantly</li>
                <li>• <strong>Free service</strong> - No hidden fees or charges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">What is a 10-minute temporary email?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              A 10-minute temporary email is a disposable email address that automatically expires after 10 minutes. 
              It's perfect for quick verifications, one-time registrations, or when you need a temporary email address 
              without revealing your personal email.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">How does the 10-minute timer work?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              When you generate a new email address, a 10-minute countdown timer starts. The email address will 
              automatically expire after 10 minutes, and you won't be able to receive new messages. You can reset 
              the timer to extend the email's lifespan back to 10 minutes if needed.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Is the 10-minute email service free?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Yes, our 10-minute temporary email service is completely free to use. No registration, no personal 
              information required, and no hidden fees. You can generate as many temporary emails as you need.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">What happens to my emails after 10 minutes?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              After 10 minutes, the email address expires and becomes inactive. Any emails received during the 
              10-minute period will be permanently deleted. This ensures your privacy and prevents data accumulation.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Can I extend the 10-minute timer?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Yes! You can click the refresh icon next to the timer to reset it back to 10 minutes. This is useful 
              if you need a bit more time to complete a verification or registration process.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Is my privacy protected with 10-minute emails?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Absolutely! Our 10-minute temporary email service is designed with privacy in mind. We don't store 
              any personal information, and all emails are automatically deleted after expiration. Your identity 
              remains completely anonymous.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">What can I use a 10-minute email for?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              10-minute temporary emails are perfect for: quick website verifications, one-time registrations, 
              testing services, avoiding spam, protecting your main email address, and any situation where you 
              need a temporary email address.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">How often does the inbox refresh?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              The inbox automatically refreshes every 10 seconds to check for new emails. You can also manually 
              refresh by clicking the refresh button. This ensures you receive emails quickly without missing any messages.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Can I create multiple 10-minute emails?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Yes, you can generate as many 10-minute temporary emails as you need. Each email will have its own 
              10-minute timer and inbox. This is useful when you need multiple temporary addresses for different purposes.
            </p>
          </div>

          <div class="border-b border-gray-200 pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">What if I need more than 10 minutes?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              If you need longer access, you can reset the timer by clicking the refresh button, or consider using 
              our regular temporary email service which offers longer access periods. The 10-minute service is 
              specifically designed for quick, short-term needs.
            </p>
          </div>

          <div class="pb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Is the 10-minute email service secure?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Yes, our 10-minute email service is secure and private. All emails are encrypted in transit, and 
              we don't store any personal information. The automatic deletion after 10 minutes ensures your data 
              doesn't persist longer than necessary.
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
    // Scroll to top when component initializes (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollToTopInstant();
    }



     // Set SEO meta tags
  const pageTitle = '10 Minutes Temp Mail - Free Disposable Email in Seconds';
  const pageDescription = 'Get a free 10-minute temporary email instantly. Perfect for signups, verifications & privacy. No registration, no spam!';

  this.title.setTitle(pageTitle);

  // Standard meta tags
  this.meta.updateTag({ name: 'description', content: pageDescription });
  this.meta.updateTag({ name: 'keywords', content: '10 minute email, temp mail, disposable email, free temporary email, burner email, spam protection' });

  // Open Graph/Facebook tags
  this.meta.updateTag({ property: 'og:title', content: pageTitle });
  this.meta.updateTag({ property: 'og:description', content: pageDescription });
  this.meta.updateTag({ property: 'og:type', content: 'website' });
  this.meta.updateTag({ property: 'og:url', content: 'https://tempmails.online/email-10min' });
  this.meta.updateTag({ property: 'og:image', content: 'https://tempmails.online/assets/images/10min-email-preview.jpg' });
  this.meta.updateTag({ property: 'og:site_name', content: 'TempMails' });

  // Twitter Card tags
  this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
  this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
  this.meta.updateTag({ name: 'twitter:image', content: 'https://tempmails.online/assets/images/10min-email-preview.jpg' });
  this.meta.updateTag({ name: 'twitter:site', content: '@tempmails' });
}


  
} 