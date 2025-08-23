import {
  Component,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouteTranslationService } from '../../services/route-translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  template: `
    <header class="bg-white shadow-sm relative">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <!-- Logo + Status -->
          <div class="flex items-center space-x-3">
            <div class="relative">
              <div class="bg-gray-800 rounded-full flex items-center justify-center">
                <img
                  [routerLink]="['/']"
                  (pointerup)="closeMenu(); $event.stopPropagation()"
                  class="cursor-pointer"
                  src="logo.png"
                  alt="Temporary Email Service Logo"
                  style="width: 100px;"
                  i18n-alt="@@header.logo.alt"
                >
              </div>
            </div>
            <div class="select-none">
              <div class="flex items-center">
                <span i18n="@@header.online" class="text-xs text-green-700 font-medium tracking-tight">Online</span>
                <span class="ml-1 w-2 h-2 bg-green-700 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>

          <!-- Desktop Menu -->
          <nav class="hidden md:flex items-center space-x-1 md:space-x-2">
            <a [routerLink]="['/']" routerLinkActive="font-semibold" [routerLinkActiveOptions]="{ exact: true }"
               #home="routerLinkActive"
               class="py-2 px-3 text-sm hover:text-blue-600 tracking-tight antialiased"
               [class.text-gray-900]="home.isActive"
               [class.text-gray-700]="!home.isActive"
               [attr.aria-current]="home.isActive ? 'page' : null"
               i18n="@@nav.home">Home</a>

            <a [routerLink]="['/about']" routerLinkActive="font-semibold"
               #about="routerLinkActive"
               class="py-2 px-3 text-sm hover:text-blue-600 tracking-tight antialiased"
               [class.text-gray-900]="about.isActive"
               [class.text-gray-700]="!about.isActive"
               [attr.aria-current]="about.isActive ? 'page' : null"
               i18n="@@nav.about">About</a>

            <a [routerLink]="['/services']" routerLinkActive="font-semibold"
               #services="routerLinkActive"
               class="py-2 px-3 text-sm hover:text-blue-600 tracking-tight antialiased"
               [class.text-gray-900]="services.isActive"
               [class.text-gray-700]="!services.isActive"
               [attr.aria-current]="services.isActive ? 'page' : null"
               i18n="@@nav.services">Services</a>

            <a [routerLink]="['/contact']" routerLinkActive="font-semibold"
               #contact="routerLinkActive"
               class="py-2 px-3 text-sm hover:text-blue-600 tracking-tight antialiased"
               [class.text-gray-900]="contact.isActive"
               [class.text-gray-700]="!contact.isActive"
               [attr.aria-current]="contact.isActive ? 'page' : null"
               i18n="@@nav.contact">Contact</a>
          </nav>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button
              #menuButton
              type="button"
              (pointerup)="onToggleButton($event)"
              class="focus:outline-none touch-manipulation"
              [attr.aria-expanded]="menuOpen"
              aria-label="Toggle menu"
              i18n-aria-label="@@header.menu.toggle">
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div #menuPanel
           class="absolute left-0 w-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out md:hidden overflow-hidden transform"
           [style.top]="'71px'"
           [class.opacity-100]="menuOpen"
           [class.opacity-0]="!menuOpen"
           [class.translate-y-0]="menuOpen"
           [class.-translate-y-4]="!menuOpen"
           [style.maxHeight]="menuOpen ? '320px' : '0'"
           (pointerdown)="$event.stopPropagation()"
           (pointerup)="$event.stopPropagation()">
        <div class="p-4">
          <a [routerLink]="['/']" [routerLinkActiveOptions]="{ exact: true }"
             routerLinkActive="font-semibold bg-gray-100"
             #mHome="routerLinkActive"
             class="block py-2 px-4 text-base rounded-md tracking-tight antialiased"
             [class.text-gray-900]="mHome.isActive"
             [class.text-gray-700]="!mHome.isActive"
             [attr.aria-current]="mHome.isActive ? 'page' : null"
             (pointerup)="linkClick($event)"
             i18n="@@nav.home">Home</a>

          <a [routerLink]="['/about']" routerLinkActive="font-semibold bg-gray-100"
             #mAbout="routerLinkActive"
             class="block py-2 px-4 text-base rounded-md tracking-tight antialiased"
             [class.text-gray-900]="mAbout.isActive"
             [class.text-gray-700]="!mAbout.isActive"
             [attr.aria-current]="mAbout.isActive ? 'page' : null"
             (pointerup)="linkClick($event)"
             i18n="@@nav.about">About</a>

          <a [routerLink]="['/services']" routerLinkActive="font-semibold bg-gray-100"
             #mServices="routerLinkActive"
             class="block py-2 px-4 text-base rounded-md tracking-tight antialiased"
             [class.text-gray-900]="mServices.isActive"
             [class.text-gray-700]="!mServices.isActive"
             [attr.aria-current]="mServices.isActive ? 'page' : null"
             (pointerup)="linkClick($event)"
             i18n="@@nav.services">Services</a>

          <a [routerLink]="['/contact']" routerLinkActive="font-semibold bg-gray-100"
             #mContact="routerLinkActive"
             class="block py-2 px-4 text-base rounded-md tracking-tight antialiased"
             [class.text-gray-900]="mContact.isActive"
             [class.text-gray-700]="!mContact.isActive"
             [attr.aria-current]="mContact.isActive ? 'page' : null"
             (pointerup)="linkClick($event)"
             i18n="@@nav.contact">Contact</a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  @Output() refreshClick = new EventEmitter<void>();
  @ViewChild('menuPanel') menuPanel!: ElementRef<HTMLElement>;
  @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;

  refreshing = false;
  menuOpen = false;

  private router = inject(Router);
  private routeTranslation = inject(RouteTranslationService);

  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.closeMenu());
  }

  // Outside click using a single pointer listener
  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointer(event: PointerEvent) {
    if (!this.menuOpen) return;
    const target = event.target as Node;
    const insidePanel = this.menuPanel?.nativeElement.contains(target);
    const onButton = this.menuButton?.nativeElement.contains(target);
    if (!insidePanel && !onButton) this.closeMenu();
  }

  onToggleButton(event: PointerEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.menuOpen = !this.menuOpen;
  }

  linkClick(event: PointerEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.closeMenu();
  }

  onRefreshClick() {
    this.refreshing = true;
    this.refreshClick.emit();
    setTimeout(() => (this.refreshing = false), 1000);
  }

  closeMenu() { this.menuOpen = false; }
}
