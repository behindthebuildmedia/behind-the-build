import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import logoConsistency from '../../assets/images/partner_1.webp';
import logoDelusion from '../../assets/images/partner_2.webp';

export default function Clients() {
  const lineVariants = {
    rest: { scaleX: 0 },
    hover: { 
      scaleX: 1,
      transition: { duration: 0.35, ease: 'easeOut' }
    }
  };

  return (
    <section id="clients" className="py-24 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Heading & Description */}
          <ScrollReveal className="lg:col-span-5 text-left space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8041C] font-mono block">
                OUR CLIENTS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
                TRUSTED BY BRANDS
                <br />
                BUILDING WHAT'S <span className="text-[#C8041C]">NEXT.</span>
              </h2>
            </div>
            
            <p className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-normal">
              From AI platforms to emerging brands, we work with teams that care about how their story is seen.
            </p>
          </ScrollReveal>

          {/* Right Column - Logo Grid (Two equal columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full items-center justify-center">
            
            {/* Consistency.AI Logo */}
            <ScrollReveal delay={0.08} className="w-full flex justify-center">
              <motion.div 
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="flex flex-col items-center gap-4 cursor-default relative py-8 px-4 w-full max-w-[240px]"
              >
                <div className="h-16 flex items-center justify-center w-full">
                  <motion.img 
                    src={logoConsistency} 
                    alt="Consistency.AI Logo" 
                    width="180"
                    height="64"
                    className="max-h-full object-contain filter grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-350"
                    style={{ transitionProperty: 'filter, opacity' }}
                    variants={{
                      rest: { filter: 'grayscale(1) opacity(0.45)' },
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
            </ScrollReveal>

            {/* DelusionAI Logo */}
            <ScrollReveal delay={0.16} className="w-full flex justify-center">
              <motion.div 
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="flex flex-col items-center gap-4 cursor-default relative py-8 px-4 w-full max-w-[240px]"
              >
                <div className="h-16 flex items-center justify-center w-full">
                  <motion.img 
                    src={logoDelusion} 
                    alt="DelusionAI Logo" 
                    width="180"
                    height="64"
                    className="max-h-full object-contain filter grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-350"
                    style={{ transitionProperty: 'filter, opacity' }}
                    variants={{
                      rest: { filter: 'grayscale(1) opacity(0.45)' },
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
            </ScrollReveal>

          </div>

        </div>
      </div>
    </section>
  );
}
