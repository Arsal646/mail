import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

export interface SaveSuccessData {
  emailAddress: string;
  accessUrl: string;
  expiresAtFormatted: string;
}

@Component({
  selector: 'app-save-success-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-white border-b border-gray-300">
    <div class="flex items-center space-x-2 sm:space-x-3 min-w-0">


    </div>
    <button (click)="dialogRef.close()" 
            class="p-1 sm:p-2 text-gray-500 cursor-pointer hover:bg-red-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full">
      <lucide-icon name="x" [size]="20"></lucide-icon>
    </button>
  </div>
    <div class="p-6 ">

      <!-- Header with App-style Navigation -->
      <!-- Success Header -->
      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <lucide-icon name="check-circle" [size]="32" class="text-green-600"></lucide-icon>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Email Saved Successfully!</h2>
        <p class="text-gray-600 text-sm">Your access link has been copied to clipboard</p>
      </div>

      <!-- Email Info -->
      <div class="bg-gray-50 rounded-lg p-4 mb-4">
        <div class="text-sm font-medium text-gray-700 mb-2">Your Email:</div>
        <div class="font-mono text-sm text-gray-900 bg-white p-2 rounded border break-all">
          {{data.emailAddress}}
        </div>
      </div>

      <!-- Access Link -->
      <div class="bg-blue-50 rounded-lg p-4 mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">7-Day Access Link:</span>
          <button (click)="copyLink()" 
                  class="text-blue-600 hover:text-blue-800 text-xs flex items-center space-x-1"
                  [class.text-green-600]="linkCopied">
            <lucide-icon [name]="linkCopied ? 'check' : 'copy'" [size]="12"></lucide-icon>
            <span>{{linkCopied ? 'Copied!' : 'Copy'}}</span>
          </button>
        </div>
        <div class="text-xs text-gray-600 bg-white p-2 rounded border break-all font-mono">
          {{data.accessUrl}}
        </div>
        <div class="mt-2 text-xs text-gray-500 flex items-center">
          <lucide-icon name="calendar" [size]="12" class="mr-1"></lucide-icon>
          Expires: {{data.expiresAtFormatted}}
        </div>
      </div>

      <!-- Instructions -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
        <div class="flex items-start">
          <lucide-icon name="info" [size]="16" class="text-yellow-600 mr-2 mt-0.5 flex-shrink-0"></lucide-icon>
          <div class="text-xs text-yellow-800">
            <strong>How to use:</strong> Save this link to return to your inbox anytime within 7 days. 
            Share it with others or bookmark it for easy access.
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-3">
        <button (click)="copyLink()" 
                class="flex-1 bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center">
          <lucide-icon [name]="linkCopied ? 'check' : 'copy'" [size]="16" class="mr-2"></lucide-icon>
          {{linkCopied ? 'Copied!' : 'Copy Link'}}
        </button>
        
        <button (click)="close()" 
                class="flex-1 bg-gray-100 cursor-pointer text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
          Got it!
        </button>
      </div>
    </div>
  `,
  styles: [`
    .break-all {
      word-break: break-all;
    }
    
    .button{
      cursor:pointer;
    }
    
    button:hover {
      transform: translateY(-1px);
    }
    
    button:active {
      transform: translateY(0);
    }
  `]
})
export class SaveSuccessDialogComponent {
  linkCopied = false;

  constructor(
    public dialogRef: MatDialogRef<SaveSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SaveSuccessData
  ) {}

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.data.accessUrl);
      this.linkCopied = true;
      setTimeout(() => this.linkCopied = false, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}