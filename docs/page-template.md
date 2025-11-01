# Page Template Guide

This template should be used for all pages except the home page to maintain consistency.

## HTML Structure Template

```html
<div class="min-h-screen font-sans bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
  <!-- Hero Section -->
  <section class="page-hero page-hero--[PAGE_TYPE]">
    <div class="page-hero__container">
      <div class="page-hero__breadcrumb">
        <a href="/" i18n="@@breadcrumb.home">Home</a>
        <span class="page-hero__breadcrumb-separator">→</span>
        <!-- Add more breadcrumb levels as needed -->
        <span i18n="@@breadcrumb.[PAGE_KEY]">[PAGE_NAME]</span>
      </div>
      <div class="page-hero__content">
        <h1 class="page-hero__title" i18n="@@[PAGE_KEY].title">
          [PAGE_TITLE]
        </h1>
        <p class="page-hero__subtitle" i18n="@@[PAGE_KEY].subtitle">
          [PAGE_SUBTITLE]
        </p>
        <!-- Optional CTA buttons -->
        <div class="page-hero__actions">
          <a href="/" class="page-hero__cta" i18n="@@[PAGE_KEY].hero.cta">
            [CTA_TEXT]
          </a>
          <a href="#content" class="page-hero__cta page-hero__cta--secondary">
            [SECONDARY_CTA]
          </a>
        </div>
      </div>
    </div>
  </section>

  <main class="page-content" id="content">

    <!-- Content sections using page-section class -->
    <section class="page-section">
      <h2 class="page-section__title" i18n="@@[PAGE_KEY].section1.title">
        [SECTION_TITLE]
      </h2>
      <div class="page-section__content">
        <!-- Section content here -->
      </div>
    </section>

    <!-- More sections as needed -->

  </main>
</div>
```

## Page Hero Variants

Use these CSS classes for different page types:

- `page-hero--about` - About page (primary + success gradient)
- `page-hero--contact` - Contact page (success + primary gradient)  
- `page-hero--how-it-works` - How it works (warning + primary gradient)
- `page-hero--services` - Services page (primary + warning gradient)
- Default - Standard gradient for other pages

## Content Patterns

### Feature Cards
```html
<div class="feature-grid">
  <div class="feature-card">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
        <lucide-icon name="icon-name" [size]="20"></lucide-icon>
      </div>
      <h3 class="font-semibold text-neutral-900">Feature Title</h3>
    </div>
    <p class="text-neutral-700">Feature description</p>
  </div>
</div>
```

### Step-by-step Process
```html
<div class="space-y-4">
  <div class="flex items-start gap-4">
    <div class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
    <p>Step description</p>
  </div>
</div>
```

### FAQ Section
```html
<div class="divide-y divide-neutral-200">
  <div class="faq-item">
    <details class="group">
      <summary class="faq-summary">
        <span>Question text</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </summary>
      <div class="faq-content">
        <p>Answer text</p>
      </div>
    </details>
  </div>
</div>
```

## Pages to Update

Apply this template to all pages:

1. ✅ About - Updated
2. ✅ Contact - Updated  
3. ✅ How It Works - Updated
4. ✅ Services - Updated
5. ✅ 10 Minute Email - Updated
6. 🔄 20 Minute Email
7. 🔄 30 Minute Email
8. 🔄 Privacy Policy
9. 🔄 Terms & Conditions
10. 🔄 All social media temp email pages
11. 🔄 Business temp email
12. 🔄 Fake email page
13. 🔄 Mail for students
14. 🔄 Saved email page

## Key Benefits

- **Consistent Design**: All pages follow the same visual hierarchy
- **Better UX**: Clear navigation with breadcrumbs
- **Modern Aesthetics**: Glass morphism and smooth animations
- **Responsive**: Works perfectly on all devices
- **Accessible**: Proper focus management and semantic HTML
- **Performance**: Optimized CSS with minimal overhead