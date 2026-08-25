import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import santhoshImg from '../../assets/projects/santhosh.webp';

import { useReducedMotion } from '../../hooks/useReducedMotion';

const testimonialsData = [
  {
    id: 1,
    quote: "Behind The Build has been a game-changer for Consistency.AI. Their content, consistency, and creativity helped us grow an incredible community and reach millions.",
    avatar: santhoshImg,
    name: "Santosh Kumar Thota",
    role: "Founder, Consistency.AI"
  },
  {
    id: 2,
    quote: "Their team understands our vision and turns it into powerful content every single time. Professional, reliable, and extremely creative.",
    avatar: santhoshImg, // Fallback as Ganesh headshot is not in files
    name: "Ganesh",
    role: "Marketing Head, DelusionAI"
  }
];

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  const imageRevealVariants = {
    initial: { opacity: 0, x: -12 },
    animate: (idx) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: idx * 0.12 + 0.1 }
    })
  };

  const rightContentVariants = {
    initial: {},
    animate: (idx) => ({
      transition: {
        staggerChildren: 0.12,
        delayChildren: idx * 0.12 + 0.22
      }
    })
  };

  const quoteRevealVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const nameRevealVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-4">
            <ScrollReveal yOffset={10} duration={0.45} delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-[#C8041C] font-mono">
                CLIENT LOVE
              </p>
            </ScrollReveal>
            <ScrollReveal yOffset={35} duration={0.8} delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal">
                CLIENT LOVE<span className="text-[#C8041C]">.</span>
              </h2>
            </ScrollReveal>
          </div>
          <div>
            <ScrollReveal yOffset={10} duration={0.45} delay={0.2}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50 select-none block md:pb-1">
                MORE REVIEWS ON REQUEST →
              </span>
            </ScrollReveal>
          </div>
        </div>

        {/* 2-Column Split Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {testimonialsData.map((item, idx) => (
            <div 
              key={item.id}
              className="w-full"
            >
              <motion.div 
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                animate="rest"
                viewport={{ once: true, amount: 0.15 }}
                custom={idx}
                className="bg-brand-white border border-[#E6E6E6] rounded-none overflow-hidden flex flex-col sm:flex-row items-stretch min-h-[260px] w-full hover:border-brand-charcoal/30 transition-all duration-300 relative group cursor-default"
              >
                {/* Left Side Client Image */}
                <motion.div 
                  custom={idx}
                  variants={shouldReduceMotion ? {} : imageRevealVariants}
                  className="w-full sm:w-[35%] min-h-[200px] sm:min-h-0 relative overflow-hidden bg-brand-lightgray shrink-0 border-b sm:border-b-0 sm:border-r border-[#E6E6E6]"
                >
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    width="200"
                    height="300"
                    className="absolute inset-0 w-full h-full object-cover filter grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </motion.div>

                {/* Right Side Quote Content */}
                <motion.div 
                  custom={idx}
                  variants={shouldReduceMotion ? {} : rightContentVariants}
                  className="w-full sm:w-[65%] p-8 flex flex-col justify-between text-left space-y-6"
                >
                  <motion.div variants={shouldReduceMotion ? {} : quoteRevealVariants} className="space-y-4">
                    {/* Red Quote Mark */}
                    <span className="text-5xl font-serif font-black text-[#C8041C] leading-none block select-none h-6">
                      “
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-brand-charcoal/70 leading-relaxed font-sans">
                      {item.quote}
                    </p>
                  </motion.div>

                  <motion.div variants={shouldReduceMotion ? {} : nameRevealVariants} className="space-y-1">
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider leading-none">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-brand-charcoal/45 uppercase tracking-wide font-medium block">
                      {item.role}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Bottom Red Accent Line */}
                <motion.div 
                  variants={{
                    rest: { scaleX: 0 },
                    hover: { scaleX: 1, transition: { duration: 0.3, ease: 'easeOut' } }
                  }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8041C] origin-left"
                />
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
