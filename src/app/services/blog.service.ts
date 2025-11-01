import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  readingTime: number;
  featured: boolean;
  metaDescription: string;
  featuredImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogPosts: BlogPost[] = [
    {
      id: '1',
      slug: 'ultimate-guide-temporary-email-privacy-2024',
      title: 'The Ultimate Guide to Temporary Email for Privacy in 2024',
      excerpt: 'Discover how temporary email addresses can protect your privacy online. Learn about the best practices, security benefits, and when to use disposable email addresses.',
      content: `
        <h2>What is a Temporary Email Address?</h2>
        <p>A temporary email address, also known as a disposable email, temp mail, or throwaway email, is a short-lived email account that automatically expires after a predetermined time period. These email addresses serve as a protective barrier between your personal inbox and the countless websites, services, and platforms that require email registration.</p>

        <h2>Why Use Temporary Email in 2024?</h2>
        <p>In today's digital landscape, privacy has become more important than ever. Here are the key reasons why temporary email addresses are essential:</p>

        <h3>1. Spam Prevention</h3>
        <p>The primary benefit of using temporary email is spam prevention. When you sign up for services, newsletters, or download resources using a disposable email address, any subsequent spam or promotional emails are sent to the temporary inbox instead of cluttering your personal email.</p>

        <h3>2. Privacy Protection</h3>
        <p>Temporary email addresses help maintain your anonymity online. They don't require personal information to create, and they automatically delete themselves, leaving no digital footprint behind.</p>

        <h3>3. Data Breach Protection</h3>
        <p>With data breaches becoming increasingly common, using temporary email addresses for non-essential services means your real email address won't be compromised if the service gets hacked.</p>

        <h3>4. Testing and Development</h3>
        <p>Developers and testers frequently use temporary email addresses to test registration flows, email verification processes, and user onboarding without cluttering their personal inboxes.</p>

        <h2>Best Practices for Using Temporary Email</h2>

        <h3>Choose the Right Duration</h3>
        <ul>
          <li><strong>10-minute mail:</strong> Perfect for quick verifications and one-time use</li>
          <li><strong>20-minute mail:</strong> Ideal for multi-step registration processes</li>
          <li><strong>30-minute mail:</strong> Great for downloading resources or longer verification processes</li>
          <li><strong>7-day mail:</strong> Suitable for trial periods and temporary projects</li>
        </ul>

        <h3>When NOT to Use Temporary Email</h3>
        <p>While temporary email is excellent for privacy, avoid using it for:</p>
        <ul>
          <li>Banking and financial services</li>
          <li>Important accounts you need long-term access to</li>
          <li>Work-related registrations</li>
          <li>Services requiring ongoing communication</li>
        </ul>

        <h2>Security Considerations</h2>
        <p>When choosing a temporary email service, consider these security factors:</p>

        <h3>No Logging Policy</h3>
        <p>Ensure the service doesn't log or store your temporary email data. Reputable services like TempMail4U automatically delete all data after the expiration period.</p>

        <h3>HTTPS Encryption</h3>
        <p>Always use temporary email services that provide HTTPS encryption to protect your data in transit.</p>

        <h3>No Registration Required</h3>
        <p>The best temporary email services don't require you to create an account or provide personal information.</p>

        <h2>Common Use Cases</h2>

        <h3>Social Media Registration</h3>
        <p>Use temporary email for creating accounts on platforms like Instagram, Facebook, Twitter, TikTok, or Discord when you want to maintain privacy or create secondary accounts.</p>

        <h3>Free Trials and Downloads</h3>
        <p>Many services require email registration for free trials or resource downloads. Temporary email prevents your inbox from being flooded with follow-up marketing emails.</p>

        <h3>Newsletter Subscriptions</h3>
        <p>If you're unsure about a newsletter's quality or frequency, use a temporary email to test it out first.</p>

        <h3>Contest Entries</h3>
        <p>Online contests often require email registration and may result in promotional emails. Temporary email keeps your personal inbox clean.</p>

        <h2>The Future of Email Privacy</h2>
        <p>As privacy regulations like GDPR and CCPA become more prevalent, temporary email services are becoming increasingly important tools for maintaining digital privacy. They represent a simple yet effective way to take control of your online presence.</p>

        <h2>Conclusion</h2>
        <p>Temporary email addresses are an essential tool for anyone serious about online privacy in 2024. They provide a simple, effective way to protect your personal inbox from spam while maintaining anonymity online. Whether you need a quick 10-minute email for verification or a longer-lasting temporary inbox for a trial period, incorporating disposable email addresses into your digital privacy strategy is a smart move.</p>

        <p>Ready to protect your privacy? <a href="/" class="text-primary-600 hover:underline">Try TempMail4U now</a> and experience the freedom of anonymous, spam-free email communication.</p>
      `,
      author: 'TempMail4U Team',
      publishedAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      tags: ['privacy', 'temporary email', 'security', 'spam prevention', 'digital privacy'],
      readingTime: 8,
      featured: true,
      metaDescription: 'Complete guide to temporary email addresses for privacy protection in 2024. Learn best practices, security benefits, and when to use disposable email addresses.',
      featuredImage: '/assets/blog/temp-email-privacy-guide.jpg'
    }
  ];

  getAllPosts(): Observable<BlogPost[]> {
    return of(this.blogPosts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()));
  }

  getFeaturedPosts(): Observable<BlogPost[]> {
    return of(this.blogPosts.filter(post => post.featured));
  }

  getPostBySlug(slug: string): Observable<BlogPost | null> {
    const post = this.blogPosts.find(p => p.slug === slug);
    return of(post || null);
  }

  getPostsByTag(tag: string): Observable<BlogPost[]> {
    return of(this.blogPosts.filter(post => post.tags.includes(tag)));
  }

  getRelatedPosts(currentPostId: string, limit: number = 3): Observable<BlogPost[]> {
    const currentPost = this.blogPosts.find(p => p.id === currentPostId);
    if (!currentPost) return of([]);

    const relatedPosts = this.blogPosts
      .filter(post =>
        post.id !== currentPostId &&
        post.tags.some(tag => currentPost.tags.includes(tag))
      )
      .slice(0, limit);

    return of(relatedPosts);
  }
}