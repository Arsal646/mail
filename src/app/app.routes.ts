import { Router, Routes } from '@angular/router';
import { inject, LOCALE_ID } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home),
    pathMatch: 'full'
  },
  {
    path: 'saved/:token',
    loadComponent: () =>
      import('./pages/saved-email/saved-email.component').then(m => m.SavedEmailComponent),
    pathMatch: 'full'
  },
  {
    path: '10-minutes-temporary-email',
    loadComponent: () =>
      import('./pages/email-10min/email-10min.component').then(m => m.Email10MinComponent),
    pathMatch: 'full'
  },
  {
    path: '20-minutes-temporary-email',
    loadComponent: () =>
      import('./pages/email-20min/email-20min.component').then(m => m.Email20MinComponent),
    pathMatch: 'full'
  },
  {
    path: '30-minutes-temporary-email',
    loadComponent: () =>
      import('./pages/email-30min/email-30min.component').then(m => m.Email30MinComponent),
    pathMatch: 'full'
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about').then(m => m.About),
    pathMatch: 'full'
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/service/service').then(m => m.Service),
    pathMatch: 'full'
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then(m => m.Contact),
    pathMatch: 'full'
  },

  {
    path: 'terms-and-conditions',
    loadComponent: () => import('./pages/term/term').then(m => m.Term),
    pathMatch: 'full'
  },

  {
    path: 'fake-email',
    canMatch: [() => {
      const locale = (inject(LOCALE_ID) ?? '').toString().toLowerCase();
      if (locale.startsWith('en')) {
        return true;
      }

      // redirect non-English to root
      inject(Router).navigateByUrl('/');
      return false;
    }],
    loadComponent: () =>
      import('./pages/fake-email/fake-email').then(m => m.FakeEmail),
    pathMatch: 'full'
  },
  {
    path: 'temporary-email-for-facebook',
    canMatch: [() => {
      const locale = (inject(LOCALE_ID) ?? '').toString().toLowerCase();
      if (locale.startsWith('en')) {
        return true;
      }

      inject(Router).navigateByUrl('/');
      return false;
    }],
    loadComponent: () =>
      import('./pages/facebook-temp-email/facebook-temp-email').then(m => m.FacebookTempEmail),
    pathMatch: 'full'
  },
  {
    path: 'temporary-email-for-instagram',
    canMatch: [() => {
      const locale = (inject(LOCALE_ID) ?? '').toString().toLowerCase();
      if (locale.startsWith('en')) {
        return true;
      }

      inject(Router).navigateByUrl('/');
      return false;
    }],
    loadComponent: () =>
      import('./pages/instagram-temp-email/instagram-temp-email').then(m => m.InstagramTempEmail),
    pathMatch: 'full'
  },
  {
    path: 'temporary-email-for-tiktok',
    canMatch: [() => {
      const locale = (inject(LOCALE_ID) ?? '').toString().toLowerCase();
      if (locale.startsWith('en')) {
        return true;
      }

      inject(Router).navigateByUrl('/');
      return false;
    }],
    loadComponent: () =>
      import('./pages/tiktok-temp-email/tiktok-temp-email').then(m => m.TiktokTempEmail),
    pathMatch: 'full'
  },
  {
    path: 'temporary-email-for-discord',
    canMatch: [() => {
      const locale = (inject(LOCALE_ID) ?? '').toString().toLowerCase();
      if (locale.startsWith('en')) {
        return true;
      }

      inject(Router).navigateByUrl('/');
      return false;
    }],
    loadComponent: () =>
      import('./pages/discord-temp-email/discord-temp-email').then(m => m.DiscordTempEmail),
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
