import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-cookie-consent',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cookie-consent.component.html',
    styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
    showBanner = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                this.showBanner = true;
            }
        }
    }

    acceptCookies() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('cookieConsent', 'true');
            this.showBanner = false;
            // Here you would typically initialize analytics if they weren't already
        }
    }

    rejectCookies() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('cookieConsent', 'false');
            this.showBanner = false;
            // Here you would disable analytics
        }
    }
}
