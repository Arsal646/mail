import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare let gtag: Function;

@Injectable({
    providedIn: 'root'
})
export class GoogleAnalyticsService {
    private isProduction = environment.production;

    constructor() {
        // Initialize gtag if in production
        if (this.isProduction && typeof gtag !== 'undefined') {
            console.log('prod... ');
            gtag('config', environment.googleAnalyticsId, {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    // Track page views
    trackPageView(url: string, title?: string): void {
        // Temporarily allow dev mode for testing - remove this condition later
        if ((this.isProduction) && typeof gtag !== 'undefined') {
            console.log('prod2... ');
            console.log('GA Page View:', url, title); // Debug logging
            gtag('config', environment.googleAnalyticsId, {
                page_path: url,
                page_title: title || document.title
            });
        }
    }

    // Track custom events
    trackEvent(eventName: string, parameters?: any): void {
        // Temporarily allow dev mode for testing - remove this condition later
        if ((this.isProduction) && typeof gtag !== 'undefined') {
            console.log('GA Event:', eventName, parameters); // Debug logging
            gtag('event', eventName, parameters);
        } else {
            console.log('GA Event (dev mode - gtag not available):', eventName, parameters);
        }
    }

    trackEmailView(): void {
        this.trackEvent('email_view', {
            event_category: 'engagement',
            event_label: 'temporary_email_view'
        });
    }

    trackEmailCopied(): void {
        this.trackEvent('email_copied', {
            event_category: 'engagement',
            event_label: 'email_address_copied'
        });
    }

    trackEmailRefreshed(): void {
        this.trackEvent('email_refreshed', {
            event_category: 'engagement',
            event_label: 'inbox_refreshed'
        });
    }

    trackExtensionDownload(browser: string): void {
        this.trackEvent('extension_download', {
            event_category: 'conversion',
            event_label: browser,
            browser_type: browser
        });
    }
}