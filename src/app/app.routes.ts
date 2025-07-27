import { Routes } from '@angular/router';
import { App } from './app';
import { Main } from './compoents/main/main';
import { SavedEmailComponent } from './compoents/saved-email/saved-email.component';
import { PrivacyPolicyComponent } from './compoents/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'saved/:token', component: SavedEmailComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: '' }
];
