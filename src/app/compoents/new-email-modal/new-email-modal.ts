import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-new-email-modal',
  imports: [MatDialogActions, MatIconModule, MatDialogContent, MatFormFieldModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-email-modal.html',
  styleUrl: './new-email-modal.css'
})
export class NewEmailModalComponent {
  username = '';
  usernameControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-z0-9]+$/i)
  ]);

  constructor(
    public dialogRef: MatDialogRef<NewEmailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { domain: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  generateRandom(): void {
    const randomString = Math.random().toString(36).substring(2, 10);
    this.username = randomString;
    this.usernameControl.setValue(randomString);
  }
}
