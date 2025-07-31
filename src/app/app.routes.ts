import { Routes } from '@angular/router';
import { SavedEmailComponent } from './pages/saved-email/saved-email.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { Email10MinComponent } from './pages/email-10min/email-10min.component';
import { Home } from './pages/home/home';
import { Email20MinComponent } from './pages/email-20min/email-20min.component';
import { Email30MinComponent } from './pages/email-30min/email-30min.component';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full'
  },
  {
    path: 'saved/:token',
    component: SavedEmailComponent,
    pathMatch: 'full'
  },
  {
    path: '10-minutes-temporary-email',
    component: Email10MinComponent,
    pathMatch: 'full'  // This ensures exact matching
  },
  { 
  path: '20-minutes-temporary-email', 
  component: Email20MinComponent,
  pathMatch: 'full'  // This ensures exact matching
},
  { 
  path: '30-minutes-temporary-email', 
  component: Email30MinComponent,
  pathMatch: 'full'  // This ensures exact matching
},
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];