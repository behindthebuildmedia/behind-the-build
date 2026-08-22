import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '../../data/socialLinks';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useResponsive } from '../../hooks/useResponsive';
import MagneticButton from '../../components/MagneticButton/MagneticButton';

// Inline SVGs matching official Lucide brand paths for compatibility
const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const iconMap = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedinIcon,
  YouTube: YoutubeIcon
};

const handleMap = {
  Instagram: '@behindthebuild',
  LinkedIn: 'Behind the Build',
  YouTube: '@behindthebuild'
};

export default function Connect() {
  const shouldReduceMotion = useReducedMotion();
  const { isTouch } = useResponsive();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Staggered reveal variants
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const headerVariants = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const cardRevealVariants = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="connect" className="py-20 md:py-24 bg-brand-offwhite relative overflow-hidden border-t border-brand-charcoal/5">
      
      <motion.div 
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-6xl mx-auto px-6 md:px-12 w-full text-left"
      >
        {/* Section Header */}
        <motion.div variants={headerVariants} className="mb-12 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red font-mono mb-3">09 / SOCIALS</p>
          <h2 
            className="font-bold uppercase tracking-tight text-brand-charcoal font-sans mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 5.5rem)', lineHeight: '1.05' }}
          >
            CONNECT WITH US<span className="text-brand-red">.</span>
          </h2>
          <p className="text-lg md:text-xl text-brand-charcoal/60 leading-relaxed font-sans">
            Follow the journey. See what we create, how we build, and what happens behind the scenes.
          </p>
        </motion.div>

        {/* 3-Column Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {socialLinks.map((link, idx) => {
            const IconComponent = iconMap[link.name];
            const handleText = handleMap[link.name] || '@behindthebuild';
            
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;
            const hoverActive = !shouldReduceMotion && !isTouch;

            const handleClick = (e) => {
              if (!link.url) {
                e.preventDefault();
              }
            };

            return (
              <motion.a
                key={link.id}
                href={link.url || '#'}
                onClick={handleClick}
                target={link.url ? "_blank" : undefined}
                rel={link.url ? "noopener noreferrer" : undefined}
                onMouseEnter={() => hoverActive && setHoveredIdx(idx)}
                onMouseLeave={() => hoverActive && setHoveredIdx(null)}
                variants={cardRevealVariants}
                animate={{
                  y: hoverActive && isHovered ? -8 : 0,
                  borderColor: hoverActive && isHovered ? '#C8041C' : 'rgba(33, 33, 33, 0.08)',
                  boxShadow: hoverActive && isHovered 
                    ? '0 25px 50px rgba(200, 4, 28, 0.06)' 
                    : '0 4px 15px rgba(0, 0, 0, 0.01)'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                aria-label={`Follow Behind the Build on ${link.name}`}
                className="flex flex-col justify-between p-8 bg-brand-white border rounded-2xl h-[230px] group relative overflow-hidden text-left"
              >
                {/* Background Watermark name */}
                <AnimatePresence>
                  {hoverActive && isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 0.03, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="absolute right-4 bottom-2 font-sans font-black uppercase pointer-events-none text-brand-charcoal text-[5.5rem] tracking-tighter select-none z-0 leading-none"
                    >
                      {link.name.slice(0, 4)}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top Section: Number and Icon */}
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-mono text-xs font-bold text-brand-red/50 tracking-widest uppercase">
                    {link.id}
                  </span>
                  
                  <motion.div
                    animate={
                      hoverActive && isHovered 
                        ? { scale: 1.1, color: '#C8041C' } 
                        : { scale: 1, color: '#212121' }
                    }
                    className="w-10 h-10 border border-brand-charcoal/10 rounded-xl flex items-center justify-center text-brand-charcoal bg-brand-offwhite"
                  >
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </motion.div>
                </div>

                {/* Bottom Section: Name, Handle and Arrow */}
                <div className="flex justify-between items-end relative z-10 pt-4 border-t border-brand-charcoal/5">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-brand-charcoal font-sans group-hover:text-brand-red transition-colors duration-300">
                      {link.name}
                    </h3>
                    <p className="text-xs font-mono text-brand-charcoal/40 uppercase mt-0.5 tracking-wider">
                      {handleText}
                    </p>
                  </div>

                  <motion.div
                    animate={
                      hoverActive && isHovered 
                        ? { x: 3, y: -3, color: '#C8041C' } 
                        : { x: 0, y: 0, color: 'rgba(33,33,33,0.3)' }
                    }
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}

