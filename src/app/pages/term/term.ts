import { Component, LOCALE_ID, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Route } from 'lucide-angular';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-term',
  imports: [RouterModule],
  templateUrl: './term.html',
  styleUrl: './term.css'
})
export class Term {
constructor(private title: Title, private meta: Meta) {}
private seoService = inject(SeoService);
private locale = inject(LOCALE_ID);

  ngOnInit(): void {
    const pageTitle = $localize`:@@seo.terms.title:Terms & Conditions – TempMail4U | Temporary Email & Temp Mail`;
    const description = $localize`:@@seo.terms.description:Read the Terms & Conditions for using TempMail4U's services, including one time email, temporary email, temp mail, and temporary inbox options.`;
    const keywords = $localize`:@@seo.terms.keywords:terms and conditions, temp mail terms, temporary email policy, one time email rules, temporary inbox conditions`;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });

    // Open Graph
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: 'https://tempmail4u.com/terms' });
    this.meta.updateTag({ property: 'og:site_name', content: 'TempMail4U' });

    // Inject JSON-LD, canonical and hreflang via SeoService
    const baseUrl = this.seoService.getBaseUrl(this.locale);
    this.seoService.updateSeoTags({
      title: pageTitle,
      description,
      keywords,
      ogUrl: baseUrl + '/terms',
      ogImage: 'https://tempmail4u.com/assets/images/og/terms.jpg',
      ogSiteName: 'TempMail4u',
      twitterSite: '@tempmails',
      breadcrumbs: [
        { name: $localize`:@@breadcrumbs.home:Home`, url: baseUrl + '/' },
        { name: pageTitle, url: baseUrl + '/terms' }
      ]
    });
  }
}
