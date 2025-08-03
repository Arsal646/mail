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
    <!-- Header with Online Status -->
    <header class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <div class="relative">
                        <div class=" bg-gray-800 rounded-full flex items-center justify-center">
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
                <button (click)="onRefreshClick()"
                    class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-full">
                    <lucide-icon name="refresh-cw" [size]="18" [class.animate-spin]="refreshing"></lucide-icon>
                </button>
            </div>
        </div>
    </header>
  `
})
export class HeaderComponent {
  @Output() refreshClick = new EventEmitter<void>();
  
  refreshing = false;
  private routeTranslation = inject(RouteTranslationService);

  get homeRoute() {
    return this.routeTranslation.getRoute('home');
  }

  onRefreshClick() {
    this.refreshing = true;
    this.refreshClick.emit();
    
    // Reset the spinning state after a short delay
    setTimeout(() => {
      this.refreshing = false;
    }, 1000);
  }
} 