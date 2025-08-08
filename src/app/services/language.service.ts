import { Injectable, inject, LOCALE_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
    urlPrefix: string;
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private document = inject(DOCUMENT);
    private currentLocale = inject(LOCALE_ID);

    // Supported languages
    private supportedLanguages: Language[] = [
        {
            code: 'en',
            name: 'English',
            nativeName: 'English',
            flag: '🇺🇸',
            urlPrefix: ''
        },
        {
            code: 'ar',
            name: 'Arabic',
            nativeName: 'العربية',
            flag: '🇸🇦',
            urlPrefix: '/ar'
        }
    ];

    /**
     * Get all supported languages
     */
    getSupportedLanguages(): Language[] {
        return this.supportedLanguages;
    }

    /**
     * Get current language
     */
    getCurrentLanguage(): Language {
        const currentLang = this.supportedLanguages.find(lang =>
            lang.code === this.currentLocale || lang.code === this.currentLocale.split('-')[0]
        );
        return currentLang || this.supportedLanguages[0];
    }

    /**
     * Switch to a different language
     */
    switchLanguage(languageCode: string): void {
        const targetLanguage = this.supportedLanguages.find(lang => lang.code === languageCode);
        if (!targetLanguage) {
            console.warn(`Language ${languageCode} not supported`);
            return;
        }

        // Get current path without locale prefix
        let currentPath = this.document.location.pathname;

        // Remove current locale prefix if exists
        this.supportedLanguages.forEach(lang => {
            if (lang.urlPrefix && currentPath.startsWith(lang.urlPrefix)) {
                currentPath = currentPath.replace(lang.urlPrefix, '');
            }
        });

        // Ensure path starts with /
        if (!currentPath.startsWith('/')) {
            currentPath = '/' + currentPath;
        }

        // Build new URL with target language prefix
        const newUrl = `${targetLanguage.urlPrefix}${currentPath}`;

        // Navigate to new URL
        this.document.location.href = newUrl;
    }

    /**
     * Add a new language (for future expansion)
     */
    addLanguage(language: Language): void {
        const existingIndex = this.supportedLanguages.findIndex(lang => lang.code === language.code);
        if (existingIndex === -1) {
            this.supportedLanguages.push(language);
        } else {
            this.supportedLanguages[existingIndex] = language;
        }
    }
}