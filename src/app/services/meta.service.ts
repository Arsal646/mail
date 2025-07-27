import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

export interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  ogUrl?: string;
  ogImage?: string;
  twitterImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setMetaTags(tags: MetaTags): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      // Set page title
      this.title.setTitle(tags.title);

      // Standard meta tags
      this.meta.updateTag({ name: 'description', content: tags.description });
      this.meta.updateTag({ name: 'keywords', content: tags.keywords });

      // Open Graph/Facebook tags
      this.meta.updateTag({ property: 'og:title', content: tags.title });
      this.meta.updateTag({ property: 'og:description', content: tags.description });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      if (tags.ogUrl) {
        this.meta.updateTag({ property: 'og:url', content: tags.ogUrl });
      }
      if (tags.ogImage) {
        this.meta.updateTag({ property: 'og:image', content: tags.ogImage });
      }
      this.meta.updateTag({ property: 'og:site_name', content: 'TempMails' });

      // Twitter Card tags
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: tags.title });
      this.meta.updateTag({ name: 'twitter:description', content: tags.description });
      if (tags.twitterImage) {
        this.meta.updateTag({ name: 'twitter:image', content: tags.twitterImage });
      }
      this.meta.updateTag({ name: 'twitter:site', content: '@tempmails' });
    } catch (error) {
      console.warn('MetaService: Error setting meta tags:', error);
    }
  }

  clearMetaTags(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      // Remove meta tags
      this.meta.removeTag('name="description"');
      this.meta.removeTag('name="keywords"');
      this.meta.removeTag('property="og:title"');
      this.meta.removeTag('property="og:description"');
      this.meta.removeTag('property="og:url"');
      this.meta.removeTag('property="og:image"');
      this.meta.removeTag('name="twitter:title"');
      this.meta.removeTag('name="twitter:description"');
      this.meta.removeTag('name="twitter:image"');
    } catch (error) {
      console.warn('MetaService: Error clearing meta tags:', error);
    }
  }
} 