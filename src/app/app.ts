
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './compoents/header/header.component';
import { FooterComponent } from './compoents/footer/footer.component';
import { ScrollService } from './services/scroll.service';
import { filter } from 'rxjs/operators';

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
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    // Listen to route changes and scroll to top
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollService.scrollToTopInstant();
      });
  }

  onHeaderRefresh() {
    // Emit a custom event that components can listen to
    window.dispatchEvent(new CustomEvent('headerRefresh'));
  }
}

