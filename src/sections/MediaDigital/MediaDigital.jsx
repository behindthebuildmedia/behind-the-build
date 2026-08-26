import { useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export default function MediaDigital() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      num: '01',
      title: 'VIDEO EDITING',
      subtitle: 'MEDIA',
      desc: 'We turn raw footage into content built to hold attention.',
      path: '/services/video-editing'
    },
    {
      num: '02',
      title: 'SOCIAL MEDIA MARKETING',
      subtitle: 'CONTENT',
      desc: 'We build a consistent social presence around your brand.',
      path: '/services/social-media-marketing'
    },
    {
      num: '03',
      title: 'DESIGN',
      subtitle: 'DESIGN',
      desc: 'Visual systems that make your brand recognizable.',
      path: '/services/design'
    },
    {
      num: '04',
      title: 'WEBSITE DESIGN',
      subtitle: 'DIGITAL',
      desc: 'Digital experiences designed to make your brand look serious.',
      path: '/services/website-design'
    },
    {
      num: '05',
      title: 'TECH EVENTS COVERAGE',
      subtitle: 'EVENTS',
      desc: 'Capture the moments, people and energy behind your event.',
      path: '/services/tech-events-coverage'
    },
    {
      num: '06',
      title: 'DIGITAL MARKETING',
      subtitle: 'MARKETING',
      desc: 'Performance-focused digital strategies designed to reach the right audience.',
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
    <section id="about" className="py-24 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Header Area */}
        <div className="space-y-5 text-left max-w-3xl mb-16">
          <ScrollReveal yOffset={10} duration={0.45} delay={0}>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              WHAT WE DO
            </span>
          </ScrollReveal>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
            <ScrollReveal delay={0.1} yOffset={35} duration={0.8} className="block overflow-hidden pb-1">
              BUILDING BRANDS FOR WHAT'S NEXT.
            </ScrollReveal>
          </h2>
        </div>

        {/* Services 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
          {categories.map((cat, idx) => (
            <ScrollReveal key={idx} delay={0.08 * idx}>
              <a
                href={cat.path}
                onClick={(e) => handleSpaClick(e, cat.path)}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-brand-white border border-[#E6E6E6] p-8 rounded-none flex flex-col justify-between min-h-[250px] transition-all duration-500 overflow-hidden transform ${
                  hoveredCard !== null && hoveredCard !== idx ? 'opacity-45 scale-[0.98]' : 'opacity-100 scale-100'
                } ${hoveredCard === idx ? '-translate-y-1.5 border-[#C8041C]/25 bg-[#FAF9F9] shadow-[0_12px_40px_rgba(0,0,0,0.02)]' : ''}`}
              >
                {/* Subtle red top bar revealed on hover */}
                <div 
                  className={`absolute top-0 left-0 w-full h-[3px] bg-[#C8041C] transition-transform duration-500 origin-left ${
                    hoveredCard === idx ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />

                <div className="space-y-6">
                  {/* Top line with category number and subtitle */}
                  <div className="flex justify-between items-baseline">
                    <span className="text-[9px] font-mono font-black text-[#212121]/30 uppercase tracking-widest block">
                      {cat.subtitle}
                    </span>
                    <span className="text-sm font-mono font-black text-brand-charcoal/20 select-none">
                      {cat.num}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className={`text-xl font-black tracking-wide uppercase transition-colors duration-300 ${
                    hoveredCard === idx ? 'text-[#C8041C]' : 'text-brand-charcoal'
                  }`}>
                    {cat.title}
                  </h3>

                  {/* One-line Description */}
                  <p className="text-xs sm:text-sm text-brand-charcoal/60 leading-relaxed font-semibold">
                    {cat.desc}
                  </p>
                </div>

                {/* Explore button with arrow shift */}
                <div className="pt-6 flex items-center gap-1 text-[10px] font-mono font-black uppercase tracking-widest text-[#212121] transition-colors">
                  <span>EXPLORE</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    hoveredCard === idx ? 'transform translate-x-1 text-[#C8041C]' : 'text-[#212121]/50'
                  }`} />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
