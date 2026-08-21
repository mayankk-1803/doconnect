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
    // Force scroll to top on initial mount/refresh
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant is cleaner than smooth here to avoid weird scrolling artifacts on new page loads
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
