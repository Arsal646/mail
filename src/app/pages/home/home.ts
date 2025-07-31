import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from "lucide-angular";
import {  RouterModule } from '@angular/router';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [CommonModule, LucideAngularModule, RouterModule, MainTempMail],
})
export class Home implements OnInit {
  meta = inject(Meta);
  title = inject(Title);


  ngOnInit(): void {

        // Set SEO meta tags for home page
    const pageTitle = 'Free Temporary Email Service - Disposable Email Address | TempMail4u';
    const pageDescription = 'Get free temporary email addresses instantly. Our disposable email service protects your privacy and keeps your inbox spam-free. No registration required.';
    
    this.title.setTitle(pageTitle);
  
    // Standard meta tags
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({ name: 'keywords', content: 'temporary email, disposable email, free temp mail, anonymous email, burner email, fake email, spam protection, email verification, privacy mail, temp mail service' });
  
    // Open Graph/Facebook tags
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://tempmails.online/' });
    this.meta.updateTag({ property: 'og:image', content: 'https://tempmails.online/assets/images/temp-mail-preview.jpg' });
    this.meta.updateTag({ property: 'og:site_name', content: 'TempMails' });
  
    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://tempmails.online/assets/images/temp-mail-preview.jpg' });
    this.meta.updateTag({ name: 'twitter:site', content: '@tempmails' });
    
  }
 
}
