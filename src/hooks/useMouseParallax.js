import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function useMouseParallax(active = true, damping = 25, stiffness = 120) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping, stiffness };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!active) return;

    // Detect touch device
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      navigator.msMaxTouchPoints > 0;

    if (isTouchDevice) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        // Get percentage position normalized around 0 (-0.5 to 0.5)
        const x = (e.clientX / innerWidth) - 0.5;
        const y = (e.clientY / innerHeight) - 0.5;
        
        mouseX.set(x);
        mouseY.set(y);
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [active, mouseX, mouseY]);

  return { x: smoothX, y: smoothY };
}
