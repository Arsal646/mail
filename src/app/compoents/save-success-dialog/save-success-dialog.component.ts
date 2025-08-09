import { Component, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
    <div class="relative bg-white rounded-lg shadow-xl overflow-hidden">
      <canvas #confettiCanvas class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>

      <div class="relative z-10 p-6">
        <!-- Close Button -->
        <button (click)="dialogRef.close()" [attr.aria-label]="'common.close'"
                class="absolute right-4 top-4 p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-md transition-colors">
          <lucide-icon name="x" [size]="18"></lucide-icon>
        </button>

        <div class="text-center space-y-5 max-w-md mx-auto">
          <!-- Success Visual -->
          <div class="w-20 h-20 mx-auto bg-emerald-50 rounded-full flex items-center justify-center">
            <lucide-icon name="check-circle" [size]="36" class="text-emerald-600"></lucide-icon>
          </div>

          <!-- Header -->
          <div class="space-y-1">
            <h2 class="text-2xl font-bold text-gray-900" i18n="@@saveSuccess.title">Your Link is Ready!</h2>
            <p class="text-gray-500" i18n="@@saveSuccess.subtitle">Share this secure link with anyone who needs access.</p>
          </div>

          <!-- Link Section -->
          <div class="space-y-3">
            <div class="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-3 hover:border-emerald-300 transition-colors">
              <div class="flex-1 text-sm font-mono text-gray-700 break-all mr-3">
                {{data.accessUrl}}
              </div>
              <button (click)="copyLink()" 
                      class="p-2 hover:bg-white rounded transition-colors"
                      [attr.aria-label]="linkCopied ? ('common.copied') : ('common.copy')"
                      [class.text-emerald-600]="linkCopied">
                <lucide-icon [name]="linkCopied ? 'check' : 'copy'" [size]="16"></lucide-icon>
              </button>
            </div>
            <p class="text-xs text-gray-500">
              <span class="font-medium" i18n="@@saveSuccess.expiresLabel">Expires:</span> {{data.expiresAtFormatted}}
              <span class="block mt-1"><span i18n="@@saveSuccess.sentToLabel">Sent to:</span> {{data.emailAddress}}</span>
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="pt-2 flex justify-center gap-3">
            <button (click)="dialogRef.close()"
                    class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300 transition-colors"
                    i18n="@@common.close">
              Close
            </button>
            <button (click)="sendEmail()"
                    class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
                    i18n="@@saveSuccess.emailLink">
              Email Link
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .break-all { 
      word-break: break-word;
    }
    button, a, lucide-icon {
      cursor: pointer;
    }
  `]
})
export class SaveSuccessDialogComponent implements AfterViewInit {
  @ViewChild('confettiCanvas') private confettiCanvasRef?: ElementRef<HTMLCanvasElement>;
  linkCopied = false;

  constructor(
    public dialogRef: MatDialogRef<SaveSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SaveSuccessData
  ) {}

  ngAfterViewInit(): void {
    this.launchConfetti();
  }

  private launchConfetti(): void {
    const canvas = this.confettiCanvasRef?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement as HTMLElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; life: number; color: string;
    }> = [];

    const createBurst = (cx: number, cy: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          life: 60 + Math.floor(Math.random() * 40),
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    createBurst(canvas.width * 0.5, canvas.height * 0.2, 30);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 1;

        const alpha = Math.max(0, p.life / 80);
        ctx.fillStyle = this.hexToRgba(p.color, alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
      }

      if (particles.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.data.accessUrl);
      this.linkCopied = true;
      setTimeout(() => this.linkCopied = false, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Consider showing a translated error message
    }
  }

  sendEmail(): void {
    // Implementation would depend on your email service
    const subject = 'Your Secure Access Link';
    const body = `Here's your secure access link:\n\n${this.data.accessUrl}\n\nExpires: ${this.data.expiresAtFormatted}`;
    window.location.href = `mailto:${this.data.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}