import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {LucideAngularModule} from "lucide-angular";
import { EmailBodyComponent } from '../email-body/email-body';

@Component({
  selector: 'app-email-view-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, EmailBodyComponent],
  templateUrl: './email-view-dialog.html',
  styleUrl: './email-view-dialog.css'
})
export class EmailViewDialog {
 constructor(
    public dialogRef: MatDialogRef<EmailViewDialog>,
    @Inject(MAT_DIALOG_DATA) public email: any
  ) {}

  showDetails = false;
  copiedKey: string | null = null;
  private copyTimeout: any;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  copyText(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedKey = key;
      clearTimeout(this.copyTimeout);
      this.copyTimeout = setTimeout(() => (this.copiedKey = null), 1500);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
