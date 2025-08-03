import { Routes } from '@angular/router';
import { SavedEmailComponent } from '../pages/saved-email/saved-email.component';
import { PrivacyPolicyComponent } from '../pages/privacy-policy/privacy-policy.component';
import { Email10MinComponent } from '../pages/email-10min/email-10min.component';
import { Home } from '../pages/home/home';
import { Email20MinComponent } from '../pages/email-20min/email-20min.component';
import { Email30MinComponent } from '../pages/email-30min/email-30min.component';

export const routesAr: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full'
  },
  {
    path: 'محفوظ/:token',
    component: SavedEmailComponent,
    pathMatch: 'full'
  },
  {
    path: '10-دقائق-بريد-مؤقت',
    component: Email10MinComponent,
    pathMatch: 'full'
  },
  { 
    path: '20-دقيقة-بريد-مؤقت', 
    component: Email20MinComponent,
    pathMatch: 'full'
  },
  { 
    path: '30-دقيقة-بريد-مؤقت', 
    component: Email30MinComponent,
    pathMatch: 'full'
  },
  {
    path: 'سياسة-الخصوصية',
    component: PrivacyPolicyComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];