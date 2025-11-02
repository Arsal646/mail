import { RenderMode, ServerRoute } from '@angular/ssr';
import { firstValueFrom } from 'rxjs';

import { BlogService } from './services/blog.service';

const blogService = new BlogService();

export const serverRoutes: ServerRoute[] = [
  {
    path: 'saved/:token',
    renderMode: RenderMode.Server, // dynamic because token values are unknown at build time
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const posts = await firstValueFrom(blogService.getAllPosts());
      return posts.map(post => ({ slug: post.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
