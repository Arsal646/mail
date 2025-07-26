
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/ar/',
  locale: "ar",
  routes: [
  {
    "renderMode": 2,
    "route": "/ar"
  },
  {
    "renderMode": 0,
    "route": "/ar/saved/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/ar",
    "route": "/ar/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 16310, hash: '5d6f9041c1633e38283b4909f5bb6134c24c88abcb09c621af011446ec323365', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3127, hash: '558b0e3e7c9a8079ee7e2687fe60d64f8fe3519d5b45800784e1a16509bb75ce', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 56917, hash: 'c8cc25a4db02d9fda073af25be3e4ce5bd86ade89aeff61f4a4cee4820233644', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-23CJ4ODI.css': {size: 34960, hash: 'qoGp9Vrwr0M', text: () => import('./assets-chunks/styles-23CJ4ODI_css.mjs').then(m => m.default)}
  },
};
