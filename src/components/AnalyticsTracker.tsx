'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Do not track admin panel or API calls
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/api') || pathname.startsWith('/login')) {
      return;
    }

    const trackPageview = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pathname,
            referrer: document.referrer || 'Direct',
          }),
        });
      } catch (err) {
        console.error('Failed to log pageview:', err);
      }
    };

    // Debounce slightly to prevent double-firing in dev mode or fast nav
    const timer = setTimeout(trackPageview, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
