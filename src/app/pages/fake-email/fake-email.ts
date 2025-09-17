
import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, inject, LOCALE_ID, PLATFORM_ID } from '@angular/core'
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail'
import { RouteTranslationService } from '../../services/route-translation.service'
import { ScrollService } from '../../services/scroll.service'
import { SeoService } from '../../services/seo.service'

@Component({
  selector: 'app-fake-email',
  imports: [MainTempMail],
  templateUrl: './fake-email.html',
  styleUrl: './fake-email.css'
})
export class FakeEmail {
  // Service-style field injections to match your pattern
private seoService = inject(SeoService)
private locale = inject(LOCALE_ID)

constructor(
  @Inject(PLATFORM_ID) private platformId: Object,
  private scrollService: ScrollService,
) {}

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.scrollService.scrollToTopInstant()
  }
  this.setSeoTags()
}

private setSeoTags(): void {
  const baseUrl = this.seoService.getBaseUrl(this.locale)
  const seo = this.getSeoContent()

  this.seoService.updateSeoTags({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    ogUrl: baseUrl + '/fake-email',
    ogImage: 'https://tempmail4u.com/assets/images/fake-email-preview.jpg',
    ogSiteName: 'TempMail4u',
    twitterSite: '@tempmails',
    breadcrumbs: [
      { name: 'Home', url: baseUrl + '/' },
      { name: 'Fake Email Address Generator', url: baseUrl + '/fake-email' }
    ],
    faq: this.getFaqItems()
  })
}

private getSeoContent() {
  return {
    title: 'Create Fake Email | Temporary Private Inbox | TempMail4U',
    description: 'Create a fake email instantly. Get a private temporary inbox for OTPs, app testing, and quick signups. No signup required. 100% spam free.',
    keywords: 'fake email, disposable email, temporary email, burner email, throwaway email, anonymous inbox, otp email'
  }
}

private getFaqItems() {
  return [
    {
      question: 'When should I use a fake email?',
      answer: 'Use it for quick signups, trials, downloads, app testing, and newsletters where you do not need recovery.'
    },
    {
      question: 'Did not get the OTP or verification email?',
      answer: 'Wait 60 seconds, then click Resend. Click Refresh in the inbox. Keep this page open while you request the code. Check the address is an exact match. Try fewer requests and wait a moment. Some sites block disposable domains. Create a new inbox and request a new code. For long term access, use your regular email.'
    },
    {
      question: 'Fake email vs temporary email vs burner mail, what is the difference?',
      answer: 'All are disposable. Fake email is a throwaway address. Temporary email expires after a short time. Burner mail is an address you can drop anytime.'
    },
    {
      question: 'When should I avoid it?',
      answer: 'Avoid it for banking, government, password resets, paid accounts, health, and taxes.'
    },
    {
      question: 'Can I use a fake email for social media?',
      answer: 'Yes for quick verification on Instagram, Facebook, X, TikTok, Snapchat, Reddit, Discord, and Telegram. Some platforms block disposable domains. For long term access and recovery, use your real email.'
    },
    {
      question: 'Can I choose a custom address?',
      answer: 'Yes. Click New Email, then add your username before email.'
    },
    {
      question: 'Can I send emails from here?',
      answer: 'No. These inboxes are receive only.'
    },
    {
      question: 'Can I receive attachments and links?',
      answer: 'Most messages work. Very large files may fail. Do not open unknown attachments or links.'
    },
    {
      question: 'How do I get back to the same inbox later?',
      answer: 'Use the same browser and open this page to get the same inbox. If you clear site data or switch browsers, access ends. Use the History icon if available to reopen past addresses.'
    },
    {
      question: 'Can I reuse the same address on other devices?',
      answer: 'Yes. Click Save to get a link. Open that link on any device to access the same email and inbox.'
    },
    {
      question: 'Can I change the timer or get a fresh address?',
      answer: 'Use the 10 minute, 20 minute, or 30 minute pages if offered. Click New Email anytime for a fresh inbox.'
    }
  ]
}



}

