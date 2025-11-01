import { Component, inject, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouteTranslationService } from '../../services/route-translation.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Footer -->
    <footer class="bg-gradient-to-r from-neutral-50 to-neutral-100 border-t border-neutral-200 mt-16">
      <div class="container mx-auto px-4 py-12">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <!-- Branding Section -->
          <div class="flex items-center gap-4">
            <div class="bg-white rounded-full p-3 shadow-md border border-neutral-200 flex-shrink-0">
              <img 
                src="logo.png" 
                alt="Temporary Email Service Logo" 
                class="w-12 h-12 object-contain"
                width="48"
                height="48"
              >
            </div>
            <div>
              <h2 i18n="@@footer.title" class="text-base font-bold text-neutral-900">Temporary Email Service</h2>
              <p i18n="@@footer.subtitle" class="text-sm text-neutral-600">Secure, disposable email addresses</p>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav aria-label="Footer Navigation">
            <div class="flex flex-wrap justify-center gap-4 text-sm">
              <a i18n="@@footer.privacyPolicy"
                [routerLink]="routes.privacy"
                class="text-neutral-600 hover:text-primary-600 transition-all duration-200 hover:underline underline-offset-4"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </a>
              <a i18n="@@footer.termsConditions"
                [routerLink]="routes.terms"
                class="text-neutral-600 hover:text-primary-600 transition-all duration-200 hover:underline underline-offset-4"
                aria-label="Terms & Conditions"
              >
                 Terms & Conditions
              </a>
            </div>
          </nav>

          <!-- Language Toggle -->
          <div class="relative">
            <button 
              (click)="toggleDropdown()"
              class="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-600 hover:text-primary-600 bg-white border border-neutral-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <span>{{ currentLanguage.flag }}</span>
              <span class="hidden sm:inline">{{ currentLanguage.name }}</span>
              <svg class="w-4 h-4" [class.rotate-180]="isDropdownOpen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <div 
              *ngIf="isDropdownOpen"
              class="absolute bottom-full right-0 mb-3 w-44 bg-white/95 backdrop-blur-sm border border-neutral-200 rounded-xl shadow-xl z-50 animate-scale-in"
            >
              <button
                *ngFor="let lang of languages"
                (click)="switchLanguage(lang.code)"
                class="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 rounded-lg mx-1"
                [class.bg-primary-100]="lang.code === currentLanguage.code"
                [class.text-primary-700]="lang.code === currentLanguage.code"
              >
                <span>{{ lang.flag }}</span>
                <span>{{ lang.name }}</span>
              </button>
            </div>
          </div>

        </div>

             <a
                href="https://www.goodfirms.co/email-management-software/"
                target="_blank"
                
                class="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-all duration-200 mb-3 hover:transform hover:scale-105"
                aria-label="GoodFirms Email Management Software"
              >
       
              <img
  src="GF-Blue-2.png"
  alt="GoodFirms badge"
  class="h-8 w-auto"
  width="123"
  height="32"
  loading="lazy"
  style="filter: grayscale(100%);"
/>

                <span class="text-sm">Listed on GoodFirms</span>
              </a>

                           <!-- Copyright + Logo -->
        <div class="pt-6 border-t border-neutral-200">
          <div class="flex flex-col items-center gap-3 text-center">
            <p i18n="@@footer.copyright" class="text-sm text-neutral-500 font-medium">
              © {{ currentYear }} Temporary Email Service. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  isDropdownOpen = false;

  private routeTranslation = inject(RouteTranslationService);
  private locale = inject(LOCALE_ID);
  private document = inject(DOCUMENT);


  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];


  get currentLanguage() {
    return this.languages.find(lang => lang.code === this.locale || lang.code === this.locale.split('-')[0]) || this.languages[0];
  }

  get routes() {
    return {
      home: '',
      email10min: '10-minutes-temporary-email',
      email20min: '20-minutes-temporary-email',
      email30min: '30-minutes-temporary-email',
      privacy: 'privacy-policy',
      terms: 'terms-and-conditions'
    };
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  switchLanguage(langCode: string) {
    this.isDropdownOpen = false;
    const currentPath = this.document.location.pathname;
    const domain = this.document.location.origin;

    // Remove current locale prefix
    let newPath = currentPath.replace(/^\/ar/, '');

    // Add new locale prefix if not English
    if (langCode === 'ar') {
      newPath = '/ar' + newPath;
    }
    if (langCode === 'ru') {
      newPath = '/ru' + newPath;
    }
    if (langCode === 'fr') {
      newPath = '/fr' + newPath;
    }

    if (langCode === 'en') {
      newPath = domain;
    }


    this.document.location.href = newPath;
  }
}


