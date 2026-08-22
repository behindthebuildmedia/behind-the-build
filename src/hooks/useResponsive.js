import { useState, useEffect } from 'react';

export function useResponsive() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isLaptop: width >= 1024 && width < 1440,
    isDesktop: width >= 1440,
    isTouch: width < 1024 // standard threshold for mobile/tablet where touch dominates
  };
}
