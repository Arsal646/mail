import { Component, inject } from '@angular/core';
import { EmailService } from './services/email';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { f } from "../../node_modules/@angular/material/icon-module.d-COXCrhrh";
import { MatDialog } from '@angular/material/dialog';
import { NewEmailModalComponent } from './compoents/new-email-modal/new-email-modal';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public emailService: EmailService, private dialog:MatDialog) { }

  ngOnInit() {
    this.emailService.init();
  }

  get activeEmail(): any {
    return this.emailService.emailAccounts.filter(a => !a.active)
  }

  createCustomEmail() {
    let dialogRef = this.dialog.open(NewEmailModalComponent, {
      height: '400px',
      width: '600px',
    });
  }

}
