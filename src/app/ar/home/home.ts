import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { MainTempMail } from '../../compoents/main-temp-mail/main-temp-mail';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home-ar',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [CommonModule, LucideAngularModule, RouterModule, MainTempMail],
})
export class HomeAr implements OnInit {
  private seoService = inject(SeoService);

  routes = {
    email10min: '/10-minutes-temporary-email',
    email20min: '/20-minutes-temporary-email',
    email30min: '/30-minutes-temporary-email'
  };

  ngOnInit(): void {
    this.seoService.updateSeoTags({
      title: 'خدمة البريد الإلكتروني المؤقت المجانية',
      description: 'أنشئ بريداً مؤقتاً مجاناً مع TempMail4U. حافظ على خصوصيتك دون تسجيل أو رسائل مزعجة.',
      keywords: 'بريد مؤقت, بريد وهمي, بريد حارق, بريد قابل للاستخدام مرة واحدة',
      ogUrl: 'https://tempmail4u.com/ar',
      ogImage: 'https://tempmail4u.com/assets/images/temp-mail-preview.jpg',
      ogSiteName: 'TempMail4u',
      twitterSite: '@tempmails'
    });
  }
}
