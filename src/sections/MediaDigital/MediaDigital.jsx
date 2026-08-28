import { useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export default function MediaDigital() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      num: '01',
      title: 'VIDEO EDITING',
      desc: 'Professional short-form editing for brands, founders, products and technology companies.',
      price: '₹7,999',
      path: '/services/video-editing'
    },
    {
      num: '02',
      title: 'SOCIAL MEDIA MARKETING',
      desc: 'Strategy, content and management designed to build a consistent digital presence.',
      price: '₹6,999',
      path: '/services/social-media-marketing'
    },
    {
      num: '03',
      title: 'DESIGN',
      desc: 'Creative design systems that make your brand look consistent and recognizable.',
      price: '₹6,999',
      path: '/services/design'
    },
    {
      num: '04',
      title: 'TECH EVENT COVERAGE',
      desc: 'Professional photo and video coverage for launches, conferences, campus and technology events.',
      price: '₹9,000',
      path: '/services/tech-event-coverage'
    },
    {
      num: '05',
      title: 'DIGITAL MARKETING',
      desc: 'Strategic digital marketing designed to grow your visibility, reach and audience.',
      price: '₹7,999',
      path: '/services/digital-marketing'
    }
  ];

  const handleSpaClick = (e, path) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section id="services" className="py-20 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center space-y-12">
        
        {/* SECTION HEADER */}
        <div className="space-y-4 max-w-3xl">
          <ScrollReveal yOffset={30} duration={0.7} delay={0}>
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              SERVICES
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.12} yOffset={30} duration={0.7}>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
              WHAT WE DO.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.24} yOffset={30} duration={0.7} className="pt-2">
            <p className="text-xs sm:text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-semibold max-w-2xl mx-auto">
              From media and content to design and digital experiences, we build everything brands need for what's next.
            </p>
          </ScrollReveal>
        </div>

        {/* SERVICE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full text-left items-stretch">
          {categories.map((cat, idx) => (
            <ScrollReveal key={idx} delay={0.15 + 0.05 * idx} yOffset={30} duration={0.7} className="flex flex-col h-full w-full">
              <a
                href={cat.path}
                onClick={(e) => handleSpaClick(e, cat.path)}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-brand-white border border-[#E6E6E6] p-8 rounded-xl flex flex-col justify-between transition-all duration-300 w-full h-full transform ${
                  hoveredCard === idx 
                    ? '-translate-y-1 border-[#C8041C]/35 bg-[#FAF9F9] shadow-[0_8px_30px_rgba(0,0,0,0.02)]' 
                    : ''
                }`}
                style={{ minHeight: '280px' }}
              >
                <div className="space-y-4">
                  {/* Top Line: Number & Title */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-mono font-black text-[#C8041C] leading-none select-none block">
                      {cat.num}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-black tracking-wider uppercase text-brand-charcoal leading-snug">
                    {cat.title}
                  </h3>
                  
                  <p className="text-xs text-brand-charcoal/60 leading-relaxed font-semibold">
                    {cat.desc}
                  </p>
                </div>

                {/* Bottom line: Price and Button */}
                <div className="pt-6 flex justify-between items-end border-t border-[#E6E6E6] mt-8">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-[#212121]/50 uppercase tracking-widest font-black block">
                      STARTING FROM
                    </span>
                    <span className={`text-xl font-black transition-colors duration-300 leading-none ${
                      hoveredCard === idx ? 'text-[#C8041C]' : 'text-brand-charcoal'
                    }`}>
                      {cat.price}
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-widest transition-colors duration-300 ${
                    hoveredCard === idx ? 'text-[#C8041C]' : 'text-[#212121]'
                  }`}>
                    <span>VIEW PACKAGES</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      hoveredCard === idx ? 'transform translate-x-1' : 'text-[#212121]/50'
                    }`} />
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
