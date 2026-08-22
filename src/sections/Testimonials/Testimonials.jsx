import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import santhoshImg from '../../assets/projects/santhosh.webp';

const testimonialsData = [
  {
    id: 1,
    stars: 5,
    quote: "Behind The Build transformed our ideas into powerful content that actually connects.",
    avatar: santhoshImg,
    name: "Santosh Kumar Thota",
    role: "Founder",
    company: "Consistency AI"
  },
  {
    id: 2,
    stars: 5,
    quote: "The level of cinematic detail and strategic positioning Behind The Build brought to our brand was unmatched.",
    avatar: santhoshImg, // Using santhosh.webp as fallback since no other headshot exists
    name: "Ganesh",
    role: "Marketing Head",
    company: "Delusion AI"
  }
];

// Quote Icon SVG component
const QuoteIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.987z" />
  </svg>
);

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden border-t border-brand-charcoal/5 text-center select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C8041C]">
              08 / CLIENT LOVE
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
              <span className="text-[#212121]">REAL STORIES.</span><br />
              <span className="text-[#C8041C]">REAL IMPACT.</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.12}>
            <p className="text-sm md:text-base text-[#212121]/60 leading-relaxed font-sans font-normal">
              What our clients say about working with Behind The Build.
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column Testimonials Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full px-4"
        >
          {testimonialsData.map((item) => (
            <div 
              key={item.id}
              className="bg-white p-8 sm:p-10 rounded-[20px] border border-[#E5E5E5] transition-all duration-250 flex flex-col justify-between text-left min-h-[320px] w-full"
            >
              {/* Quote & Stars */}
              <div className="space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                  <QuoteIcon className="text-[#C8041C] opacity-80" />
                  <div className="text-xs text-[#C8041C] tracking-widest leading-none select-none">
                    ★★★★★
                  </div>
                </div>

                <p className="text-base sm:text-lg font-medium text-[#212121]/90 leading-relaxed font-sans">
                  “{item.quote}”
                </p>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[#E5E5E5] w-full my-6" />

              {/* Client Profile */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#212121]/5 bg-brand-lightgray shrink-0">
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    width="56"
                    height="56"
                    className="w-full h-full object-cover filter grayscale"
                    loading="lazy"
                  />
                </div>
                <div className="text-left flex flex-col justify-center">
                  <h4 className="text-base font-bold text-[#212121] leading-tight font-sans">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#212121]/60 font-sans mt-0.5 leading-none">
                    {item.role}
                  </p>
                  <p className="text-xs font-bold text-[#212121]/45 font-sans mt-1 leading-none">
                    {item.company}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
