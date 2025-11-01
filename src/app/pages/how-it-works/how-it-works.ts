import { isPlatformBrowser } from '@angular/common';
import { Component, LOCALE_ID, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { ScrollService } from '../../services/scroll.service';
import { RouteTranslationService } from '../../services/route-translation.service';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css'
})
export class HowItWorks {
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);
  private routeTranslation = inject(RouteTranslationService);
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollToTopInstant();
    }
    this.setSeoTags();
  }

  private setSeoTags(): void {
    const seo = this.getLocalizedSeoContent();
    const baseUrl = this.seoService.getBaseUrl(this.locale);
    const translatedRoute = this.routeTranslation.getRoute('/how-it-works') || '/how-it-works';

    this.seoService.updateSeoTags({
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      ogUrl: baseUrl + translatedRoute,
      ogImage: 'https://tempmail4u.com/assets/images/og/how-it-works.jpg',
      ogSiteName: 'TempMail4U',
      twitterSite: '@tempmails',
      breadcrumbs: [
        { name: $localize`:@@breadcrumbs.home:Home`, url: baseUrl + '/' },
        { name: seo.title, url: baseUrl + translatedRoute }
      ]
    });
  }

  private getLocalizedSeoContent() {
    return {
      title: $localize`:@@seo.howItWorks.title:How TempMail Works - Step-by-Step Guide`,
      description: $localize`:@@seo.howItWorks.description:Learn how to use TempMail in five quick steps with screenshots that show you how to generate, copy, and manage disposable inboxes.`,
      keywords: $localize`:@@seo.howItWorks.keywords:how temp mail works, disposable email tutorial, tempmail guide, burner email steps`
    };
  }
}
