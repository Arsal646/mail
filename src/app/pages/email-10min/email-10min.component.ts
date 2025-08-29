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
  templateUrl: './email-10min.component.html',
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
      twitterSite: '@tempmails',
      breadcrumbs: [
        { name: $localize`:@@seo.breadcrumbs.home:Home`, url: baseUrl + '/' },
        { name: $localize`:@@seo.email10min.titleShort:10 Minute Temporary Email Generator`, url: baseUrl + '/10-minutes-temporary-email' }
      ],
      faq: this.getFaqItems()
    });
  }

private getLocalizedSeoContent() {
  return {
    title: $localize`:@@seo.email10min.title:10 Minute Temporary Email | Free, Secure & Spam-Free Inbox`,
    description: $localize`:@@seo.email10min.description:Generate your free 10 minute temporary email instantly. Protect your inbox with our secure disposable inbox service – fast, private, and spam-free.`,
    keywords: $localize`:@@seo.email10min.keywords:10 minute temporary email, 10 minute mail, disposable email, burner email, temporary mailbox, anonymous inbox, spam free email, OTP verification`
  };
}

  private getFaqItems() {
    return [
      {
        question: $localize`:@@seo.email10min.faq.q1:What is a 10 minute email?`,
        answer: $localize`:@@seo.email10min.faq.a1:A 10 minute email is a short-lived inbox that deletes itself after 600 seconds, ideal for receiving codes and links without exposing your main account.`
      },
      {
        question: $localize`:@@seo.email10min.faq.q2:Can I use it for sign-ups and OTP?`,
        answer: $localize`:@@seo.email10min.faq.a2:Yes. Use the disposable inbox for quick registrations, OTPs, and downloads; it's receive-only and requires no signup.`
      },
      {
        question: $localize`:@@seo.email10min.faq.q3:Can I reset or extend the inbox?`,
        answer: $localize`:@@seo.email10min.faq.a3:Use Reset to restart the timer, or switch to a 20 or 30 minute inbox for longer use.`
      },
      {
        question: $localize`:@@seo.email10min.faq.q4:Why didn't I receive my OTP or verification?`,
        answer: $localize`:@@seo.email10min.faq.a4:Some services delay or block temp domains. Refresh, request a new code, or try a longer duration.`
      },
      {
        question: $localize`:@@seo.email10min.faq.q5:Can I use it for sensitive accounts?`,
        answer: $localize`:@@seo.email10min.faq.a5:Not recommended. Use permanent email for banking, government, or personal accounts.`
      },
      {
        question: $localize`:@@seo.email10min.faq.q6:Is it anonymous and private?`,
        answer: $localize`:@@seo.email10min.faq.a6:Yes. No registration required; HTTPS is used and emails are deleted at expiry.`
      },
      {
        question: $localize`:@@seo.email10min.faq.q7:How many inboxes can I create?`,
        answer: $localize`:@@seo.email10min.faq.a7:Unlimited. Create as many temporary inboxes as you need; each expires automatically.`
      },
      {
        question: $localize`:@@seo.email10min.faq.q8:Does it work on mobile devices?`,
        answer: $localize`:@@seo.email10min.faq.a8:Yes. The generator is responsive and works across devices.`
      },
      {
        question: $localize`:@@seo.email10min.faq.q9:Can I just use a 10 minute email without extras?`,
        answer: $localize`:@@seo.email10min.faq.a9:Yes. A simple 10 minute inbox provides a fast, disposable address that expires automatically.`
      }
    ];
  }

//



/* Extend the class prototype to include getFaqItems without altering template
(Email10MinComponent as any).prototype.getFaqItems = function(): FaqItem[] {
  return [
    {
      question: $localize`:@@email10min.faq.q1.label:What is a 10 minute email?`,
      answer: $localize`:@@email10min.faq.a1.label:A 10 minute email is a short-lived inbox that deletes itself after 600 seconds, ideal for receiving codes and links without exposing your main account.`
    },
    {
      question: $localize`:@@email10min.faq.q2.label:Can I use it for sign-ups and OTP?`,
      answer: $localize`:@@email10min.faq.a2.label:Yes. Use the disposable inbox for quick registrations, OTPs, and downloads; it’s receive-only and requires no signup.`
    },
    {
      question: $localize`:@@email10min.faq.q3.label:Can I reset or extend the inbox?`,
      answer: $localize`:@@email10min.faq.a3.label:Use Reset to restart the timer, or switch to a 20 or 30 minute inbox for longer use.`
    },
    {
      question: $localize`:@@email10min.faq.q4.label:Why didn’t I receive my OTP or verification?`,
      answer: $localize`:@@email10min.faq.a4.label:Some services delay or block temp domains. Refresh, request a new code, or try a longer duration.`
    },
    {
      question: $localize`:@@email10min.faq.q5.label:Can I use it for sensitive accounts?`,
      answer: $localize`:@@email10min.faq.a5.label:Not recommended. Use permanent email for banking, government, or personal accounts.`
    },
    {
      question: $localize`:@@email10min.faq.q6.label:Is it anonymous and private?`,
      answer: $localize`:@@email10min.faq.a6.label:Yes. No registration required; HTTPS is used and emails are deleted at expiry.`
    },
    {
      question: $localize`:@@email10min.faq.q7.label:How many inboxes can I create?`,
      answer: $localize`:@@email10min.faq.a7.label:Unlimited. Create as many temporary inboxes as you need; each expires automatically.`
    },
    {
      question: $localize`:@@email10min.faq.q8.label:Does it work on mobile devices?`,
      answer: $localize`:@@email10min.faq.a8.label:Yes. The generator is responsive and works across devices.`
    },
    {
      question: $localize`:@@email10min.faq.q9.label:Can I just use a 10 minute email without extras?`,
      answer: $localize`:@@email10min.faq.a9.label:Yes. A simple 10 minute inbox provides a fast, disposable address that expires automatically.`
    }
  ];
};
*/

}
