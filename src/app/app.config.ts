import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { 
  Mail, MailOpen, RefreshCw, Plus, Copy, Check, Bookmark, 
  AlertCircle, User, Calendar, Shield, Circle, X, Info, CheckCircle, Clock,
  ChevronLeft, Inbox, Loader2, XCircle,
  LucideAngularModule
} from 'lucide-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Mail, MailOpen, RefreshCw, Plus, 
        Copy, Check, Bookmark, AlertCircle,
        User, Calendar, Shield, Circle, X, Info, CheckCircle, Clock,
        ChevronLeft, Inbox, Loader2, XCircle
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};
