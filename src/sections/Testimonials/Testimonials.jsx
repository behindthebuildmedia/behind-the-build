import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import santhoshImg from '../../assets/projects/santhosh.webp';

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
  return (
    <section id="testimonials" className="py-24 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C8041C] font-mono">
              CLIENT LOVE
            </p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal">
              CLIENT LOVE<span className="text-[#C8041C]">.</span>
            </h2>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50 select-none">
              MORE REVIEWS ON REQUEST →
            </span>
          </div>
        </div>

        {/* 2-Column Split Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {testimonialsData.map((item, idx) => (
            <ScrollReveal 
              key={item.id}
              delay={idx * 0.08}
              className="w-full"
            >
              <div className="bg-brand-white border border-[#E6E6E6] rounded-none overflow-hidden flex flex-col sm:flex-row items-stretch min-h-[260px] w-full hover:border-brand-charcoal/30 transition-all duration-300">
                {/* Left Side Client Image */}
                <div className="w-full sm:w-[35%] min-h-[200px] sm:min-h-0 relative overflow-hidden bg-brand-lightgray shrink-0 border-b sm:border-b-0 sm:border-r border-[#E6E6E6]">
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    width="200"
                    height="300"
                    className="absolute inset-0 w-full h-full object-cover filter grayscale"
                    loading="lazy"
                  />
                </div>

                {/* Right Side Quote Content */}
                <div className="w-full sm:w-[65%] p-8 flex flex-col justify-between text-left space-y-6">
                  <div className="space-y-4">
                    {/* Red Quote Mark */}
                    <span className="text-5xl font-serif font-black text-[#C8041C] leading-none block select-none h-6">
                      “
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-brand-charcoal/70 leading-relaxed font-sans">
                      {item.quote}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider leading-none">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-brand-charcoal/45 uppercase tracking-wide font-medium block">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
