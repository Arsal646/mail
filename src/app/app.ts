import { Component, OnInit, OnDestroy, signal, effect, Inject, PLATFORM_ID, inject } from '@angular/core';
import { EmailService } from './services/email';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EmailViewDialog } from './compoents/email-view-dialog/email-view-dialog';
import { MatDialog } from '@angular/material/dialog';
import { NewEmailModalComponent } from './compoents/new-email-modal/new-email-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule],
})
export class App implements OnInit, OnDestroy {
  countdown = signal(15);
  private countdownSub?: Subscription;

  currentEmail = '';
  emails: any[] = [];
  loading = false;
  refreshing = false;
  copied = false;
  emailGenerating = false;
  isBrowser = false;

  private domain = '@tempmails.online';

  constructor(private emailService: EmailService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.generateNewEmail();
    this.refreshEmails()
    //this.startCountdown();
  }

  ngOnDestroy(): void {
    this.countdownSub?.unsubscribe();
  }

  startCountdown(): void {
    this.countdown.set(15);

    // Emits every second for 15 ticks
    this.countdownSub = interval(1000).pipe(take(16)).subscribe((i) => {
      this.countdown.set(15 - i);
    });
  }

  generateNewEmail(): void {
    if (!this.isBrowser) return;

    this.emailGenerating = true;
    this.currentEmail = '';

    const domain = this.domain;
    const stored = localStorage.getItem('tempMailAccounts');
    const accounts = stored ? JSON.parse(stored) : [];

    // ✅ Use existing active email if available
    const activeAccount = accounts.find((acc: any) => acc.active === true);

    if (activeAccount) {
      this.currentEmail = activeAccount.address;
      this.emailGenerating = false;
      this.refreshEmails();
    } else {
      // ⏳ Simulate email generation delay
      setTimeout(() => {
        const newEmail = this.createEmailObject(domain);
        accounts.push(newEmail);
        localStorage.setItem('tempMailAccounts', JSON.stringify(accounts));
        this.currentEmail = newEmail.address;
        this.emails = [];
        this.refreshEmails();
        this.emailGenerating = false;
      }, 1000);
    }
  }

  private createEmailObject(domain: string, email_prefix = ''): any {
    const username = email_prefix || Math.random().toString(36).substring(2, 10);
    const now = Date.now();
    const expiresIn = 60 * 60 * 1000; // 1 hour
    return {
      address: `${username}${domain}`,
      createdAt: now,
      expiresAt: now + expiresIn,
      active: true
    };
  }

  autoGenerateEmail(email_prefix = ''): void {
    if (!this.isBrowser) return;

    this.emailGenerating = true;
    this.currentEmail = '';

    const domain = this.domain;
    const stored = localStorage.getItem('tempMailAccounts');
    const accounts = stored ? JSON.parse(stored) : [];

    // ❌ Mark all old as inactive
    for (const acc of accounts) {
      acc.active = false;
    }

    // ⏳ Simulate delay for new email generation
    setTimeout(() => {
      const newEmail = this.createEmailObject(domain, email_prefix);
      accounts.push(newEmail);
      localStorage.setItem('tempMailAccounts', JSON.stringify(accounts));
      this.currentEmail = newEmail.address;
      this.emails = [];
      this.refreshEmails();
      this.emailGenerating = false;
    }, 1000);
  }



  refreshEmails(): void {
    if (!this.currentEmail) return;

    this.loading = true;
    this.refreshing = true;

    this.emailService.fetchEmails().subscribe({
      next: (res: any) => {
        this.emails = res;
        this.loading = false;
        this.refreshing = false;
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

  toggleEmailRead(email: any): void {
    email.read = !email.read;
  }

  dialog = inject(MatDialog)

  viewEmail(email: any): void {
    const dialogRef = this.dialog.open(EmailViewDialog, {
      width: '80vw',
      maxWidth: '800px',
      maxHeight: '90vh',
      panelClass: 'email-dialog',
      data: { ...email } // Pass the email data to the dialog
    });

  }

  // In your main component
  getFullEmailHistory() {
    // This would come from your actual service/API in production
    const dummyEmails = [
      {
        "address": "dfv1tcqi@tempmails.online",
        "createdAt": 1752252538765,
        "active": true,
        "expiresAt": 1752256138765
      },
      {
        "address": "xzy123@tempmails.online",
        "createdAt": 1752152538765,
        "active": false,
        "expiresAt": 1752156138765
      },
      {
        "address": "abc456@tempmails.online",
        "createdAt": 1752052538765,
        "active": false,
        "expiresAt": 1752056138765
      }
    ];

    return dummyEmails;
  }

  openHistoryDialog() {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem('tempMailAccounts');
    const accounts = stored ? JSON.parse(stored) : [];
    const historyEmails = accounts.filter((acc: any) => acc.active === false);


    const dialogRef = this.dialog.open(NewEmailModalComponent, {
      width: '500px',
      data: {
        historyEmails,
        domain: this.domain
      }
    });

    // dialogRef.afterClosed().subscribe(selectedEmail => {
    //   // if (selectedEmail) {
    //   //   // Extract username from full email address
    //   //   const username = selectedEmail.split('@')[0];
    //   //   this.usernameControl.setValue(username);
    //   //   this.username = username;
    //   // }
    // });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
      // if (res === 'random') {
      //   this.autoGenerateEmail();
      // }

       if(res){
        this.autoGenerateEmail(res);
       }
    })
  }

  viewEmailDetails(email: any) {
  // Your detail view logic
}

confirmDelete(email: any) {
  // Your delete confirmation logic
}
}
