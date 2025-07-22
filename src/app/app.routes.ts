import { Routes } from '@angular/router';
import { App } from './app';
import { Main } from './compoents/main/main';
import { SavedEmailComponent } from './compoents/saved-email/saved-email.component';

export const routes: Routes = [
  { path: '', component: Main }, // English default
  { path: 'ar', component: Main },
  { path: 'fr', component: Main },
  { path: 'es', component: Main },
  { path: 'de', component: Main },
  // { path: 'zh', component: Main },
  // { path: 'ru', component: Main },
  // { path: 'hi', component: Main },
  // { path: 'pt', component: Main },
  // { path: 'ja', component: Main },
  // { path: 'tr', component: Main },
  // { path: 'it', component: Main },
  // { path: 'ko', component: Main },
  // { path: 'fa', component: Main },
  // { path: 'pl', component: Main },
  // { path: 'uk', component: Main },
  // { path: 'nl', component: Main },
  // { path: 'sv', component: Main },
  // { path: 'id', component: Main },
  // { path: 'th', component: Main },
  { path: 'saved/:token', component: SavedEmailComponent },
  { path: 'ar/saved/:token', component: SavedEmailComponent },
  { path: 'fr/saved/:token', component: SavedEmailComponent },
  { path: 'es/saved/:token', component: SavedEmailComponent },
  { path: 'de/saved/:token', component: SavedEmailComponent },
  // { path: 'zh/saved/:token', component: SavedEmailComponent },
  // { path: 'ru/saved/:token', component: SavedEmailComponent },
  // { path: 'hi/saved/:token', component: SavedEmailComponent },
  // { path: 'pt/saved/:token', component: SavedEmailComponent },
  // { path: 'ja/saved/:token', component: SavedEmailComponent },
  // { path: 'tr/saved/:token', component: SavedEmailComponent },
  // { path: 'it/saved/:token', component: SavedEmailComponent },
  // { path: 'ko/saved/:token', component: SavedEmailComponent },
  // { path: 'fa/saved/:token', component: SavedEmailComponent },
  // { path: 'pl/saved/:token', component: SavedEmailComponent },
  // { path: 'uk/saved/:token', component: SavedEmailComponent },
  // { path: 'nl/saved/:token', component: SavedEmailComponent },
  // { path: 'sv/saved/:token', component: SavedEmailComponent },
  // { path: 'id/saved/:token', component: SavedEmailComponent },
  // { path: 'th/saved/:token', component: SavedEmailComponent },
  { path: '**', redirectTo: '' }
];
