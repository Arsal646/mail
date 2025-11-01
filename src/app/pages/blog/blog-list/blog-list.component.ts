import { Component, OnInit, LOCALE_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../../services/blog.service';
import { Observable } from 'rxjs';
import { SeoService } from '../../../services/seo.service';

declare const $localize: any;

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts$: Observable<BlogPost[]>;
  featuredPosts$: Observable<BlogPost[]>;
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);

  constructor(private blogService: BlogService) {
    this.posts$ = this.blogService.getAllPosts();
    this.featuredPosts$ = this.blogService.getFeaturedPosts();
  }

  ngOnInit(): void {
    this.setSeoTags();
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

    getReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  private setSeoTags(): void {
    const localeCode = String(this.locale || 'en').split('-')[0];
    const baseUrl = this.seoService.getBaseUrl(localeCode);
    const blogUrl = `${baseUrl}/blog`;
    const seoContent = this.getLocalizedSeoContent();

    this.seoService.updateSeoTags({
      title: seoContent.title,
      description: seoContent.description,
      keywords: seoContent.keywords,
      ogUrl: blogUrl,
      ogImage: 'https://tempmail4u.com/assets/images/temp-mail-preview.jpg',
      ogSiteName: seoContent.siteName,
      twitterSite: '@tempmails',
      breadcrumbs: [
        { name: $localize`:@@seo.breadcrumbs.home:Home`, url: `${baseUrl}/` },
        { name: $localize`:@@seo.blog.breadcrumb:Blog`, url: blogUrl }
      ]
    });
  }

  private getLocalizedSeoContent() {
    return {
      title: $localize`:@@seo.blogList.title:TempMail4U Blog - Email Privacy Tips & Temp Mail Guides`,
      description: $localize`:@@seo.blogList.description:Discover the latest articles on temporary email security, inbox privacy, and spam prevention from the TempMail4U team.`,
      keywords: $localize`:@@seo.blogList.keywords:temporary email blog, temp mail guides, email privacy tips, disposable email articles, spam protection`,
      siteName: $localize`:@@seo.blogList.siteName:TempMail4u`
    };
  }
}
