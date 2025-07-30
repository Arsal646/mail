import { Routes } from '@angular/router';
import { SavedEmailComponent } from './pages/saved-email/saved-email.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { Email10MinComponent } from './pages/email-10min/email-10min.component';
import { Home } from './pages/home/home';

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
    path: 'privacy-policy', 
    component: PrivacyPolicyComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];