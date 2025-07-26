
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/en/',
  locale: "en",
  routes: [
  {
    "renderMode": 2,
    "route": "/en"
  },
  {
    "renderMode": 0,
    "route": "/en/saved/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/en",
    "route": "/en/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 15185, hash: '2d275d91b76734dda9ea1c8bd01b37ebca5c64d32ac60bd2c512ef7a63beb2b8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3127, hash: 'cfd1e8871fe31044e9f85988cd9e0164c96bfb3dab0deb75ca3a06dc4a484345', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 52302, hash: '73423a42fa8065751c9024cdce8addb5fe4973f431e8b6a18988cbefb778a92d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-QTTAX6IE.css': {size: 32946, hash: 'CfZy4GHdbY0', text: () => import('./assets-chunks/styles-QTTAX6IE_css.mjs').then(m => m.default)}
  },
};
