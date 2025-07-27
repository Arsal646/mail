import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private scrollService: ScrollService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    // Scroll to top when component initializes (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.scrollToTopInstant();
    }

    // Set SEO meta tags for privacy policy page
    this.metaService.setMetaTags({
      title: 'Privacy Policy - Temporary Email Service | TempMails',
      description: 'Read our privacy policy to understand how we protect your data and maintain your privacy while using our temporary email service.',
      keywords: 'privacy policy, temporary email privacy, data protection, email privacy, privacy terms, temp mail privacy',
      ogUrl: 'https://tempmails.online/privacy-policy',
      ogImage: 'https://tempmails.online/assets/images/privacy-policy-preview.jpg',
      twitterImage: 'https://tempmails.online/assets/images/privacy-policy-preview.jpg'
    });
  }
} 