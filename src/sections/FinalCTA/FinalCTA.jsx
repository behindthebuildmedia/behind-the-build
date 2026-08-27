import { motion } from 'framer-motion';
import footerImg from '../../assets/images/footer.webp';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToBuilder = (e) => {
    e.preventDefault();
    window.history.pushState(null, '', '/start-a-project');
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      const headerOffset = 80;
      const elementPosition = workSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const lineRevealVariants1 = {
    initial: { y: 45, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }
  };

  const lineRevealVariants2 = {
    initial: { y: 45, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 } }
  };

  const lineRevealVariants3 = {
    initial: { y: 45, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.40 } }
  };

  return (
    <section 
      id="connect"
      className="relative py-20 md:py-24 flex items-center overflow-hidden bg-brand-white select-none border-t border-brand-charcoal/5"
    >
      
      {/* Background Image with Parallax & White Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={shouldReduceMotion ? { scale: 1.04, opacity: 0.55 } : { scale: 1.0, opacity: 0 }}
          whileInView={{ scale: 1.04, opacity: 0.55 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          src={footerImg}
          alt="Behind the Build video production setup"
          className="w-full h-full object-cover origin-center"
        />
        {/* Controlled gradient overlay: lighter on the left for text contrast, more visible image on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-white/95 via-brand-white/80 to-brand-white/30 pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10 text-left">
        
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-3xl flex flex-col items-start space-y-4 md:space-y-5"
        >
          {/* Section Accent Label */}
          <motion.p 
            variants={shouldReduceMotion ? {} : {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 } }
            }}
            className="text-xs font-bold uppercase tracking-widest text-[#C8041C] font-mono leading-none"
          >
            LET'S CREATE TOGETHER
          </motion.p>

          {/* Large Typographic Editorial Heading */}
          {shouldReduceMotion ? (
            <h2 className="text-4xl sm:text-6xl xl:text-7.5xl font-black tracking-tight text-brand-charcoal leading-[1.1] uppercase font-sans">
              HAVE SOMETHING<br />
              <span className="text-[#C8041C]">
                WORTH BUILDING?
              </span>
            </h2>
          ) : (
            <h2 className="text-4xl sm:text-6xl xl:text-7.5xl font-black tracking-tight text-brand-charcoal leading-[1.1] uppercase font-sans">
              <span className="block overflow-hidden pb-1">
                <motion.span variants={lineRevealVariants1} className="block">
                  HAVE SOMETHING
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span variants={lineRevealVariants2} className="text-[#C8041C] block">
                  WORTH BUILDING?
                </motion.span>
              </span>
            </h2>
          )}

          {/* Description Copy */}
          <motion.p 
            variants={shouldReduceMotion ? {} : {
              initial: { opacity: 0, y: 15 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 } }
            }}
            className="text-sm sm:text-base text-brand-charcoal/70 leading-relaxed font-sans font-bold max-w-[600px]"
          >
            Tell us what you're building. We'll figure out how to bring it to the world.
          </motion.p>

          {/* Buttons Deck */}
          <motion.div 
            variants={shouldReduceMotion ? {} : {
              initial: { opacity: 0, y: 15 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 } }
            }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={handleScrollToBuilder}
              className="bg-[#C8041C] text-brand-white hover:bg-[#A60417] px-8 py-4 rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 hover:shadow-md cursor-pointer hover:-translate-y-0.5"
            >
              <span>START A PROJECT →</span>
            </button>
            <button
              onClick={handleScrollToWork}
              className="bg-transparent border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-white px-8 py-4 rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
            >
              <span>VIEW OUR WORK →</span>
            </button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
