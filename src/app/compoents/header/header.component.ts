import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  OnDestroy,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  @Output() refreshClick = new EventEmitter<void>();

  menuOpen = false;
  refreshing = false;

  private router = inject(Router);
  private routerSubscription: Subscription;

  constructor() {
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenu();
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.menuOpen) return;
    
    const target = event.target as HTMLElement;
    const clickedInsideMenu = target.closest('.mobile-menu');
    const clickedOnButton = target.closest('.menu-button');
    
    if (!clickedInsideMenu && !clickedOnButton) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.menuOpen) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  onRefreshClick(): void {
    this.refreshing = true;
    this.refreshClick.emit();
    setTimeout(() => this.refreshing = false, 1000);
  }
}