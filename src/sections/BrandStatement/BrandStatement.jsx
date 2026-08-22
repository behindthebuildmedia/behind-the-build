import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

export default function BrandStatement() {
  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  return (
    <section 
      id="philosophy" 
      className="py-20 md:py-24 bg-brand-white relative flex items-center justify-center overflow-hidden border-t border-brand-charcoal/5 select-none"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full text-center relative z-10">
        
        {/* Editorial Subtitle */}
        <ScrollReveal delay={0}>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red font-mono mb-6">
            03 / OUR PHILOSOPHY
          </p>
        </ScrollReveal>

        {/* Large Typographic Headline (Animated line-by-line) */}
        <motion.h2 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05] font-sans"
        >
          <span className="block overflow-hidden">
            <motion.span variants={lineVariants} className="inline-block">
              WE DON'T JUST
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={lineVariants} className="inline-block">
              CREATE CONTENT.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={lineVariants} className="inline-block">
              WE CREATE <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-brand-red inline-block"
              >
                ATTENTION.
              </motion.span>
            </motion.span>
          </span>
        </motion.h2>

        {/* Supporting Copy */}
        <ScrollReveal delay={0.35}>
          <p className="mt-8 text-sm sm:text-base md:text-lg text-brand-charcoal/60 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            Every photo, video, and campaign is crafted to help your brand get noticed, remembered, and shared. We combine creativity, strategy, and cinematic storytelling to create content that delivers real impact.
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
