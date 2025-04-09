import { useEffect } from 'react';

type AnalyticsEvent = {
  name: string;
  props?: Record<string, string | number | boolean>;
};

declare global {
  interface Window {
    plausible: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

export const trackEvent = (event: AnalyticsEvent) => {
  if (window.plausible) {
    window.plausible(event.name, { props: event.props });
  }
};

export const usePageView = () => {
  useEffect(() => {
    // Track page view on component mount
    trackEvent({ name: 'pageview' });
  }, []);
};