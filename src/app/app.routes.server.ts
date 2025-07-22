import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'saved/:token',
    renderMode: RenderMode.Server,
  },
  {
    path: 'ar/saved/:token',
    renderMode: RenderMode.Server,
  },
  {
    path: 'fr/saved/:token',
    renderMode: RenderMode.Server,
  },
  {
    path: 'de/saved/:token',
    renderMode: RenderMode.Server,
  },
  {
    path: 'it/saved/:token',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
