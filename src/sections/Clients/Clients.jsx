import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import logoConsistency from '../../assets/images/partner_1.webp';
import logoDelusion from '../../assets/images/partner_2.webp';

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
    <section id="clients" className="py-16 sm:py-20 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans flex items-center justify-center min-h-[420px] lg:min-h-[480px] lg:max-h-[520px]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full text-center flex flex-col justify-center items-center">
        
        {/* Section Label */}
        <ScrollReveal className="w-full">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8041C] font-mono block mb-3">
            OUR CLIENTS
          </span>
        </ScrollReveal>

        {/* Main Heading */}
        <ScrollReveal delay={0.05} className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.1] mb-6">
            TRUSTED BY BRANDS
            <br />
            BUILDING WHAT'S <span className="text-[#C8041C]">NEXT.</span>
          </h2>
        </ScrollReveal>

        {/* Supporting Text */}
        <ScrollReveal delay={0.1} className="w-full max-w-4xl">
          <p className="text-sm md:text-base text-brand-charcoal/80 leading-relaxed font-normal lg:whitespace-nowrap mb-6 px-4">
            "From AI platforms to emerging brands, we work with teams that care about how their story is seen."
          </p>
        </ScrollReveal>

        {/* Subtle Horizontal Divider */}
        <ScrollReveal delay={0.15} className="w-full max-w-2xl mb-8">
          <hr className="border-[#E5E5E5] w-full" />
        </ScrollReveal>

        {/* Logo Row */}
        <ScrollReveal delay={0.2} className="w-full">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 md:gap-24 w-full">
            
            {/* Consistency.AI Logo */}
            <motion.div 
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
              className="flex flex-col items-center justify-center cursor-default relative py-4 px-4 w-full max-w-[280px]"
            >
              <div className="h-20 flex items-center justify-center w-full">
                <motion.img 
                  src={logoConsistency} 
                  alt="Consistency.AI Logo" 
                  width="240"
                  height="80"
                  className="max-h-full object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  style={{ transitionProperty: 'filter, opacity' }}
                  variants={{
                    rest: { filter: 'grayscale(1) opacity(0.4)' },
                    hover: { filter: 'grayscale(0) opacity(1)' }
                  }}
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
              className="flex flex-col items-center justify-center cursor-default relative py-4 px-4 w-full max-w-[280px]"
            >
              <div className="h-20 flex items-center justify-center w-full">
                <motion.img 
                  src={logoDelusion} 
                  alt="DelusionAI Logo" 
                  width="240"
                  height="80"
                  className="max-h-full object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  style={{ transitionProperty: 'filter, opacity' }}
                  variants={{
                    rest: { filter: 'grayscale(1) opacity(0.4)' },
                    hover: { filter: 'grayscale(0) opacity(1)' }
                  }}
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
