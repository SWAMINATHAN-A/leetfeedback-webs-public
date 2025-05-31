import { track } from '@vercel/analytics';

// Analytics configuration and utilities for Vercel Analytics and Speed Insights

export interface AnalyticsConfig {
  enabled: boolean;
  debug: boolean;
  beforeSend?: (event: any) => any;
}

// Default analytics configuration
export const analyticsConfig: AnalyticsConfig = {
  enabled: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
};

// Custom event tracking functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (analyticsConfig.enabled) {
    track(eventName, properties);
  }
};

// Common event trackers for LeetFeedback
export const analytics = {
  // Track user interactions
  trackFeatureClick: (featureName: string) => {
    trackEvent('feature_clicked', { feature: featureName });
  },

  trackPricingPlanView: (planName: string) => {
    trackEvent('pricing_plan_viewed', { plan: planName });
  },

  trackDownloadClick: (source: string) => {
    trackEvent('download_clicked', { source });
  },

  trackExternalLinkClick: (url: string, linkText: string) => {
    trackEvent('external_link_clicked', { url, linkText });
  },

  trackNewsletterSignup: () => {
    trackEvent('newsletter_signup');
  },

  trackRoadmapView: () => {
    trackEvent('roadmap_viewed');
  },

  // Track user engagement
  trackTimeOnPage: (page: string, timeSpent: number) => {
    trackEvent('time_on_page', { page, timeSpent });
  },

  trackScrollDepth: (page: string, depth: number) => {
    trackEvent('scroll_depth', { page, depth });
  },
};

// Export the track function for direct use if needed
export { track } from '@vercel/analytics';