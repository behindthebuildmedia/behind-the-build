import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

export default function MediaDigital() {
  const mediaItems = [
    'Video Production',
    'Video Editing',
    'Photography',
    'Event Coverage',
    'Motion Graphics'
  ];

  const digitalItems = [
    'Social Media',
    'Content Strategy',
    'Graphic Design',
    'Creative Campaigns',
    'Digital Growth'
  ];

  const cardVariants = {
    rest: { borderLeftWidth: 1, borderLeftColor: '#E6E6E6' },
    hover: { 
      borderLeftWidth: 4, 
      borderLeftColor: '#C8041C',
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  const itemVariants = {
    rest: { x: 0 },
    hover: { 
      x: 3,
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  const checkIcon = (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#C8041C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  return (
    <section id="about" className="py-24 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column - Positioning Info */}
          <ScrollReveal className="lg:col-span-5 text-left space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-[#C8041C] uppercase font-mono block">
                MEDIA × DIGITAL
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
                MEDIA THAT GETS <span className="text-[#C8041C]">SEEN.</span>
                <br />
                DIGITAL THAT MAKES IT <span className="text-[#C8041C]">MATTER.</span>
              </h2>
            </div>
            
            <p className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-normal">
              Behind The Build combines media production and digital marketing to help brands create attention, build presence, and stay relevant.
            </p>
          </ScrollReveal>

          {/* Right Column - Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
            
            {/* Media Card */}
            <ScrollReveal delay={0.08}>
              <motion.div 
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={cardVariants}
                className="bg-brand-white border border-[#E6E6E6] p-8 rounded-none flex flex-col justify-between h-[360px] cursor-default"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold tracking-tight text-brand-charcoal uppercase">
                      MEDIA
                    </h3>
                    <span className="text-3xl font-black text-[#E6E6E6] leading-none select-none font-mono">
                      01
                    </span>
                  </div>
                  
                  <ul className="space-y-4">
                    {mediaItems.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        variants={itemVariants}
                        className="text-xs sm:text-sm font-medium text-brand-charcoal/80 flex items-start gap-3"
                      >
                        {checkIcon}
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Digital Card */}
            <ScrollReveal delay={0.16}>
              <motion.div 
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={cardVariants}
                className="bg-brand-white border border-[#E6E6E6] p-8 rounded-none flex flex-col justify-between h-[360px] cursor-default"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold tracking-tight text-brand-charcoal uppercase">
                      DIGITAL
                    </h3>
                    <span className="text-3xl font-black text-[#E6E6E6] leading-none select-none font-mono">
                      02
                    </span>
                  </div>
                  
                  <ul className="space-y-4">
                    {digitalItems.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        variants={itemVariants}
                        className="text-xs sm:text-sm font-medium text-brand-charcoal/80 flex items-start gap-3"
                      >
                        {checkIcon}
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </ScrollReveal>

          </div>

        </div>
      </div>
    </section>
  );
}
