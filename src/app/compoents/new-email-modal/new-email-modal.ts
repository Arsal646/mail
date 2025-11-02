import { Component, inject, Inject, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email';
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-new-email-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './new-email-modal.html',
  styleUrl: './new-email-modal.css'
})
export class NewEmailModalComponent implements AfterViewInit, OnInit {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  
  public emailService = inject(EmailService)
  submitted = false;
  username = '';
  usernameControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-z0-9]+$/i)
  ]);
  isBrowser = false;
  availableDomains: string[] = [];
  domainControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<NewEmailModalComponent>,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(MAT_DIALOG_DATA) public data: { domain: string, historyEmails:any[] }
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.availableDomains = this.emailService.availableDomains ?? [];
    if (this.data?.domain && !this.availableDomains.includes(this.data.domain)) {
      this.availableDomains = [this.data.domain, ...this.availableDomains];
    }
    const defaultDomain = this.data?.domain ?? this.availableDomains[0];
    this.domainControl.setValue(defaultDomain || '');
  }

  ngAfterViewInit(): void {
    // Auto focus on the input field when modal opens
    if (this.isBrowser) {
      this.generateRandom();
      setTimeout(() => {
        this.usernameInput.nativeElement.focus();
      }, 100);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  oldEmail:any[] = []

  getOldEmails(){
  if (!this.isBrowser) return;
    const stored = localStorage.getItem('tempMailAccounts');
    const accounts = stored ? JSON.parse(stored) : [];
    this.oldEmail = accounts
  }


  generateRandom(): void {
    // const email = this.emailService.generateNewEmail();
    const username = Math.random().toString(36).substring(2, 10);
    this.username = username;
    this.usernameControl.setValue(username);
  }

  // Add to your component class
  recentEmails: { username: string, date: Date }[] = [
    { username: 'john.doe', date: new Date() },
    { username: 'jane.smith', date: new Date(Date.now() - 86400000) },
    { username: 'mike.jones', date: new Date(Date.now() - 172800000) }
  ];

  selectRecentEmail(event: Event) {
    const username = (event.target as HTMLSelectElement).value;
    if (username) {
      this.usernameControl.setValue(username);
      this.username = username;
      this.submitted = false;
    }
  }

  submit() {
    this.submitted = true;
    if (this.usernameControl.valid && this.domainControl.valid) {
      this.dialogRef.close({
        username: this.usernameControl.value,
        domain: this.domainControl.value
      });
    }
  }

  // getFullEmailHistory() {
  //   // This would come from your actual service/API in production
  //   // const dummyEmails = [
  //   //   {
  //   //     "address": "dfv1tcqi@tempmails.online",
  //   //     "createdAt": 1752252538765,
  //   //     "active": true,
  //   //     "expiresAt": 1752256138765
  //   //   },
  //   //   {
  //   //     "address": "xzy123@tempmails.online",
  //   //     "createdAt": 1752152538765,
  //   //     "active": false,
  //   //     "expiresAt": 1752156138765
  //   //   },
  //   //   {
  //   //     "address": "abc456@tempmails.online",
  //   //     "createdAt": 1752052538765,
  //   //     "active": false,
  //   //     "expiresAt": 1752056138765
  //   //   }
  //   // ];


  //   return dummyEmails;
  // }

  // openHistoryDialog() {
  //   const allEmails = this.emailService.getOldEmails;

  //   const dialogRef = this.dialog.open(OldEmailsModalComponent, {
  //     width: '500px',
  //     data: {
  //       historyEmails,
  //       activeEmails,
  //       domain: this.data.domain
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(selectedEmail => {
  //     if (selectedEmail) {
  //       // Extract username from full email address
  //       const username = selectedEmail.split('@')[0];
  //       this.usernameControl.setValue(username);
  //       this.username = username;
  //     }
  //   });
  // }



  // Add to your component
  showHistory = false;
  // emailHistory = [
  //   {
  //     "address": "dfv1tcqi@tempmails.online",
  //     "createdAt": 1752252538765,
  //     "active": true,
  //     "expiresAt": 1752256138765
  //   },
  //   {
  //     "address": "xzy123@tempmails.online",
  //     "createdAt": 1752152538765,
  //     "active": false,
  //     "expiresAt": 1752156138765
  //   }
  // ];

  selectHistoryEmail(email: any) {
    // Extract username from email address
    // const username = email.address.split('@')[0];
    // this.usernameControl.setValue(username);
    // this.username = username;
    // this.showHistory = false;

    this.dialogRef.close(email);
  }




  
}
