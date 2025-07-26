
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
    'index.csr.html': {size: 15185, hash: '9657a78dc4180b5b9c38e9a88eb746ec7f6975e0f2170632eab40e91eb0b3b1a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3127, hash: '709dcf35561acd7796ba1a2a89f67ca81d10bd966288cd5f878ad51147ebfa9a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 55732, hash: 'e5435ff1bf8bdf2b23cdcc4e4628bba46fd13954078167d1cb4530a1fd196d10', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-QTTAX6IE.css': {size: 32946, hash: 'CfZy4GHdbY0', text: () => import('./assets-chunks/styles-QTTAX6IE_css.mjs').then(m => m.default)}
  },
};
