import { Component, inject, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from "lucide-angular";
import { RouterModule } from '@angular/router';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { SeoService } from '../../services/seo.service';
import { RouteTranslationService } from '../../services/route-translation.service';

// Import the localized strings (these will be replaced by Angular i18n at build time)
declare const $localize: any;

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [CommonModule, LucideAngularModule, RouterModule, MainTempMail],
})
export class Home implements OnInit {
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);
  private routeTranslation = inject(RouteTranslationService);

  get routes() {
    return {
      email10min: this.routeTranslation.getRoute('email-10min'),
      email20min: this.routeTranslation.getRoute('email-20min'),
      email30min: this.routeTranslation.getRoute('email-30min')
    };
  }

  ngOnInit(): void {
    this.setSeoTags();
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
      twitterSite: '@tempmails'
    });
  }

  private getLocalizedSeoContent() {
    // Using Angular's $localize function for runtime i18n
    return {
      title: $localize`:@@seo.home.title:Free Temporary Email & Disposable Inbox | TempMail4u`,
      description: $localize`:@@seo.home.description:Create a free temp email in seconds. Get a disposable inbox to keep your real address private and spam-free. No sign up required. Try TempMail4u now!`,
      keywords: $localize`:@@seo.home.keywords:temporary email, temp mail, disposable email, burner email, anonymous email, fake email, spam protection, email verification, privacy email, temporary mailbox`,
      siteName: $localize`:@@seo.home.siteName:TempMail4u`
    };

  }

}
