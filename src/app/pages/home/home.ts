import { Component, inject, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from "lucide-angular";
import { RouterModule } from '@angular/router';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { SeoService } from '../../services/seo.service';
import { RouteTranslationService } from '../../services/route-translation.service';
import { GoogleAdsenseDirective } from '../../directives/google-adsense.directive';

// Import the localized strings (these will be replaced by Angular i18n at build time)
declare const $localize: any;

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [CommonModule, LucideAngularModule, RouterModule, MainTempMail, GoogleAdsenseDirective],
})
export class Home implements OnInit {
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);
  private routeTranslation = inject(RouteTranslationService);
  currentMonth = '';
  currentYear = 2025;

  // Expose a simple flag for English-only UI elements
  public isEnglish: boolean = String(this.locale || '').toLowerCase().startsWith('en');
  public fakeEmailPath = '/fake-email';


  get routes() {
    return {
      email10min: this.routeTranslation.getRoute('email-10min'),
      email20min: this.routeTranslation.getRoute('email-20min'),
      email30min: this.routeTranslation.getRoute('email-30min')
    };
  }

  ngOnInit(): void {
    this.setSeoTags();

    const now = new Date();
    this.currentMonth = now.toLocaleString('default', { month: 'long' });
    this.currentYear = now.getFullYear();
  }

  private setSeoTags(): void {
    // Get localized SEO content based on current locale
    const seoContent = this.getLocalizedSeoContent();

    // Determine base URL based on locale
    const baseUrl = this.seoService.getBaseUrl(this.locale);

    this.seoService.updateSeoTags({
      title: seoContent.title,
      description: seoContent.description,
      keywords: seoContent.keywords,
      ogUrl: baseUrl + '/',
      ogImage: 'https://tempmail4u.com/assets/images/temp-mail-preview.jpg',
      ogSiteName: seoContent.siteName,
      twitterSite: '@tempmails',
      breadcrumbs: [
        { name: $localize`:@@seo.breadcrumbs.home:Home`, url: baseUrl + '/' }
      ],
      faq: this.buildSeoFaq()
    });
  }

  private getLocalizedSeoContent() {
    // Using Angular's $localize function for runtime i18n
    return {
      title: $localize`:@@seo.home.title:Free Temp Mail - Temporary Email Service | TempMail4U`,
      description: $localize`:@@seo.home.description:Tired of spam? Get a free temporary email now with TempMail4U. Create a temporary inbox for OTPs and signups in seconds. Protect your privacy instantly.`,
      keywords: $localize`:@@seo.home.keywords:temporary email, temp mail, disposable email, burner email, anonymous email, fake email, spam protection, email verification, privacy email, temporary mailbox`,
      siteName: $localize`:@@seo.home.siteName:TempMail4u`
    };

  }

  private buildSeoFaq() {
    return [
      {
        question: $localize`:@@seo.home.faq.q1:What is a temporary email?`,
        answer: $localize`:@@seo.home.faq.a1:A temporary email (also called a one-time inbox, disposable mailbox, or burner address) is a short-lived account you can use to sign up on websites, receive verification codes, or keep your real inbox safe from spam.`
      },
      {
        question: $localize`:@@seo.home.faq.q2:How do I create a disposable email?`,
        answer: $localize`:@@seo.home.faq.a2:You don't need to register. Simply open this page and your anonymous inbox is generated instantly. You can refresh for a new one or choose a custom username before the @ symbol.`
      },
      {
        question: $localize`:@@seo.home.faq.q3:How long does a temporary inbox last?`,
        answer: $localize`:@@seo.home.faq.a3:By default, emails stay for 24 hours in your browser. If you click save, your inbox can remain active for 7 days. We also offer 10 minute mail, 20 minute mail, and 30 minute mail options.`
      },
      {
        question: $localize`:@@seo.home.faq.q4:Is a disposable inbox safe to use?`,
        answer: $localize`:@@seo.home.faq.a4:Yes. All data is stored locally in your browser session. We don't log or track your usage. This makes temporary addresses secure, private, and spam-free.`
      },
      {
        question: $localize`:@@seo.home.faq.q5:What can I use a fake email for?`,
        answer: $localize`:@@seo.home.faq.a5:These short-term addresses are best for signing up on new websites, app testing, online shopping, downloading files, or anywhere you don't want to share your personal email. They help keep your main inbox clean.`
      },
      {
        question: $localize`:@@seo.home.faq.q6:Can I send emails from this address?`,
        answer: $localize`:@@seo.home.faq.a6:No. These inboxes are receive-only. They are designed for registrations, verifications, and quick one-time use, not for sending or long-term communication.`
      },
      {
        question: $localize`:@@seo.home.faq.q7:What's the difference between temp mail and regular email?`,
        answer: $localize`:@@seo.home.faq.a7:Regular emails (like Gmail, Yahoo, Outlook) require personal info, stay permanent, and often get spam. Temporary inboxes are anonymous, require no signup, and automatically expire.`
      },
      {
        question: $localize`:@@seo.home.faq.q8:Can I extend the life of my inbox?`,
        answer: $localize`:@@seo.home.faq.a8:Yes. By saving the session or copying your unique access link, you can return anytime within 7 days. After that, the inbox is deleted permanently.`
      },
      {
        question: $localize`:@@seo.home.faq.q9:Is there a 10 minute mail option?`,
        answer: $localize`:@@seo.home.faq.a9:Yes. We provide 10 minute temp mail as well as 20 minute and 30 minute variants for quick and disposable use. These are perfect for short sign-ups or one-time verification codes.`
      },
      {
        question: $localize`:@@seo.home.faq.q10:Why should I use a private inbox instead of my real one?`,
        answer: $localize`:@@seo.home.faq.a10:Using a temporary address protects your privacy, avoids spam, keeps your main inbox clean, and reduces the risk of your personal data being leaked or sold.`
      }
    ];
  }

  

}



  
