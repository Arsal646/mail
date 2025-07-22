import { Component, OnInit, OnDestroy, signal, effect, Inject, PLATFORM_ID, inject, InjectionToken } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule } from "lucide-angular";
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../services/email';
import { EmailViewDialog } from '../email-view-dialog/email-view-dialog';
import { NewEmailModalComponent } from '../new-email-modal/new-email-modal';
import { SaveSuccessDialogComponent } from '../save-success-dialog/save-success-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

const SUPPORTED_LANGS = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'zh', name: '中文', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
  { code: 'ja', name: '日本語', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
  { code: 'it', name: 'Italiano', dir: 'ltr' },
  { code: 'ko', name: '한국어', dir: 'ltr' },
  { code: 'fa', name: 'فارسی', dir: 'rtl' },
  { code: 'pl', name: 'Polski', dir: 'ltr' },
  { code: 'uk', name: 'Українська', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', dir: 'ltr' },
  { code: 'sv', name: 'Svenska', dir: 'ltr' },
  { code: 'id', name: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'th', name: 'ไทย', dir: 'ltr' }
];

const APP_LANGUAGE = new InjectionToken<string>('APP_LANGUAGE');

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.html',
  styleUrl: './main.css',
  imports: [CommonModule, LucideAngularModule, TranslateModule],
})
export class Main implements OnInit, OnDestroy {
  countdown = signal(10);
  private countdownSub?: Subscription;

  currentEmail = '';
  emails: any[] = [];
  loading = false;
  refreshing = false;
  copied = false;
  saved = false;
  emailGenerating = false;
  isBrowser = false;
  selectedLang = 'en';
  supportedLangs = SUPPORTED_LANGS;
  activeLangs = SUPPORTED_LANGS.filter(l => ['en', 'ar', 'fr', 'es', 'de'].includes(l.code));

  private domain = '@tempmails.online';
  seoMetaTitle = '';
  seoMetaDescription = '';

  constructor(
    private emailService: EmailService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.translate.addLangs(this.supportedLangs.map(l => l.code));
    this.translate.setDefaultLang('en');
    // SSR: Use APP_LANGUAGE provider if present
    let initialLang = 'en';
    try {
      const ssrLang = inject(APP_LANGUAGE, { optional: true });
      if (ssrLang) initialLang = ssrLang;
    } catch {}
    this.selectedLang = initialLang;
    this.translate.use(initialLang);
    this.setDirection(initialLang);
    this.updateMetaTags(initialLang);
    effect(() => {
      if (this.countdown() === 0) {
        this.reload()
      }
    });
  }

  switchLanguage(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.selectedLang = lang;
    this.translate.use(lang);
    this.setDirection(lang);
    this.updateMetaTags(lang);
    // Change route to match language
    const currentPath = window.location.pathname.split('/').filter(Boolean);
    if (lang === 'en') {
      if (currentPath[0] && this.supportedLangs.find(l => l.code === currentPath[0])) {
        window.location.pathname = '/';
      }
    } else {
      if (currentPath[0] !== lang) {
        window.location.pathname = '/' + lang + (currentPath.length > 1 ? '/' + currentPath.slice(1).join('/') : '');
      }
    }
  }

  setDirection(lang: string) {
    if (!this.isBrowser) return;
    const langObj = this.supportedLangs.find(l => l.code === lang);
    const dir = langObj && langObj.dir === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }

  reload() {
    this.refreshEmails()
    this.startCountdown();
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    // Detect language from route
    const path = window.location.pathname.split('/')[1];
    const lang = this.supportedLangs.find(l => l.code === path) ? path : 'en';
    this.selectedLang = lang;
    this.translate.use(lang);
    this.setDirection(lang);
    this.updateMetaTags(lang);
    
    // Check if there's a saved email in query params
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.currentEmail = params['email'];
        this.refreshEmails();
      } else {
        this.generateNewEmail();
      }
    });
    
    this.reload();
  }

  ngOnDestroy(): void {
    this.countdownSub?.unsubscribe();
  }

  startCountdown(): void {
    this.countdownSub?.unsubscribe();
    this.countdown.set(10);

    // Emits every second for 31 ticks
    this.countdownSub = interval(1000).pipe(take(11)).subscribe((i) => {
      // Keep countdown at 30 when loading is true
      if (this.loading) {
        this.countdown.set(10);
      } else {
        this.countdown.set(10 - i);
      }
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

  getLocalStorageData() {
    if (!this.isBrowser) return
    const stored = localStorage.getItem('tempMailAccounts');
    const accounts = stored ? JSON.parse(stored) : [];
    return accounts;
  }

  autoGenerateEmail(email_prefix = ''): void {

    this.emailGenerating = true;
    this.currentEmail = '';
    const domain = this.domain;
    const accounts = this.getLocalStorageData()

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

    this.emailService.fetchEmails(this.currentEmail).subscribe({
      next: (res: any) => {

        //   const fetchedEmails: any[] = res.data || res; // Adjust this line based on your actual API response

        // const existingAddresses = new Set(this.emails.map(email => email.dummy_id));
        // const newEmails = fetchedEmails.filter(email => !existingAddresses.has(email.dummy_id));



        // const fetchedEmails: any[] = res.data || res; // Adjust this line based on your actual API response



        // const existingAddresses = new Set(this.emails.map(email => email.id));
        // const newEmails = fetchedEmails.filter(email => !existingAddresses.has(email.id));

        // if (newEmails.length > 0) {
        //   newEmails.forEach(email => email.new_added = true);
        //   this.emails = [...newEmails, ...this.emails];
        // }

        this.emails = [];

        this.emails = [...res];

        setTimeout(() => {
          this.loading = false;
        }, 1000);

        this.refreshing = false;
        this.startCountdown();
      },
      error: (err) => {
        console.error('Error fetching emails:', err);
        // setTimeout(() => {
        //   this.loading = false;
        // }, 400);

        // this.refreshing = false;
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
      width: '90vw',
      maxWidth: '800px',
      height:'90vh',
      maxHeight: '90vh',
      panelClass: 'custom-dialog',
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
    const accounts = this.getLocalStorageData();
    const historyEmails = accounts.filter((acc: any) => acc.active === false);


    const dialogRef = this.dialog.open(NewEmailModalComponent, {
      width: '500px',
      data: {
        historyEmails,
        domain: this.domain
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (res.address) {
          const accounts = this.getLocalStorageData()
          // ❌ Mark all old as inactive
          for (const acc of accounts) {
            acc.active = false;
          }
          const index = accounts.findIndex((acc: any) => acc.address === res.address);
          if (index !== -1) {
            accounts[index].active = true;
          }

          localStorage.setItem('tempMailAccounts', JSON.stringify(accounts));
          this.generateNewEmail()

        } else {
          this.autoGenerateEmail(res);
        }

      }
    })
  }

  viewEmailDetails(email: any) {
    this.openHistoryDialog();
  }

  confirmDelete(email: any) {
    // Your delete confirmation logic
  }


  saveEmail(): void {
    if (!this.currentEmail) return;
    this.loading = true;

    // Call Laravel backend to save email
    this.emailService.saveEmailToBackend(this.currentEmail).subscribe({
      next: (response) => {
        if (response.success) {
          // Show success state
          this.saved = true;
          this.loading = false;
          
          // Auto copy the access link
          const accessUrl = response.data.access_url;
          navigator.clipboard.writeText(accessUrl).then(() => {
            console.log('Access link copied automatically');
          });

          // Show success dialog with guidance
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

          // Hide saved state after 3 seconds
          setTimeout(() => {
            this.saved = false;
          }, 3000);
        }
      },
      error: (error) => {
        console.error('Error saving email:', error);
        alert('Failed to save email. Please try again.');
      }
    });
  }

  updateMetaTags(lang: string) {
    this.translate.get(['META_TITLE', 'META_DESCRIPTION']).subscribe(translations => {
      let title = translations['META_TITLE'] || 'TempMail - Free Temporary Email Service';
      let desc = translations['META_DESCRIPTION'] || 'Get free temporary email addresses instantly. Our disposable email service protects your privacy and keeps your inbox spam-free. No registration required.';
      // Google SEO best practices
      if (title.length > 60) title = title.slice(0, 57) + '...';
      if (desc.length > 160) desc = desc.slice(0, 157) + '...';
      this.seoMetaTitle = title;
      this.seoMetaDescription = desc;
      // Add relevant keywords for each language
      const keywordsMap: { [key: string]: string } = {
        en: 'temporary email, disposable email, free email, anonymous email, spam protection, fake email, burner email',
        ar: 'بريد مؤقت, بريد إلكتروني مؤقت, بريد مجاني, بريد مجهول, حماية من الرسائل المزعجة, بريد وهمي',
        fr: 'email temporaire, email jetable, email gratuit, email anonyme, protection anti-spam, email faux',
        es: 'correo temporal, correo desechable, correo gratis, correo anónimo, protección contra spam, correo falso',
        de: 'temporäre E-Mail, Wegwerf-E-Mail, kostenlose E-Mail, anonyme E-Mail, Spam-Schutz, Fake-E-Mail',
      };
      const keywords = keywordsMap[lang] || keywordsMap['en'];
      this.titleService.setTitle(this.seoMetaTitle);
      this.metaService.updateTag({ name: 'description', content: this.seoMetaDescription });
      this.metaService.updateTag({ name: 'keywords', content: keywords });
      this.metaService.updateTag({ property: 'og:title', content: this.seoMetaTitle });
      this.metaService.updateTag({ property: 'og:description', content: this.seoMetaDescription });
      this.metaService.updateTag({ name: 'twitter:title', content: this.seoMetaTitle });
      this.metaService.updateTag({ name: 'twitter:description', content: this.seoMetaDescription });
    });
  }
}
