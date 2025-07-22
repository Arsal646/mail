import { Routes } from '@angular/router';
import { App } from './app';
import { Main } from './compoents/main/main';
import { SavedEmailComponent } from './compoents/saved-email/saved-email.component';

export const routes: Routes = [
  { path: '', component: Main }, // English default
  { path: 'ar', component: Main },
  { path: 'fr', component: Main },
  { path: 'de', component: Main },
  { path: 'it', component: Main },
  { path: 'saved/:token', component: SavedEmailComponent },
  { path: 'ar/saved/:token', component: SavedEmailComponent },
  { path: 'fr/saved/:token', component: SavedEmailComponent },
  { path: 'de/saved/:token', component: SavedEmailComponent },
  { path: 'it/saved/:token', component: SavedEmailComponent },
  { path: '**', redirectTo: '' }
];
