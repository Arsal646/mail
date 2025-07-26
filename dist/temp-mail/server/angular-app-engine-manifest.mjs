
export default {
  basePath: '/',
  supportedLocales: {
  "en": "en",
  "ar": "ar"
},
  entryPoints: {
    'en': () => import('./en/main.server.mjs'),
    'ar': () => import('./ar/main.server.mjs')
  },
};
