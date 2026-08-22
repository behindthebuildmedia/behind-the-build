import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useResponsive } from '../../hooks/useResponsive';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

// Count-up animation helper
function CountUp({ from = 0, to, duration = 1.8, delay = 0, suffix = '', format = (val) => val, shouldCount = true }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!shouldCount) {
      setCount(to);
      return;
    }
    
    let startTimestamp = null;
    let frameId;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const timeProgress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Cubic ease-out curve to decelerate smoothly as we reach final value
      const easeProgress = 1 - Math.pow(1 - timeProgress, 3);
      setCount(Math.floor(easeProgress * (to - from) + from));
      if (timeProgress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    const timer = setTimeout(() => {
      frameId = window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [from, to, duration, delay, shouldCount]);

  return <span>{format(count)}{suffix}</span>;
}

export default function Impact() {
  const shouldReduceMotion = useReducedMotion();
  const { isTouch } = useResponsive();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const hoverActive = !shouldReduceMotion && !isTouch;

  // Staggered reveal for heading elements
  const headingVariants = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const stats = [
    {
      id: 'projects',
      value: 50,
      suffix: '+',
      labelLine1: 'PROJECTS',
      labelLine2: 'DELIVERED'
    },
    {
      id: 'partners',
      value: 2,
      suffix: '',
      labelLine1: 'CLIENT',
      labelLine2: 'BRANDS',
      format: (val) => val.toString().padStart(2, '0')
    },
    {
      id: 'hours',
      value: 150,
      suffix: '+',
      labelLine1: 'EDITING',
      labelLine2: 'HOURS'
    },
    {
      id: 'quality',
      value: 100,
      suffix: '%',
      labelLine1: 'CLIENT',
      labelLine2: 'SATISFACTION'
    }
  ];

  // Dot transition along the Build Line (horizontal, delayed until after Column 1 finishes count-up)
  const dotVariants = {
    hidden: { left: "0%" },
    visible: {
      left: ["0%", "0%", "33.33%", "33.33%", "66.66%", "66.66%", "100%", "100%"],
      transition: {
        duration: 3.0,
        ease: "easeInOut",
        times: [0, 0.33, 0.42, 0.50, 0.58, 0.67, 0.75, 1.0],
        delay: 0.1
      }
    }
  };

  // Divider line draws from left to right in brand red (#C8041C), then fades to the default light grey
  const redLineVariants = {
    hidden: { scaleX: 0, opacity: 1, originX: 0 },
    visible: (idx) => ({
      scaleX: [0, 1, 1],
      opacity: [1, 1, 0],
      transition: {
        duration: 1.2,
        delay: (idx * 0.25) + 1.0,
        times: [0, 0.6, 1.0],
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      id="impact" 
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: 'radial-gradient(rgba(33, 33, 33, 0.02) 0.75px, transparent 0.75px)',
        backgroundSize: '24px 24px'
      }}
      className="py-20 md:py-24 relative overflow-hidden border-t border-brand-charcoal/5"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-left">
        
        {/* Section Heading Block */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 md:mb-16">
            <div className="lg:col-span-5 space-y-4">
              <motion.p 
                variants={headingVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-widest text-brand-red font-mono"
              >
                02 / IMPACT
              </motion.p>
              
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-brand-charcoal leading-[1.1] font-sans">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={shouldReduceMotion ? { y: 0 } : { y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    THE NUMBERS
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={shouldReduceMotion ? { y: 0 } : { y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="inline-block"
                  >
                    BEHIND
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={shouldReduceMotion ? { y: 0 } : { y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="inline-block text-brand-red"
                  >
                    THE BUILD.
                  </motion.span>
                </span>
              </h2>
            </div>
  
            <div className="lg:col-span-7 lg:pt-10">
              <motion.p 
                variants={headingVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed max-w-lg"
              >
                Every project represents trust, creativity, and a commitment to delivering exceptional visual experiences.
              </motion.p>
            </div>
          </div>
        </ScrollReveal>

        {/* Statistics Grid */}
        <div className="relative mt-16 select-none">
          
          {/* Continuous build line spanning the columns (Only on Desktop/4-columns) */}
          {!shouldReduceMotion && isInView && (
            <div className="absolute top-[128px] left-[12.5%] right-[12.5%] h-[1.5px] bg-brand-charcoal/10 hidden md:block z-0">
              {/* Red progress line drawing from left to right */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.0, ease: "easeInOut", delay: 0.1 }}
                className="absolute inset-y-0 left-0 right-0 bg-brand-red"
              />
              {/* Traveling dot */}
              <motion.div
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                className="absolute -top-[4px] -ml-[5px] w-2.5 h-2.5 rounded-full bg-brand-red border-2 border-brand-white"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-16 md:gap-y-0 text-center items-stretch relative z-10">
            {stats.map((stat, idx) => {
              const isHovered = hoveredIdx === idx;
              const isAnyHovered = hoveredIdx !== null;
              
              // Hover animations logic
              const hasFocus = isHovered || (!isAnyHovered && !isTouch);
              const isDimmed = isAnyHovered && !isHovered;

              const scale = isHovered && hoverActive ? 1.05 : 1;
              const y = isHovered && hoverActive ? -8 : 0;
              const opacity = isDimmed && hoverActive ? 0.45 : 1;

              return (
                <ScrollReveal 
                  key={stat.id} 
                  delay={shouldReduceMotion ? 0 : idx * 0.12}
                >
                  <motion.div
                    onMouseEnter={() => hoverActive && setHoveredIdx(idx)}
                    onMouseLeave={() => hoverActive && setHoveredIdx(null)}
                    animate={{ opacity }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-between relative px-6 h-full"
                  >
                    {/* Statistic Number */}
                    <div className="w-full h-24 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: shouldReduceMotion ? 1 : scale,
                          y: shouldReduceMotion ? 0 : y,
                          color: isHovered && hoverActive ? '#C8041C' : '#212121'
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="font-sans text-[clamp(3.5rem,5vw,5.5rem)] font-black tracking-tight select-none leading-none flex items-center justify-center text-brand-charcoal"
                      >
                        <CountUp
                          from={0}
                          to={stat.value}
                          delay={idx * 0.25}
                          suffix={stat.suffix}
                          format={stat.format}
                          shouldCount={isInView && !shouldReduceMotion}
                        />
                      </motion.div>
                    </div>

                    {/* Horizontal Divider Line inside the column */}
                    <div className="w-full py-8">
                      <div className="w-full h-[1.5px] bg-brand-charcoal/10 relative overflow-hidden">
                        {/* Entrance red line reveal (fades out after drawing) */}
                        <motion.div
                          custom={idx}
                          variants={redLineVariants}
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                          className="absolute inset-0 bg-brand-red origin-left pointer-events-none"
                        />
                        {/* Hover red fill */}
                        <motion.div
                          animate={{ 
                            opacity: isHovered && hoverActive ? 1 : 0,
                            scaleX: isHovered && hoverActive ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-brand-red origin-center pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* Label */}
                    <div className="min-h-[60px] flex flex-col justify-start items-center">
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ 
                          duration: 0.5, 
                          delay: (idx * 0.25) + 1.1,
                          ease: 'easeOut' 
                        }}
                        className="text-center"
                      >
                        <motion.p
                          className="text-[10px] font-mono font-bold tracking-widest text-brand-charcoal uppercase leading-normal"
                        >
                          {stat.labelLine1}
                          <br />
                          {stat.labelLine2}
                        </motion.p>
                      </motion.div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

