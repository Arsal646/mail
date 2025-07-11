import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from "../../../../node_modules/@angular/material/dialog/index";

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-old-emails-modal',
  imports: [MatDialogActions, MatDialogContent, MatIconModule, MatListModule, CommonModule],
  templateUrl: './old-emails-modal.html',
  styleUrl: './old-emails-modal.css'
})
export class OldEmailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<OldEmailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { accounts: any[] }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectEmail(email: string): void {
    this.dialogRef.close(email);
  }
}