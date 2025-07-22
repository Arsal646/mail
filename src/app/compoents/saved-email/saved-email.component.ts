import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { log } from 'console';
import { EmailService } from '../../services/email';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-saved-email',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        
        <!-- Loading State -->
        <div *ngIf="loading" class="space-y-4">
          <lucide-icon name="loader-2" [size]="48" class="text-blue-600 animate-spin mx-auto"></lucide-icon>
          <h2 class="text-xl font-semibold text-gray-900">{{ 'VERIFYING_ACCESS_LINK' | translate }}</h2>
          <p class="text-gray-600">{{ 'PLEASE_WAIT_VERIFY' | translate }}</p>
        </div>

        <!-- Success State -->
        <div *ngIf="!loading && emailData" class="space-y-4">
          <lucide-icon name="check-circle" [size]="48" class="text-green-600 mx-auto"></lucide-icon>
          <h2 class="text-xl font-semibold text-gray-900">{{ 'ACCESS_VERIFIED' | translate }}</h2>
          <p class="text-gray-600">{{ 'REDIRECTING_TO_INBOX' | translate }}</p>
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-sm font-mono text-gray-800">{{emailData.email_address}}</p>
            <p class="text-xs text-gray-500 mt-1">{{emailData.days_remaining}} {{ 'DAYS_REMAINING' | translate }}</p>
          </div>
        </div>

        <!-- Error State -->
        <div *ngIf="!loading && error" class="space-y-4">
          <lucide-icon name="x-circle" [size]="48" class="text-red-600 mx-auto"></lucide-icon>
          <h2 class="text-xl font-semibold text-gray-900">{{ 'ACCESS_LINK_INVALID' | translate }}</h2>
          <p class="text-gray-600">{{error}}</p>
          <button (click)="goHome()" 
                  class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            {{ 'GENERATE_NEW_EMAIL' | translate }}
          </button>
        </div>

      </div>
    </div>
  `
})
export class SavedEmailComponent implements OnInit {
  loading = true;
  emailData: any = null;
  error = '';
  isBrowser = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private emailService: EmailService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('SavedEmailComponent constructor called!');
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('isBrowser:', this.isBrowser);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.verifyToken(token);
    } else {
      this.error = 'Invalid access link format';
      this.loading = false;
    }
  }

  verifyToken(token: string): void {
    this.emailService.getSavedEmail(token).subscribe({
      next: (response) => {
        console.log(response);
        if (response.success) {
          this.emailData = response.data;
          this.loading = false;

          // Redirect to main app with the email
          setTimeout(() => {
            this.router.navigate(['/'], {
              queryParams: { email: this.emailData.email_address }
            });
          }, 2000);
        } else {
          this.error = response.message || 'Access link not found';
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error verifying token:', err);
        if (err.status === 404) {
          this.error = 'Access link not found or has been deleted';
        } else if (err.status === 410) {
          this.error = 'Access link has expired (7 days limit)';
        } else {
          this.error = 'Unable to verify access link. Please try again.';
        }
        this.loading = false;
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}