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

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Get percentage position normalized around 0 (-0.5 to 0.5)
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [active, mouseX, mouseY]);

  return { x: smoothX, y: smoothY };
}
