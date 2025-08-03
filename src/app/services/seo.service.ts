import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { RouteTranslationService } from './route-translation.service';

export interface SeoData {
    title: string;
    description: string;
    keywords?: string;
    ogUrl?: string;
    ogImage?: string;
    ogSiteName?: string;
    twitterSite?: string;
}

// Configuration for supported languages
export interface LanguageConfig {
    code: string;
    urlPrefix: string;
    isDefault: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private meta = inject(Meta);
    private title = inject(Title);
    private document = inject(DOCUMENT);
    private routeTranslation = inject(RouteTranslationService);

    // Supported languages configuration
    private supportedLanguages: LanguageConfig[] = [
        { code: 'en', urlPrefix: '', isDefault: true },
        { code: 'ar', urlPrefix: '/ar', isDefault: false }
        // Add more languages here in the future:
        // { code: 'es', urlPrefix: '/es', isDefault: false },
        // { code: 'fr', urlPrefix: '/fr', isDefault: false },
        // { code: 'de', urlPrefix: '/de', isDefault: false },
    ];

    updateSeoTags(seoData: SeoData): void {
        // Update page title
        this.title.setTitle(seoData.title);

        // Update meta description
        this.meta.updateTag({ name: 'description', content: seoData.description });

        // Update keywords if provided
        if (seoData.keywords) {
            this.meta.updateTag({ name: 'keywords', content: seoData.keywords });
        }

        // Open Graph tags
        this.meta.updateTag({ property: 'og:title', content: seoData.title });
        this.meta.updateTag({ property: 'og:description', content: seoData.description });
        this.meta.updateTag({ property: 'og:type', content: 'website' });

        if (seoData.ogUrl) {
            this.meta.updateTag({ property: 'og:url', content: seoData.ogUrl });
        }

        if (seoData.ogImage) {
            this.meta.updateTag({ property: 'og:image', content: seoData.ogImage });
        }

        if (seoData.ogSiteName) {
            this.meta.updateTag({ property: 'og:site_name', content: seoData.ogSiteName });
        }

        // Twitter Card tags
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: seoData.title });
        this.meta.updateTag({ name: 'twitter:description', content: seoData.description });

        if (seoData.ogImage) {
            this.meta.updateTag({ name: 'twitter:image', content: seoData.ogImage });
        }

        if (seoData.twitterSite) {
            this.meta.updateTag({ name: 'twitter:site', content: seoData.twitterSite });
        }

        // Update canonical URL
        this.updateCanonicalUrl(seoData.ogUrl);

        // Add hreflang tags for multilingual SEO
        if (seoData.ogUrl) {
            this.addHreflangTags(seoData.ogUrl);
        }
    }

    private updateCanonicalUrl(url?: string): void {
        if (!url) return;

        // Remove existing canonical link
        const existingCanonical = this.document.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
            existingCanonical.remove();
        }

        // Add new canonical link
        const link = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', url);
        this.document.head.appendChild(link);
    }

    private addHreflangTags(currentUrl: string): void {
        // Remove existing hreflang tags
        const existingTags = this.document.querySelectorAll('link[rel="alternate"][hreflang]');
        existingTags.forEach(tag => tag.remove());

        // Get the route key from the current URL
        const routeKey = this.getRouteKeyFromUrl(currentUrl);
        if (!routeKey) return;

        const head = this.document.getElementsByTagName('head')[0];

        // Add hreflang tags for all supported languages with translated routes
        this.supportedLanguages.forEach(language => {
            const translatedRoute = this.routeTranslation.getRouteForLocale(routeKey, language.code);
            const link = this.document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = language.code;
            link.href = `https://tempmails.online${language.urlPrefix}${translatedRoute ? '/' + translatedRoute : ''}`;
            head.appendChild(link);
        });

        // Add x-default for the default language
        const defaultLanguage = this.supportedLanguages.find(lang => lang.isDefault);
        if (defaultLanguage) {
            const defaultRoute = this.routeTranslation.getRouteForLocale(routeKey, defaultLanguage.code);
            const defaultLink = this.document.createElement('link');
            defaultLink.rel = 'alternate';
            defaultLink.hreflang = 'x-default';
            defaultLink.href = `https://tempmails.online${defaultLanguage.urlPrefix}${defaultRoute ? '/' + defaultRoute : ''}`;
            head.appendChild(defaultLink);
        }
    }

    /**
     * Extract route key from URL for hreflang generation
     */
    private getRouteKeyFromUrl(url: string): string | null {
        let path = url.replace('https://tempmails.online', '');
        
        // Remove locale prefix
        this.supportedLanguages.forEach(lang => {
            if (lang.urlPrefix && path.startsWith(lang.urlPrefix)) {
                path = path.replace(lang.urlPrefix, '');
            }
        });

        // Remove leading slash
        path = path.replace(/^\//, '');

        // Map paths to route keys
        const pathToRouteKey: { [key: string]: string } = {
            '': 'home',
            '10-minutes-temporary-email': 'email-10min',
            '10-دقائق-بريد-مؤقت': 'email-10min',
            '20-minutes-temporary-email': 'email-20min',
            '20-دقيقة-بريد-مؤقت': 'email-20min',
            '30-minutes-temporary-email': 'email-30min',
            '30-دقيقة-بريد-مؤقت': 'email-30min',
            'privacy-policy': 'privacy-policy',
            'سياسة-الخصوصية': 'privacy-policy'
        };

        return pathToRouteKey[path] || null;
    }

    /**
     * Add a new language to the supported languages list
     * Call this method when adding new languages
     */
    addLanguage(languageConfig: LanguageConfig): void {
        const existingIndex = this.supportedLanguages.findIndex(lang => lang.code === languageConfig.code);
        if (existingIndex === -1) {
            this.supportedLanguages.push(languageConfig);
        } else {
            this.supportedLanguages[existingIndex] = languageConfig;
        }
    }

    /**
     * Get all supported languages
     */
    getSupportedLanguages(): LanguageConfig[] {
        return [...this.supportedLanguages];
    }

    /**
     * Generate base URL for the current locale
     */
    getBaseUrl(locale: string): string {
        const language = this.supportedLanguages.find(lang => lang.code === locale);
        if (language) {
            return `https://tempmails.online${language.urlPrefix}`;
        }
        // Default to English if locale not found
        return 'https://tempmails.online';
    }
}