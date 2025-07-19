import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'saved/:token',
    renderMode: RenderMode.Server, // 👈 dynamic because token values are unknown at build time
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
