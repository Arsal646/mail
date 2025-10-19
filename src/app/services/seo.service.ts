import { Injectable, LOCALE_ID, inject } from '@angular/core';
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
    breadcrumbs?: { name: string; url: string }[];
    faq?: { question: string; answer: string }[];
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
    private localeId = inject(LOCALE_ID);

    // Supported languages configuration
    private supportedLanguages: LanguageConfig[] = [
        { code: 'en', urlPrefix: '', isDefault: true },
        { code: 'ar', urlPrefix: '/ar', isDefault: false },
        { code: 'fr', urlPrefix: '/fr', isDefault: false },
        { code: 'ru', urlPrefix: '/ru', isDefault: false }
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

        // JSON-LD structured data (@graph)
        this.injectStructuredData({
            title: seoData.title,
            description: seoData.description,
            url: seoData.ogUrl,
            image: seoData.ogImage,
            siteName: seoData.ogSiteName || 'TempMail4u',
            breadcrumbs: seoData.breadcrumbs,
            faq: seoData.faq
        });
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

    /**
     * Injects Organization, WebSite and WebPage JSON-LD into <head>.
     * It replaces prior injected blocks to avoid duplicates during navigation.
     */
    private injectStructuredData(params: { title: string; description: string; url?: string; image?: string; siteName: string; breadcrumbs?: {name:string;url:string}[]; faq?: {question:string;answer:string}[]; }): void {
        // Clean previously injected JSON-LD blocks and prior graph
        ['Organization','WebSite','WebPage','WebApplication','Service','BreadcrumbList','FAQPage','Graph']
          .forEach(key => this.removeJsonLdByKey(key));

        const siteUrl = 'https://tempmail4u.com';
        const inLanguage = this.localeId || 'en';

        // Organization with logo object and sameAs
        const organization = {
            '@type': 'Organization',
            '@id': `${siteUrl}#organization`,
            name: params.siteName,
            url: siteUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/logo.png`
            },
            sameAs: [
              `${siteUrl}`,
              'https://twitter.com/tempmails',
              'https://x.com/tempmails'
            ]
        } as const;

        // WebSite with SearchAction
        const website = {
            '@type': 'WebSite',
            '@id': `${siteUrl}#website`,
            name: params.siteName,
            url: siteUrl,
            inLanguage,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
        } as const;

        // WebApplication (software app) with free offer
        const webApp = {
            '@type': 'WebApplication',
            '@id': `${siteUrl}#webapp`,
            name: params.siteName,
            url: siteUrl,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            browserRequirements: 'Requires JavaScript; modern web browser',
            isAccessibleForFree: true,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              category: 'free'
            },
            publisher: { '@id': `${siteUrl}#organization` }
        } as const;

        // Service offered (temporary email)
        const languages = this.supportedLanguages.map(l => l.code);
        const service = {
            '@type': 'Service',
            '@id': `${siteUrl}#service`,
            name: 'Temporary Email Service',
            serviceType: 'Temporary email, Disposable inbox, Burner email',
            provider: { '@id': `${siteUrl}#organization` },
            areaServed: 'Worldwide',
            availableLanguage: languages,
            isAccessibleForFree: true,
            url: siteUrl
        } as const;

        // WebPage (per route) linking back to Organization
        const webPage: any = {
            '@type': 'WebPage',
            '@id': (params.url ? `${params.url}#webpage` : `${siteUrl}#webpage`),
            name: params.title,
            description: params.description,
            isPartOf: { '@id': `${siteUrl}#website` },
            publisher: { '@id': `${siteUrl}#organization` },
            about: { '@id': `${siteUrl}#organization` },
            inLanguage
        };
        if (params.url) {
            webPage.url = params.url;
        }
        if (params.image) {
            webPage.primaryImageOfPage = {
                '@type': 'ImageObject',
                contentUrl: params.image
            };
        }

        const graph: any[] = [organization, website, webApp, service, webPage];

        // BreadcrumbList (optional)
        if (params.breadcrumbs && params.breadcrumbs.length) {
            const breadcrumb = {
                '@type': 'BreadcrumbList',
                itemListElement: params.breadcrumbs.map((b, idx) => ({
                    '@type': 'ListItem',
                    position: idx + 1,
                    name: b.name,
                    item: b.url
                }))
            };
            graph.push(breadcrumb);
        }

        // FAQPage (optional)
        if (params.faq && params.faq.length) {
            const faq = {
                '@type': 'FAQPage',
                mainEntity: params.faq.map(q => ({
                    '@type': 'Question',
                    name: q.question,
                    acceptedAnswer: { '@type': 'Answer', text: q.answer }
                }))
            };
            graph.push(faq);
        }

        // Append single @graph script
        const script = this.document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-schema-key', 'Graph');
        script.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph
        });
        this.document.head.appendChild(script);
    }

    /**
     * Helper to append a JSON-LD script with a stable data key.
     */
    private appendJsonLd(key: string, data: unknown): void {
        const script = this.document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-schema-key', key);
        // Use textContent to avoid HTML parsing and preserve SSR safety
        script.textContent = JSON.stringify(data);
        this.document.head.appendChild(script);
    }

    /**
     * Removes a JSON-LD script by key to prevent duplicates.
     */
    private removeJsonLdByKey(key: string): void {
        const existing = this.document.querySelectorAll(`script[type="application/ld+json"][data-schema-key="${key}"]`);
        existing.forEach(s => s.remove());
    }

    private addHreflangTags(currentUrl: string): void {
        // Remove existing hreflang tags
        const existingTags = this.document.querySelectorAll('link[rel="alternate"][hreflang]');
        existingTags.forEach(tag => tag.remove());
    
        // Get the route key from the current URL
        const routeKey = this.getRouteKeyFromUrl(currentUrl);
        // Stop only if routeKey is null or undefined (allow empty string for / route)
        if (routeKey === null || routeKey === undefined) return;
    
        const head = this.document.getElementsByTagName('head')[0];
    
        // Build correct path: homepage = '/', otherwise '/routeKey'
        const buildPath = (key: string) => key === 'home' ? '/' : `/${key}`;
        
    
        // Add hreflang tags for all supported languages
        this.supportedLanguages.forEach(language => {
            const link = this.document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = language.code;
            link.href = `https://tempmail4u.com${language.urlPrefix}${buildPath(routeKey)}`;
            head.appendChild(link);
        });
    
        // Add x-default hreflang
        const defaultLanguage = this.supportedLanguages.find(lang => lang.isDefault);
        if (defaultLanguage) {
            const defaultLink = this.document.createElement('link');
            defaultLink.rel = 'alternate';
            defaultLink.hreflang = 'x-default';
            defaultLink.href = `https://tempmail4u.com${defaultLanguage.urlPrefix}${buildPath(routeKey)}`;
            head.appendChild(defaultLink);
        }
    }
    
    

    /**
     * Extract route key from URL for hreflang generation
     */
    private getRouteKeyFromUrl(url: string): string | null {
        let path = url.replace('https://tempmail4u.com', '');
        
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
            '':'home',
            '10-minutes-temporary-email': '10-minutes-temporary-email',
            '20-minutes-temporary-email': '20-minutes-temporary-email',
            '30-minutes-temporary-email': '30-minutes-temporary-email',
            'privacy-policy': 'privacy-policy',
            'about': 'about',
            'services': 'services',
            'contact': 'contact',
            'terms-and-conditions': 'terms-and-conditions',
            'temporary-email-for-facebook': 'temporary-email-for-facebook',
            'temporary-email-for-instagram': 'temporary-email-for-instagram',
            'temporary-email-for-twitter-x': 'temporary-email-for-twitter-x',
            'temporary-email-for-discord': 'temporary-email-for-discord',
            'temporary-email-for-tiktok': 'temporary-email-for-tiktok',
            'temporary-email-for-snapchat': 'temporary-email-for-snapchat',
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
            return `https://tempmail4u.com${language.urlPrefix}`;
        }
        // Default to English if locale not found
        return 'https://tempmail4u.com';
    }
}

