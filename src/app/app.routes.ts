import { Routes } from '@angular/router';
import { routesEn } from './routes/routes.en';
import { routesAr } from './routes/routes.ar';

// Get the current locale from the document or default to 'en'
function getCurrentLocale(): string {
  if (typeof document !== 'undefined') {
    const htmlLang = document.documentElement.lang;
    return htmlLang || 'en';
  }
  return 'en';
}

// Select routes based on current locale
function getLocalizedRoutes(): Routes {
  const locale = getCurrentLocale();
  
  switch (locale) {
    case 'ar':
      return routesAr;
    case 'en':
    default:
      return routesEn;
  }
}

export const routes: Routes = getLocalizedRoutes();