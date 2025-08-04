
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './compoents/header/header.component';
import { FooterComponent } from './compoents/footer/footer.component';
import { ScrollService } from './services/scroll.service';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class App implements OnInit {
  constructor(
    private router: Router,
    private scrollService: ScrollService,
    private googleAnalytics: GoogleAnalyticsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Listen to route changes and scroll to top
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.scrollService.scrollToTopInstant();
        
        // Track page views with Google Analytics
        if (isPlatformBrowser(this.platformId)) {
          this.googleAnalytics.trackPageView(event.urlAfterRedirects);
        }
      });


        if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const url = event.url;
          
          // Remove trailing slash (except for root '/')
          if (url.length > 1 && url.endsWith('/')) {
            const newUrl = url.slice(0, -1);
            this.router.navigateByUrl(newUrl, { replaceUrl: true });
          }
        }
      });
    }

  }

  onHeaderRefresh() {
    // Emit a custom event that components can listen to
    window.dispatchEvent(new CustomEvent('headerRefresh'));
  }
}

