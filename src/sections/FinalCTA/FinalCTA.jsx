import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

import footerImg from '../../assets/images/footer.webp';

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Monitor scroll progress relative to this section for background parallax scaling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);

  const handleScrollToBuilder = (e) => {
    e.preventDefault();
    const builderSection = document.getElementById('build-plan');
    if (builderSection) {
      builderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Viewport Enter Animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const labelVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-28 md:py-36 flex items-center overflow-hidden bg-brand-white select-none border-t border-brand-charcoal/5"
    >
      
      {/* Background Image with Parallax & White Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={footerImg}
          alt="Behind the Build video production setup"
          style={shouldReduceMotion ? { scale: 1 } : { scale: bgScale }}
          className="w-full h-full object-cover origin-center opacity-90"
        />
        {/* Soft white overlay with left-to-right gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none" />
        
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(255,255,255,0.3)_95%)] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 text-left h-full flex items-center">
        
        {/* Animated Text Content block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl flex flex-col items-start space-y-6 md:space-y-8"
        >
          {/* Section Accent Label */}
          <motion.p 
            variants={labelVariants}
            className="text-xs font-bold uppercase tracking-widest text-brand-red font-mono"
          >
            10 / LET'S BUILD
          </motion.p>

          {/* Large Typographic Editorial Heading */}
          <motion.h2 
            variants={headingVariants}
            className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-brand-charcoal leading-[1.05] uppercase font-sans"
          >
            LET'S BUILD YOUR<br />
            NEXT <span className="text-brand-red font-black">SUCCESS STORY.</span>
          </motion.h2>

          {/* Description Copy */}
          <motion.p 
            variants={descriptionVariants}
            className="text-xs sm:text-sm text-brand-charcoal/70 leading-relaxed font-sans font-normal max-w-[600px]"
          >
            From strategy and production to editing and delivery, we create content that helps brands grow, connect, and stand out. Whether you're launching a startup, building a personal brand, or scaling a business, we're ready to bring your vision to life.
          </motion.p>

          {/* Buttons Deck */}
          <motion.div 
            variants={buttonVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={handleScrollToBuilder}
              className="bg-brand-red text-brand-white hover:bg-[#A60417] hover:shadow-[0_4px_15px_rgba(200,4,28,0.2)] px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>START A PROJECT →</span>
            </button>
            <button
              onClick={handleScrollToWork}
              className="bg-transparent border border-black text-brand-charcoal hover:bg-black hover:text-white px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300"
            >
              <span>VIEW OUR WORK →</span>
            </button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
