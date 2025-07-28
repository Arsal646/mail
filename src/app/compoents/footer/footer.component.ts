import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Footer -->
    <footer class="bg-gray-50 border-t border-gray-200 mt-12">
        <div class="container mx-auto px-4 py-6">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="flex items-center space-x-3 mb-4 md:mb-0">
                    <div class="bg-gray-800 rounded-full flex items-center justify-center">
                        <img src="logo.png" alt="Temporary Email Service Logo" style="width: 60px;">
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900">Temporary Email Service</h3>
                        <p class="text-xs text-gray-600">Free disposable email addresses</p>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                    <div class="flex flex-wrap items-center gap-2 text-sm">
                        <a routerLink="/" class="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
                        <span class="text-gray-400">|</span>
                        <a routerLink="/10-minutes-temporary-email/" class="text-gray-600 hover:text-gray-900 transition-colors">10 Minute Email</a>
                        <span class="text-gray-400">|</span>
                        <a routerLink="/privacy-policy" class="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
                    </div>
                    <span class="text-xs text-gray-400">© 2024 Temporary Email Service. All rights reserved.</span>
                </div>
            </div>
        </div>
    </footer>
  `
})
export class FooterComponent {
} 