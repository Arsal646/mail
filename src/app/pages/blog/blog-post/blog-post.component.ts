import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, map, switchMap, tap, of } from 'rxjs';
import { BlogService, BlogPost } from '../../../services/blog.service';
import { LOCALE_ID } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

declare const $localize: any;

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private platformId = inject(PLATFORM_ID);
  private sanitizer = inject(DomSanitizer);
  private seoService = inject(SeoService);
  private locale = inject(LOCALE_ID);

  post$!: Observable<BlogPost | null>;
  relatedPosts$!: Observable<BlogPost[]>;
  isBrowser = isPlatformBrowser(this.platformId);
  currentUrl = '';
  tableOfContents: TableOfContentsItem[] = [];
  sanitizedContent: SafeHtml | null = null;

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      map(params => params['slug']),
      switchMap(slug => this.blogService.getPostBySlug(slug)),
      tap(post => {
        if (!post) {
          this.sanitizedContent = null;
          this.tableOfContents = [];
          return;
        }

        const { content, toc } = this.prepareContent(post.content);
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(content);
        this.tableOfContents = toc;
        this.updateSeoForPost(post);
      })
    );

    this.relatedPosts$ = this.post$.pipe(
      switchMap(post => {
        if (post) {
          return this.blogService.getRelatedPosts(post.id, 3);
        }
        return of([]);
      })
    );

    // Handle post not found
    this.post$.subscribe(post => {
      if (!post) {
        this.router.navigate(['/blog']);
      }
    });

    if (!this.currentUrl) {
      this.currentUrl = this.router.url;

      if (this.isBrowser) {
        this.currentUrl = window.location.href;
      }
    }
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

  copyToClipboard(): void {
    if (this.isBrowser && navigator.clipboard) {
      navigator.clipboard.writeText(this.currentUrl).then(() => {
        // You could add a toast notification here
        console.log('Link copied to clipboard');
      });
    }
  }

  scrollToSection(id: string, event: Event): void {
    event.preventDefault();

    if (!this.isBrowser) {
      return;
    }

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }

    target.focus({ preventScroll: true });

    const { origin, pathname, search } = window.location;
    history.replaceState(null, '', `${pathname}${search}#${id}`);
    this.currentUrl = `${origin}${pathname}${search}#${id}`;
  }

  private prepareContent(content: string): { content: string; toc: TableOfContentsItem[] } {
    if (!this.isBrowser) {
      return { content, toc: [] };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h2'));
    const usedIds = new Map<string, number>();
    const toc: TableOfContentsItem[] = [];

    headings.forEach(heading => {
      const text = heading.textContent?.trim() ?? '';
      if (!text) {
        return;
      }

      const baseSlug = this.slugify(text);
      const count = usedIds.get(baseSlug) ?? 0;
      let slug = baseSlug;
      if (count > 0) {
        slug = `${baseSlug}-${count}`;
      }
      usedIds.set(baseSlug, count + 1);

      heading.setAttribute('id', slug);
      toc.push({
        id: slug,
        text,
        level: heading.tagName.toLowerCase() === 'h2' ? 2:2
      });
    });

    return { content: doc.body.innerHTML.trim(), toc };
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  private updateSeoForPost(post: BlogPost): void {
    const localeCode = String(this.locale || 'en').split('-')[0];
    const baseUrl = this.seoService.getBaseUrl(localeCode);
    const blogUrl = `${baseUrl}/blog`;
    const canonicalUrl = `${blogUrl}/${post.slug}`;
    const keywords = post.tags?.length ? post.tags.join(', ') : undefined;
    const ogImage = this.buildOgImageUrl(post.featuredImage);
    const description = post.meta_description || post.excerpt || '';

    this.seoService.updateSeoTags({
      title: `${post.meta_title}`,
      description,
      keywords,
      ogUrl: canonicalUrl,
      ogImage,
      ogSiteName: 'TempMail4u',
      twitterSite: '@tempmails',
      breadcrumbs: [
        { name: $localize`:@@seo.breadcrumbs.home:Home`, url: `${baseUrl}/` },
        { name: $localize`:@@seo.blog.breadcrumb:Blog`, url: blogUrl },
        { name: post.title, url: canonicalUrl }
      ]
    });

    this.currentUrl = canonicalUrl;
  }

  private buildOgImageUrl(imagePath?: string): string {
    if (!imagePath) {
      return 'https://tempmail4u.com/assets/images/temp-mail-preview.jpg';
    }

    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    return `https://tempmail4u.com/${imagePath.replace(/^\/+/, '')}`;
  }
}
