import { Routes } from '@angular/router';
import { App } from './app';
import { Main } from './compoents/main/main';
import { SavedEmailComponent } from './compoents/saved-email/saved-email.component';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'saved/:token', component: SavedEmailComponent },
  { path: '**', redirectTo: '' }
];
