import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll to top of the page on route transition
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable automatic browser scroll restoration on page refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleForceScroll = () => {
      window.scrollTo(0, 0);
    };

    // Run immediately on mount
    handleForceScroll();

    // Also run on window load to handle full page resources loaded
    window.addEventListener('load', handleForceScroll);

    // Also run after a short timeout to catch async rendering/layout shifts
    const timer = setTimeout(handleForceScroll, 100);

    return () => {
      window.removeEventListener('load', handleForceScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleRouteScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    };

    handleRouteScroll();
    
    // Also run with a short timeout to accommodate lazy-loaded route chunk rendering
    const timer = setTimeout(handleRouteScroll, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
