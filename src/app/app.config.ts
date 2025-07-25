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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    importProvidersFrom(    LucideAngularModule.pick({
      Mail, MailOpen, RefreshCw, Plus, 
      Copy, Check, Bookmark, AlertCircle,
      User, Calendar, Shield, Circle, X, Info, CheckCircle, Clock,
      ChevronLeft, Inbox, Loader2, XCircle
    }))
  ]
};
