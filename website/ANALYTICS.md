# Vercel Analytics Integration

This document explains the Vercel Speed Insights and User Analytics integration implemented in the Traverse website.

## Overview

The website now includes:
- **Vercel Speed Insights**: Monitors Core Web Vitals and performance metrics
- **Vercel User Analytics**: Tracks user interactions and custom events

## Installation

The following packages have been installed:

```json
{
  "@vercel/analytics": "^1.5.0",
  "@vercel/speed-insights": "^1.2.0"
}
```

## Implementation

### 1. Core Integration (App.tsx)

The main analytics components are integrated at the app level:

```tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen bg-background">
          {/* Your app content */}
        </div>
        <Analytics />
        <SpeedInsights />
      </Router>
    </ThemeProvider>
  );
}
```

### 2. Custom Analytics Configuration (utils/analytics.ts)

A centralized analytics configuration provides:
- Custom event tracking functions
- Environment-based enabling/disabling
- Traverse-specific event trackers

#### Key Functions:

- `trackEvent(eventName, properties)` - Generic event tracking
- `analytics.trackFeatureClick(featureName)` - Track feature interactions
- `analytics.trackPricingPlanView(planName)` - Track pricing plan views
- `analytics.trackDownloadClick(source)` - Track download button clicks
- `analytics.trackRoadmapView()` - Track roadmap page visits

### 3. Component Integration

Analytics tracking has been added to key components:

#### Hero Component
- Download button clicks (`hero_primary_cta`)
- Demo video button clicks (`demo_video`)
- Roadmap badge clicks

#### Pricing Component
- Pricing plan button clicks
- Enterprise solutions button
- Integration showcase button

## Custom Events Tracked

| Event Name | Description | Properties |
|------------|-------------|------------|
| `feature_clicked` | User clicks a feature button | `{ feature: string }` |
| `pricing_plan_viewed` | User interacts with pricing plan | `{ plan: string }` |
| `download_clicked` | User clicks download/install button | `{ source: string }` |
| `external_link_clicked` | User clicks external link | `{ url: string, linkText: string }` |
| `roadmap_viewed` | User visits roadmap page | `{}` |

## Usage Examples

### Basic Event Tracking
```tsx
import { analytics } from '../utils/analytics';

// Track a feature click
const handleFeatureClick = () => {
  analytics.trackFeatureClick('advanced_analytics');
};

// Track download with source
const handleDownload = () => {
  analytics.trackDownloadClick('pricing_page_cta');
};
```

### Custom Event Tracking
```tsx
import { trackEvent } from '../utils/analytics';

// Track custom event with properties
trackEvent('newsletter_signup', {
  source: 'footer',
  email_domain: email.split('@')[1]
});
```

## Vercel Dashboard Access

Once deployed to Vercel, analytics data will be available in:

1. **Speed Insights**: Vercel Dashboard > Project > Speed Insights
   - Core Web Vitals (LCP, FID, CLS)
   - Performance scores
   - Real user monitoring data

2. **User Analytics**: Vercel Dashboard > Project > Analytics
   - Page views and unique visitors
   - Custom events and their properties
   - User flow and conversion tracking

## Environment Configuration

Analytics is configured to:
- **Production**: Fully enabled with all tracking
- **Development**: Debug mode enabled, minimal tracking

## Best Practices

1. **Event Naming**: Use descriptive, snake_case event names
2. **Properties**: Include relevant context in event properties
3. **Privacy**: No personally identifiable information in events
4. **Performance**: Analytics calls are non-blocking and async

## Troubleshooting

### Analytics Not Showing
- Ensure project is deployed to Vercel
- Check Vercel dashboard for analytics enablement
- Verify environment variables if using custom configuration

### Custom Events Not Tracking
- Check browser console for errors
- Verify `track()` function import
- Ensure analytics is enabled in current environment

## Future Enhancements

Consider adding:
- A/B testing with Vercel's experimentation features
- Conversion funnel tracking
- User session recording integration
- Performance budget alerts