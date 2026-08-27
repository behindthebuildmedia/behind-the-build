import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import logoConsistency from '../../assets/images/partner_1.webp';
import logoDelusion from '../../assets/images/partner_2.webp';
import logoPartner3 from '../../assets/images/partner3.webp';
import logoPartner4 from '../../assets/images/partner4.webp';

export default function Clients() {
  const lineVariants = {
    rest: { scaleX: 0 },
    hover: { 
      scaleX: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const cardHoverVariants = {
    rest: { y: 0 },
    hover: { 
      y: -3,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="clients" className="py-12 sm:py-16 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full text-center flex flex-col justify-center items-center">
        
        {/* Section Label */}
        <ScrollReveal yOffset={10} duration={0.45} delay={0} className="w-full">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8041C] font-mono block mb-3">
            OUR CLIENTS
          </span>
        </ScrollReveal>

        {/* Main Heading */}
        <div className="w-full mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.1]">
            <ScrollReveal delay={0.1} yOffset={35} duration={0.8} className="block overflow-hidden pb-1">
              TRUSTED BY BRANDS
            </ScrollReveal>
            <ScrollReveal delay={0.22} yOffset={35} duration={0.8} className="block overflow-hidden">
              BUILDING WHAT'S <span className="text-[#C8041C]">NEXT.</span>
            </ScrollReveal>
          </h2>
        </div>

        {/* Supporting Text */}
        <ScrollReveal yOffset={20} duration={0.7} delay={0.35} className="w-full max-w-4xl">
          <p className="text-sm md:text-base text-brand-charcoal/80 leading-relaxed font-normal lg:whitespace-nowrap mb-6 px-4">
            "From AI platforms to emerging brands, we work with teams that care about how their story is seen."
          </p>
        </ScrollReveal>

        {/* Subtle Horizontal Divider */}
        <ScrollReveal delay={0.45} className="w-full max-w-2xl mb-8">
          <hr className="border-[#E5E5E5] w-full" />
        </ScrollReveal>

        {/* Logo Row */}
        <ScrollReveal yOffset={15} duration={0.7} delay={0.5} className="w-full">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 w-full">
            
            {/* Consistency.AI Logo */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
              className="flex flex-col items-center justify-center cursor-default relative py-4 px-4 w-full max-w-[200px]"
            >
              <div className="h-16 flex items-center justify-center w-full">
                <motion.img 
                  src={logoConsistency} 
                  alt="Consistency.AI Logo" 
                  width="200"
                  height="66"
                  className="max-h-full object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  style={{ transitionProperty: 'filter, opacity' }}
                  variants={{
                    rest: { filter: 'grayscale(1) opacity(0.4)' },
                    hover: { filter: 'grayscale(0) opacity(1)' }
                  }}
                  loading="lazy"
                />
              </div>
              
              {/* Subtle Red Line Accent */}
              <motion.div 
                variants={lineVariants}
                className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8041C] origin-center"
              />
            </motion.div>

            {/* DelusionAI Logo */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
              className="flex flex-col items-center justify-center cursor-default relative py-4 px-4 w-full max-w-[200px]"
            >
              <div className="h-16 flex items-center justify-center w-full">
                <motion.img 
                  src={logoDelusion} 
                  alt="DelusionAI Logo" 
                  width="200"
                  height="66"
                  className="max-h-full object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  style={{ transitionProperty: 'filter, opacity' }}
                  variants={{
                    rest: { filter: 'grayscale(1) opacity(0.4)' },
                    hover: { filter: 'grayscale(0) opacity(1)' }
                  }}
                  loading="lazy"
                />
              </div>
              
              {/* Subtle Red Line Accent */}
              <motion.div 
                variants={lineVariants}
                className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8041C] origin-center"
              />
            </motion.div>

            {/* Partner 3 Logo */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
              className="flex flex-col items-center justify-center cursor-default relative py-4 px-4 w-full max-w-[200px]"
            >
              <div className="h-16 flex items-center justify-center w-full">
                <motion.img 
                  src={logoPartner3} 
                  alt="Behind the Build client partner" 
                  width="200"
                  height="66"
                  className="max-h-full object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  style={{ transitionProperty: 'filter, opacity' }}
                  variants={{
                    rest: { filter: 'grayscale(1) opacity(0.4)' },
                    hover: { filter: 'grayscale(0) opacity(1)' }
                  }}
                  loading="lazy"
                />
              </div>
              
              {/* Subtle Red Line Accent */}
              <motion.div 
                variants={lineVariants}
                className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8041C] origin-center"
              />
            </motion.div>

            {/* Partner 4 Logo */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
              className="flex flex-col items-center justify-center cursor-default relative py-4 px-4 w-full max-w-[200px]"
            >
              <div className="h-16 flex items-center justify-center w-full">
                <motion.img 
                  src={logoPartner4} 
                  alt="Behind the Build client partner" 
                  width="200"
                  height="66"
                  className="max-h-full object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  style={{ transitionProperty: 'filter, opacity' }}
                  variants={{
                    rest: { filter: 'grayscale(1) opacity(0.4)' },
                    hover: { filter: 'grayscale(0) opacity(1)' }
                  }}
                  loading="lazy"
                />
              </div>
              
              {/* Subtle Red Line Accent */}
              <motion.div 
                variants={lineVariants}
                className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8041C] origin-center"
              />
            </motion.div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
