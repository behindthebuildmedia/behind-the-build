import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useResponsive } from '../../hooks/useResponsive';

export default function ScrollReveal({ children, delay = 0, yOffset, duration = 0.75, className = "", viewportAmount = 0.18 }) {
  const shouldReduceMotion = useReducedMotion();
  const { isMobile } = useResponsive();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Mobile: 20px, Desktop: 35px
  const defaultY = isMobile ? 20 : 35;
  const actualY = yOffset !== undefined ? yOffset : defaultY;

  return (
    <motion.div
      initial={{ opacity: 0, y: actualY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
