import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Footer -->
    <footer class=" border-t border-gray-200 mt-12">
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <!-- Branding Section -->
          <div class="flex items-center gap-3">
            <div class=" rounded-full p-2 flex-shrink-0">
              <img 
                src="logo.png" 
                alt="Temporary Email Service Logo" 
                class="w-12 h-12 object-contain"
                width="48"
                height="48"
              >
            </div>
            <div>
              <h2 i18n="@@footer.title" class="text-sm font-semibold text-gray-900">Temporary Email Service</h2>
              <p i18n="@@footer.subtitle" class="text-xs text-gray-600">Secure, disposable email addresses</p>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav aria-label="Footer Navigation">
            <div class="flex flex-wrap justify-center gap-4 text-sm">
              <a i18n="@@footer.home"
                routerLink="/" 
                class="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Home"
              >
                Home
              </a>
              <a i18n="@@footer.10MinMail"
                routerLink="/10-minutes-temporary-email" 
                class="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="10 Minute Temporary Email"
              >
                10 Minutes Mail
              </a>
              <a i18n="@@footer.20MinMail"
                routerLink="/20-minutes-temporary-email" 
                class="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="20 Minute Temporary Email"
              >
                20 Minutes Mail
              </a>
              <a i18n="@@footer.30MinMail"
                routerLink="/30-minutes-temporary-email" 
                class="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="30 Minute Temporary Email"
              >
                30 Minutes Mail
              </a>
              <a i18n="@@footer.privacyPolicy"
                routerLink="/privacy-policy" 
                class="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </a>
            </div>
          </nav>

        </div>

             <!-- Copyright + Logo -->
        <div class="pt-4 border-t border-gray-200">
          <div class="flex flex-col items-center gap-2 text-center">
            <p i18n="@@footer.copyright" class="text-xs text-gray-500">
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
}