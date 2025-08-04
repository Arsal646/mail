# Google Analytics Setup Guide

This guide explains how to set up Google Analytics 4 (GA4) for your Angular temporary email application.

## Prerequisites

1. A Google Analytics account
2. A GA4 property set up for your website

## Setup Steps

### 1. Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Go to Admin → Data Streams
4. Click on your web stream
5. Copy the "Measurement ID" (format: G-XXXXXXXXXX)

### 2. Configure Your Environment Files

Replace `GA_MEASUREMENT_ID` in both environment files with your actual measurement ID:

**src/environments/environment.ts** (Development):
```typescript
export const environment = {
  production: false,
  googleAnalyticsId: 'G-XXXXXXXXXX' // Replace with your actual GA4 measurement ID
};
```

**src/environments/environment.prod.ts** (Production):
```typescript
export const environment = {
  production: true,
  googleAnalyticsId: 'G-XXXXXXXXXX' // Replace with your actual GA4 measurement ID
};
```

### 3. Update index.html

Replace `GA_MEASUREMENT_ID` in `src/index.html` with your actual measurement ID:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Features Implemented

### Automatic Page View Tracking
- Tracks all route changes automatically
- Implemented in `src/app/app.ts`

### Custom Event Tracking
The following events are automatically tracked:

1. **Email Generated** - When a new temporary email is created
2. **Email Copied** - When user copies the email address
3. **Email Refreshed** - When user refreshes the inbox

### Available Tracking Methods

The `GoogleAnalyticsService` provides these methods:

```typescript
// Track page views
trackPageView(url: string, title?: string): void

// Track custom events
trackEvent(eventName: string, parameters?: any): void

// Pre-defined tracking methods
trackEmailGenerated(): void
trackEmailCopied(): void
trackEmailRefreshed(): void
trackExtensionDownload(browser: string): void
```

## Usage Examples

### In Components

```typescript
import { GoogleAnalyticsService } from './services/google-analytics.service';

constructor(private googleAnalytics: GoogleAnalyticsService) {}

// Track custom events
onButtonClick() {
  this.googleAnalytics.trackEvent('button_click', {
    event_category: 'engagement',
    event_label: 'header_button'
  });
}

// Track extension downloads
onExtensionDownload(browser: string) {
  this.googleAnalytics.trackExtensionDownload(browser);
}
```

## Testing

### Development Mode
- Analytics only runs in production mode by default
- To test in development, temporarily set `production: true` in `environment.ts`

### Verification
1. Deploy your app to production
2. Visit your website
3. Check Google Analytics Real-time reports
4. Perform actions (copy email, refresh, etc.) and verify events appear

## Privacy Considerations

- Analytics only runs in production mode
- No personally identifiable information is tracked
- Only anonymous usage patterns are collected
- Consider adding a privacy policy and cookie consent if required by your jurisdiction

## Troubleshooting

### Events Not Showing
1. Verify your measurement ID is correct
2. Check browser console for errors
3. Ensure you're testing in production mode
4. Wait a few minutes for data to appear in GA4

### Page Views Not Tracking
1. Check that the router events are properly subscribed in `app.ts`
2. Verify the measurement ID in both environment files
3. Check browser network tab for gtag requests

## Additional Customization

You can extend the `GoogleAnalyticsService` to track more specific events for your application:

```typescript
// Add to GoogleAnalyticsService
trackEmailOpened(emailId: string): void {
  this.trackEvent('email_opened', {
    event_category: 'engagement',
    event_label: 'email_view',
    email_id: emailId
  });
}

trackDomainChanged(domain: string): void {
  this.trackEvent('domain_changed', {
    event_category: 'customization',
    event_label: domain
  });
}
```

## Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [gtag.js Reference](https://developers.google.com/analytics/devguides/collection/gtagjs)
- [Angular Analytics Best Practices](https://angular.io/guide/universal#analytics)