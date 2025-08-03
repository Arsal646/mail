import { Component, OnInit, OnDestroy, signal, effect, Inject, PLATFORM_ID, inject, Input, HostListener } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule } from "lucide-angular";
import { RouterModule } from '@angular/router';
import { EmailService } from '../../services/email';
import { EmailViewDialog } from '../../compoents/email-view-dialog/email-view-dialog';
import { SaveSuccessDialogComponent } from '../../compoents/save-success-dialog/save-success-dialog.component';

@Component({
  selector: 'app-quick-email',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './quick-email.component.html',
  styleUrls: ['./quick-email.component.css']
})
export class QuickEmailComponent implements OnInit, OnDestroy {
  @Input() pageTimeCount: number = 10;
  countdown = signal(10);
  timeRemaining = signal(this.pageTimeCount * 60); // Convert minutes to seconds
  private countdownSub?: Subscription;
  private timeRemainingSub?: Subscription;

  currentEmail = '';
  emails: any[] = [];
  loading = false;
  refreshing = false;
  copied = false;
  saved = false;
  emailGenerating = false;
  isBrowser = false;
  emailExpired = false;

  private domain = '@tempmails.online';

  constructor(
    private emailService: EmailService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    effect(() => {
      if (this.countdown() === 0) {
        this.reload();
      }
    });

    effect(() => {
      if (this.timeRemaining() === 0) {
        this.expireEmail();
      }
    });
  }

  // Listen for header refresh events
  @HostListener('window:headerRefresh')
  onHeaderRefresh() {
    this.refreshEmails();
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    
    this.loadStateFromStorage();
    
    // Only generate new email if no valid state was loaded
    if (!this.currentEmail || this.emailExpired) {
      this.generateQuickEmail();
    }
    
    this.reload();
    this.startTimeRemainingCountdown();
  }

  ngOnDestroy(): void {
    this.countdownSub?.unsubscribe();
    this.timeRemainingSub?.unsubscribe();
  }

  startTimeRemainingCountdown(): void {
    this.timeRemainingSub?.unsubscribe();
    this.timeRemaining.set(this.pageTimeCount * 60); // Convert minutes to seconds

    this.timeRemainingSub = interval(1000).subscribe(() => {
      const current = this.timeRemaining();
      if (current > 0) {
        this.timeRemaining.set(current - 1);
        this.saveStateToStorage(); // Save state every second
      }
    });
  }

  formatTimeRemaining(): string {
    const minutes = Math.floor(this.timeRemaining() / 60);
    const seconds = this.timeRemaining() % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  expireEmail(): void {
    this.emailExpired = true;
    this.currentEmail = '';
    this.emails = [];
    this.timeRemaining.set(0);
    this.saveStateToStorage();
  }

  reload() {
    this.refreshEmails();
    this.startCountdown();
  }

  startCountdown(): void {
    this.countdownSub?.unsubscribe();
    this.countdown.set(10);

    this.countdownSub = interval(1000).pipe(take(11)).subscribe((i) => {
      if (this.loading) {
        this.countdown.set(10);
      } else {
        this.countdown.set(10 - i);
      }
    });
  }

  generateQuickEmail(): void {
    if (!this.isBrowser) return;

    this.emailGenerating = true;
    this.currentEmail = '';
    this.emailExpired = false;

    const domain = this.domain;
    const username = Math.random().toString(36).substring(2, 10);
    const newEmail = `${username}${domain}`;

    // Simulate email generation delay
    setTimeout(() => {
      this.currentEmail = newEmail;
      this.emails = [];
      this.refreshEmails();
      this.emailGenerating = false;
      this.startTimeRemainingCountdown();
      this.saveStateToStorage();
    }, 1000);
  }

  refreshEmails(): void {
    if (!this.currentEmail || this.emailExpired) return;

    this.loading = true;
    this.refreshing = true;

    this.emailService.fetchEmails(this.currentEmail).subscribe({
      next: (res: any) => {
        this.emails = [...res];
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.refreshing = false;
        this.startCountdown();
        this.saveStateToStorage();
      },
      error: (err) => {
        console.error('Error fetching emails:', err);
        this.loading = false;
        this.refreshing = false;
      },
    });
  }

  copyEmail(): void {
    if (!this.currentEmail) return;

    navigator.clipboard.writeText(this.currentEmail).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }

  dialog = inject(MatDialog);

  viewEmail(email: any): void {
    const dialogRef = this.dialog.open(EmailViewDialog, {
      width: '90vw',
      maxWidth: '800px',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'custom-dialog',
      data: { ...email }
    });
  }

  saveEmail(): void {
    if (!this.currentEmail) return;
    this.loading = true;

    this.emailService.saveEmailToBackend(this.currentEmail).subscribe({
      next: (response) => {
        if (response.success) {
          this.saved = true;
          this.loading = false;
          
          const accessUrl = response.data.access_url;
          navigator.clipboard.writeText(accessUrl).then(() => {
            console.log('Access link copied automatically');
          });

          this.dialog.open(SaveSuccessDialogComponent, {
            width: '520px',
            maxWidth: '90vw',
            disableClose: false,
            data: {
              emailAddress: this.currentEmail,
              accessUrl: response.data.access_url,
              expiresAtFormatted: response.data.expires_at_formatted
            }
          });

          setTimeout(() => {
            this.saved = false;
          }, 3000);
        }
      },
      error: (error) => {
        console.error('Error saving email:', error);
        // TODO: Replace alert with proper i18n toast notification
        alert('Failed to save email. Please try again.');
      }
    });
  }

  generateNewQuickEmail(): void {
    this.generateQuickEmail();
  }

  resetTimer(): void {
    this.startTimeRemainingCountdown();
    this.saveStateToStorage();
  }

  private saveStateToStorage(): void {
    if (!this.isBrowser) return;
    
    const state = {
      currentEmail: this.currentEmail,
      timeRemaining: this.timeRemaining(),
      emailExpired: this.emailExpired,
      emails: this.emails,
      lastUpdated: Date.now()
    };
    
    localStorage.setItem(`quickEmailState_${this.pageTimeCount}`, JSON.stringify(state));
  }

  private loadStateFromStorage(): void {
    if (!this.isBrowser) return;
    
    try {
      const savedState = localStorage.getItem(`quickEmailState_${this.pageTimeCount}`);
      if (savedState) {
        const state = JSON.parse(savedState);
        const now = Date.now();
        const timeDiff = Math.floor((now - state.lastUpdated) / 1000); // seconds passed
        
        // Check if state is still valid (not expired)
        if (state.currentEmail && !state.emailExpired) {
          this.currentEmail = state.currentEmail;
          this.emails = state.emails || [];
          this.emailExpired = state.emailExpired;
          
          // Calculate remaining time
          const remainingTime = Math.max(0, state.timeRemaining - timeDiff);
          this.timeRemaining.set(remainingTime);
          
          // If time has expired, mark as expired
          if (remainingTime <= 0) {
            this.emailExpired = true;
            this.currentEmail = '';
            this.emails = [];
            this.timeRemaining.set(0);
          }
        }
      }
    } catch (error) {
      console.error('Error loading state from storage:', error);
      // Clear corrupted state
      localStorage.removeItem(`quickEmailState_${this.pageTimeCount}`);
    }
  }

  private clearStateFromStorage(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(`quickEmailState_${this.pageTimeCount}`);
  }
} 