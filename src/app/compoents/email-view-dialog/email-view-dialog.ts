import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-view-dialog',
  imports: [CommonModule],
  templateUrl: './email-view-dialog.html',
  styleUrl: './email-view-dialog.css'
})
export class EmailViewDialog {
 constructor(
    public dialogRef: MatDialogRef<EmailViewDialog>,
    @Inject(MAT_DIALOG_DATA) public email: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  onReply(): void {
    this.dialogRef.close('reply');
  }

  onForward(): void {
    this.dialogRef.close('forward');
  }

  copiedAddress: string | null = null;
copyTimeout: any;

copyEmail(text: string, context: string = '') {
  navigator.clipboard.writeText(text).then(() => {
    this.copiedAddress = context || text;
    
    // Clear previous timeout if exists
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
    
    // Reset after 2 seconds
    this.copyTimeout = setTimeout(() => {
      this.copiedAddress = null;
    }, 2000);
  });
}
}
