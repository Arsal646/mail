
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface EmailAccount {
  address: string;
  createdAt: number; // timestamp
  active: boolean;
  expiresAt: number; // timestamp
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  currentEmail = '';
  emails: any[] = [];
  domain = '@tempmails.online'; // Single domain as requested
  emailAccounts: EmailAccount[] = [];
  autoRefresh = true;
  refreshInterval = 30000; // 30 seconds
  refreshTimer: any = null;
  refreshing = false;
  copied = false;
  showSettings = false;
  showForwardModal = false;
  showNewEmailModal = false;
  showOldEmailsModal = false;
  autoGenerate = true;
  newEmailUsername = '';

  settings = {
    darkMode: false,
    notificationSound: true
  };

  forwardData = {
    from: '',
    to: '',
    subject: '',
    message: ''
  };

  constructor(private http:HttpClient) {
    this.loadFromLocalStorage();
    this.getEmail();
    //this.init();
  }

private loadFromLocalStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedAccounts = localStorage.getItem('tempMailAccounts');
    if (savedAccounts) {
      try {
        this.emailAccounts = JSON.parse(savedAccounts);
        // Clean up expired accounts
        this.emailAccounts = this.emailAccounts.filter(acc => acc.expiresAt > Date.now());
        this.saveToLocalStorage();
      } catch (e) {
        console.error('Failed to parse localStorage data:', e);
      }
    }
  }
}

private saveToLocalStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem('tempMailAccounts', JSON.stringify(this.emailAccounts));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }
}


  init() {
    this.getActiveEmail();
    // this.startAutoRefresh();
    // this.refreshEmails();
  }

  getActiveEmail(): string {
    // Check for existing active email
    // if(key === 'auto') return this.generateAutoEmail();
    
    const activeAccount = this.emailAccounts.find(acc => acc.active && acc.expiresAt > Date.now());
    
    if (activeAccount) {
      this.currentEmail = activeAccount.address;
      return this.currentEmail;
    }
    
    // No valid active email found, generate new one
    return this.generateNewEmail();
  }

  generateAutoEmail(){
    //this.getActiveEmail('auto')
  }

  generateNewEmail(): string {
    const randomString = Math.random().toString(36).substring(2, 10);
    this.currentEmail = `${randomString}${this.domain}`;
    
    // Mark all existing accounts as inactive
    this.emailAccounts.forEach(acc => acc.active = false);
    
    // Add new account with 1 hour expiration
    const newAccount: EmailAccount = {
      address: this.currentEmail,
      createdAt: Date.now(),
      active: true,
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour from now
    };
    
    this.emailAccounts.push(newAccount);
    this.saveToLocalStorage();
    
    // Clear emails for the new address
    this.emails = [];
    
    console.log('Generated new email:', this.currentEmail);
    return this.currentEmail;
  }

  getEmail() {
    this.refreshing = true;
    this.http.get('http://127.0.0.1:8000/api/fakeemails').subscribe(
      (res: any) => {
        this.emails = res;
        this.refreshing = false;
      },
      (err) => {
        console.error(err);
        this.refreshing = false;
      }
    );
  }

  copyEmail() {
    navigator.clipboard.writeText(this.currentEmail);
    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }

  refreshEmails() {
    this.getEmail();
  }

  startAutoRefresh() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
    
    if (this.autoRefresh) {
      this.refreshTimer = setInterval(() => {
        this.refreshEmails();
        this.checkEmailExpiration();
      }, this.refreshInterval);
    }
  }

  private checkEmailExpiration() {
    const activeAccount = this.emailAccounts.find(acc => acc.active);
    if (activeAccount && activeAccount.expiresAt <= Date.now()) {
      // Current email expired, generate new one
      activeAccount.active = false;
      this.saveToLocalStorage();
      this.generateNewEmail();
      this.refreshEmails();
    }
  }

  getCurrentEmails() {
    console.log(this.emails, this.currentEmail);
     return this.emails.filter(email => email.to_email === this.currentEmail);
    return this.emails;
  }

  toggleEmailRead(email: any) {
    email.read = true;
    email.expanded = !email.expanded;
  }

  deleteEmail(id: number) {
    this.emails = this.emails.filter(email => email.id !== id);
  }

  forwardEmail() {
    if (this.emails.length === 0) {
      alert('No emails to forward');
      return;
    }
    const email = this.emails[0];
    this.forwardData = {
      from: email.to,
      to: '',
      subject: `Fwd: ${email.subject}`,
      message: `---------- Forwarded message ---------\nFrom: ${email.from}\nDate: ${this.formatDate(email.date)}\nSubject: ${email.subject}\n\n${email.body}`
    };
    this.showForwardModal = true;
  }

  sendForward() {
    alert('Email forwarded successfully! (This is a demo)');
    this.showForwardModal = false;
  }

  createNewEmail() {
    if (!this.newEmailUsername && !this.autoGenerate) {
      alert('Please enter a username');
      return;
    }
    
    if (this.autoGenerate) {
      this.newEmailUsername = Math.random().toString(36).substring(2, 10);
    }
    
    // Mark all existing accounts as inactive
    this.emailAccounts.forEach(acc => acc.active = false);
    
    this.currentEmail = `${this.newEmailUsername}${this.domain}`;
    
    // Add new account with 1 hour expiration
    const newAccount: EmailAccount = {
      address: this.currentEmail,
      createdAt: Date.now(),
      active: true,
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour from now
    };
    
    this.emailAccounts.push(newAccount);
    this.saveToLocalStorage();
    
    this.showNewEmailModal = false;
    this.emails = [];
    this.refreshEmails();
  }

  useOldEmail(emailAddress: string) {
    // Mark all accounts as inactive first
    this.emailAccounts.forEach(acc => acc.active = false);
    
    // Find and activate the selected old email
    const account = this.emailAccounts.find(acc => acc.address === emailAddress);
    if (account) {
      account.active = true;
      account.expiresAt = Date.now() + (60 * 60 * 1000); // Reset expiration to 1 hour
      this.currentEmail = account.address;
      this.saveToLocalStorage();
      this.showOldEmailsModal = false;
      this.refreshEmails();
    }
  }

  getOldEmails(): EmailAccount[] {
    return this.emailAccounts
      .filter(acc => !acc.active && acc.expiresAt > Date.now())
      .sort((a, b) => b.createdAt - a.createdAt); // Newest first
  }

  formatDate(date: Date) {
    const now = new Date();
    const emailDate = new Date(date);
    const diffInHours = (now.getTime() - emailDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes} min ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return emailDate.toLocaleDateString();
    }
  }
}