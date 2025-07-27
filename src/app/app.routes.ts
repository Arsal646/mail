import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { SavedEmailComponent } from './pages/saved-email/saved-email.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { Email10MinComponent } from './pages/email-10min/email-10min.component';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'saved/:token', component: SavedEmailComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '10-minutes-temporary-email', component: Email10MinComponent },
  { path: '**', redirectTo: '' }
];
