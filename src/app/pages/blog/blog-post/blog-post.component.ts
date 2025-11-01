import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';
import { BlogService, BlogPost } from '../../../services/blog.service';

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

  post$!: Observable<BlogPost | null>;
  relatedPosts$!: Observable<BlogPost[]>;
  isBrowser = isPlatformBrowser(this.platformId);
  currentUrl = '';

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      map(params => params['slug']),
      switchMap(slug => this.blogService.getPostBySlug(slug))
    );

    this.relatedPosts$ = this.post$.pipe(
      switchMap(post => {
        if (post) {
          return this.blogService.getRelatedPosts(post.id, 3);
        }
        return [];
      })
    );

    // Handle post not found
    this.post$.subscribe(post => {
      if (!post) {
        this.router.navigate(['/blog']);
      }
    });

    this.currentUrl = this.router.url;

    if (this.isBrowser) {
      this.currentUrl = window.location.href;
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
}
