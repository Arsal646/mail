# Adding New Languages Guide

This guide explains how to add new languages to your multilingual temporary email application.

## Steps to Add a New Language

### 1. Update Angular Configuration

Add the new locale to `angular.json`:

```json
"build": {
  "configurations": {
    "es": {
      "aot": true,
      "outputPath": "dist/temp-mail/es/",
      "i18nFile": "src/locale/messages.es.xlf",
      "i18nFormat": "xlf",
      "i18nLocale": "es",
      "baseHref": "/es/"
    }
  }
},
"serve": {
  "configurations": {
    "es": {
      "buildTarget": "temp-mail:build:es"
    }
  }
}
```

### 2. Update Package.json Scripts

Add the new language script:

```json
{
  "scripts": {
    "es": "ng serve --configuration=es"
  }
}
```

### 3. Update SEO Service

Add the new language to the `supportedLanguages` array in `src/app/services/seo.service.ts`:

```typescript
private supportedLanguages: LanguageConfig[] = [
    { code: 'en', urlPrefix: '', isDefault: true },
    { code: 'ar', urlPrefix: '/ar', isDefault: false },
    { code: 'es', urlPrefix: '/es', isDefault: false }, // New language
    // Add more languages here...
];
```

### 4. Extract i18n Messages

Run the extraction command to generate the base translation file:

```bash
ng extract-i18n --output-path src/locale --format=xlf
```

### 5. Create Translation File

Copy the base `messages.xlf` to create the new language file:

```bash
cp src/locale/messages.xlf src/locale/messages.es.xlf
```

### 6. Translate Content

Edit `src/locale/messages.es.xlf` and translate all the `<source>` content into `<target>` tags:

```xml
<trans-unit id="home.title" datatype="html">
  <source>Free Temporary Email Service</source>
  <target>Servicio de Correo Temporal Gratuito</target>
</trans-unit>
```

### 7. Add SEO Translations

For each page component, add the localized SEO content. The SEO service will automatically:
- Generate hreflang tags for all languages
- Create proper canonical URLs
- Handle multilingual meta tags

### 8. Test the New Language

```bash
npm run es  # Test Spanish version
ng build --configuration=es  # Build Spanish version
```

## Language Codes Reference

Common language codes for future additions:

- `es` - Spanish
- `fr` - French  
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `ru` - Russian
- `zh` - Chinese
- `ja` - Japanese
- `ko` - Korean
- `hi` - Hindi

## SEO Benefits

Each new language will automatically get:
- ✅ Proper hreflang tags
- ✅ Canonical URLs
- ✅ Localized meta tags
- ✅ No duplicate content issues
- ✅ Better regional SEO rankings

## File Structure

```
src/
├── locale/
│   ├── messages.xlf      # Base English
│   ├── messages.ar.xlf   # Arabic
│   ├── messages.es.xlf   # Spanish (new)
│   └── messages.fr.xlf   # French (future)
└── app/
    └── services/
        └── seo.service.ts # Handles all languages automatically
```

The SEO service is now fully scalable and will handle any number of languages automatically!