import { motion, useScroll, useSpring } from 'framer-motion';

export default function BuildLine() {
  const { scrollYProgress } = useScroll();
  
  // Apply physics spring smoothing to scroll progression
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div 
      className="absolute left-8 lg:left-16 xl:left-24 top-[40vh] bottom-[40vh] w-[1.5px] bg-brand-charcoal/5 z-20 pointer-events-none hidden md:block"
      aria-hidden="true"
    >
      {/* Scroll-drawn progress line */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-brand-red origin-top h-full"
        style={{
          scaleY
        }}
      />

      {/* Floating sticky tracking node */}
      <div 
        className="sticky top-[50vh] -translate-x-[4px] w-2.5 h-2.5 rounded-full bg-brand-red border-2 border-brand-offwhite shadow-[0_0_10px_rgba(200,4,28,0.5)]"
      />
    </div>
  );
}
