import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from "lucide-angular";
import { RouterModule } from '@angular/router';
import { RouteTranslationService } from '../../services/route-translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  template: `
    <header class="bg-white shadow-sm relative">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <div class="bg-gray-800 rounded-full flex items-center justify-center">
                <img [routerLink]="homeRoute" class="cursor-pointer" src="logo.png" alt="Temporary Email Service Logo" style="width: 100px;">
              </div>
            </div>
            <div>
              <div class="flex items-center">
                <span i18n="@@header.online" class="text-xs text-green-700">Online</span>
                <span class="ml-1 w-2 h-2 bg-green-700 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>

          <!-- Desktop Menu -->
          <nav class="hidden md:flex items-center space-x-4">
            <a routerLink="/home" class="py-2 px-3 text-gray-700 hover:text-blue-500">Home</a>
            <a routerLink="/about" class="py-2 px-3 text-gray-700 hover:text-blue-500">About</a>
            <a routerLink="/services" class="py-2 px-3 text-gray-700 hover:text-blue-500">Services</a>
            <a routerLink="/contact" class="py-2 px-3 text-gray-700 hover:text-blue-500">Contact</a>
          </nav>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button (click)="toggleMenu()" class="focus:outline-none">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu (From Below Header) -->
      <div class="absolute left-0 w-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out md:hidden overflow-hidden transform" [style.top]="'71px'" [class.opacity-100]="menuOpen" [class.opacity-0]="!menuOpen" [class.translate-y-0]="menuOpen" [class.-translate-y-4]="!menuOpen" [style.maxHeight]="menuOpen ? '300px' : '0'">
        <div class="p-4">
          <a routerLink="/home" class="block py-2 px-4 text-lg hover:bg-gray-200">Home</a>
          <a routerLink="/about" class="block py-2 px-4 text-lg hover:bg-gray-200">About</a>
          <a routerLink="/services" class="block py-2 px-4 text-lg hover:bg-gray-200">Services</a>
          <a routerLink="/contact" class="block py-2 px-4 text-lg hover:bg-gray-200">Contact</a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  @Output() refreshClick = new EventEmitter<void>();

  refreshing = false;
  menuOpen = false;
  private routeTranslation = inject(RouteTranslationService);

  get homeRoute() {
    return this.routeTranslation.getRoute('home');
  }

  onRefreshClick() {
    this.refreshing = true;
    this.refreshClick.emit();
    setTimeout(() => {
      this.refreshing = false;
    }, 1000);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
