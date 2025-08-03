import { Injectable, inject, LOCALE_ID } from '@angular/core';

export interface RouteTranslation {
  [key: string]: {
    [locale: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RouteTranslationService {
  private locale = inject(LOCALE_ID);

  // Route translations for different languages
  private routeTranslations: RouteTranslation = {
    'home': {
      'en': '',
      'ar': ''
    },
    'email-10min': {
      'en': '10-minutes-temporary-email',
      'ar': '10-دقائق-بريد-مؤقت'
    },
    'email-20min': {
      'en': '20-minutes-temporary-email', 
      'ar': '20-دقيقة-بريد-مؤقت'
    },
    'email-30min': {
      'en': '30-minutes-temporary-email',
      'ar': '30-دقيقة-بريد-مؤقت'
    },
    'privacy-policy': {
      'en': 'privacy-policy',
      'ar': 'سياسة-الخصوصية'
    },
    'saved': {
      'en': 'saved',
      'ar': 'محفوظ'
    }
  };

  /**
   * Get the translated route for the current locale
   */
  getRoute(routeKey: string): string {
    const translations = this.routeTranslations[routeKey];
    if (!translations) {
      console.warn(`No translation found for route key: ${routeKey}`);
      return routeKey;
    }

    return translations[this.locale] || translations['en'] || routeKey;
  }

  /**
   * Get the translated route for a specific locale
   */
  getRouteForLocale(routeKey: string, locale: string): string {
    const translations = this.routeTranslations[routeKey];
    if (!translations) {
      return routeKey;
    }

    return translations[locale] || translations['en'] || routeKey;
  }

  /**
   * Get all routes for the current locale
   */
  getAllRoutes(): { [key: string]: string } {
    const routes: { [key: string]: string } = {};
    
    Object.keys(this.routeTranslations).forEach(key => {
      routes[key] = this.getRoute(key);
    });

    return routes;
  }

  /**
   * Get the route key from a translated path
   */
  getRouteKey(translatedPath: string): string | null {
    for (const [key, translations] of Object.entries(this.routeTranslations)) {
      for (const [locale, path] of Object.entries(translations)) {
        if (path === translatedPath) {
          return key;
        }
      }
    }
    return null;
  }

  /**
   * Generate URL for a route in the current locale
   */
  generateUrl(routeKey: string, params?: { [key: string]: string }): string {
    const basePath = this.getRoute(routeKey);
    const localePrefix = this.locale === 'ar' ? '/ar' : '';
    
    let url = `${localePrefix}/${basePath}`;
    
    // Handle parameters (like :token)
    if (params) {
      Object.keys(params).forEach(param => {
        url = url.replace(`:${param}`, params[param]);
      });
    }

    // Clean up double slashes and trailing slashes
    return url.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  }

  /**
   * Add a new route translation
   */
  addRouteTranslation(routeKey: string, translations: { [locale: string]: string }): void {
    this.routeTranslations[routeKey] = {
      ...this.routeTranslations[routeKey],
      ...translations
    };
  }
}