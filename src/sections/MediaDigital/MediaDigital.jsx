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
      services: ['Reels & Short-form', 'Personal Growth Edits', 'Motion Graphics', 'Product Videos'],
      price: '₹6,000',
      path: '/services/video-editing'
    },
    {
      num: '02',
      title: 'SOCIAL MEDIA MARKETING',
      desc: 'Strategy, content and management designed to build a consistent digital presence.',
      services: ['Social Media Strategy', 'Content Creation', 'Content Calendar & Scheduling', 'Community Management', 'Monthly Reports'],
      price: '₹5,000',
      path: '/services/social-media-marketing'
    },
    {
      num: '03',
      title: 'DESIGN',
      desc: 'Creative design systems that make your brand look consistent and recognizable.',
      services: ['Graphic Design', 'Logo Design', 'Social Media Designs', 'Carousels', 'Thumbnails', 'Brand Identity'],
      price: '₹5,000',
      path: '/services/design'
    },
    {
      num: '04',
      title: 'WEBSITE DESIGN',
      desc: 'Modern, responsive websites built to present your brand and convert visitors.',
      services: ['Portfolio Websites', 'Commercial Websites', 'E-commerce', 'Landing Pages'],
      price: '₹12,999',
      path: '/services/website-design'
    },
    {
      num: '05',
      title: 'TECH EVENTS COVERAGE',
      desc: 'Professional photo and video coverage for launches, conferences, campus and technology events.',
      services: ['Videography', 'Photography', 'Event Editing', 'Highlight Videos', 'Reels'],
      price: '₹8,000',
      path: '/services/tech-events-coverage'
    },
    {
      num: '06',
      title: 'DIGITAL MARKETING',
      desc: 'Strategic digital marketing designed to grow your visibility, reach and audience.',
      services: ['Social Media Management', 'Content Strategy', 'Content Creation', 'Campaign Planning', 'Community Management', 'Monthly Reports'],
      price: '₹5,000',
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
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center space-y-16">
        
        {/* SECTION HEADER */}
        <div className="space-y-4 max-w-3xl">
          <ScrollReveal yOffset={10} duration={0.6} delay={0}>
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              SERVICES
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.12} yOffset={25} duration={0.6}>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
              WHAT WE DO.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.24} yOffset={15} duration={0.6} className="pt-2">
            <p className="text-xs sm:text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-semibold max-w-2xl mx-auto">
              From ideation to execution, we bring together media, content, design and digital services built for what's next.
            </p>
          </ScrollReveal>
        </div>

        {/* SERVICE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full text-left items-stretch">
          {categories.map((cat, idx) => (
            <ScrollReveal key={idx} delay={0.3 + 0.08 * idx} yOffset={20} duration={0.6} className="flex flex-col h-full w-full">
              <a
                href={cat.path}
                onClick={(e) => handleSpaClick(e, cat.path)}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-brand-white border border-[#E6E6E6] p-8 rounded-xl flex flex-col justify-between transition-all duration-300 w-full h-full transform ${
                  hoveredCard === idx 
                    ? '-translate-y-1.5 border-[#C8041C]/35 bg-[#FAF9F9] shadow-[0_12px_40px_rgba(0,0,0,0.03)]' 
                    : ''
                }`}
                style={{ minHeight: '440px' }}
              >
                <div className="space-y-6">
                  {/* Top Line: Number */}
                  <span className="text-3xl font-mono font-black text-[#C8041C] leading-none select-none block">
                    {cat.num}
                  </span>

                  {/* Title & Short Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-black tracking-wider uppercase text-brand-charcoal leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-brand-charcoal/60 leading-relaxed font-semibold">
                      {cat.desc}
                    </p>
                  </div>

                  {/* What's Included */}
                  <div className="space-y-3 pt-4 border-t border-[#E6E6E6]">
                    <span className="text-[10px] font-mono font-black text-[#212121]/50 uppercase tracking-widest block">
                      WHAT'S INCLUDED
                    </span>
                    <ul className="grid grid-cols-1 gap-2">
                      {cat.services.map((service, sIdx) => (
                        <li key={sIdx} className="text-xs font-semibold text-brand-charcoal/70 flex items-start gap-2.5">
                          <span className="w-1.5 h-[1.5px] bg-[#C8041C] mt-2 shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom line: Price and Button */}
                <div className="pt-8 flex justify-between items-end border-t border-[#E6E6E6] mt-6">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-[#212121]/50 uppercase tracking-widest font-black block">
                      STARTING FROM
                    </span>
                    <span className="text-2xl font-black text-brand-charcoal leading-none">
                      {cat.price}
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-widest transition-colors duration-300 ${
                    hoveredCard === idx ? 'text-[#C8041C]' : 'text-[#212121]'
                  }`}>
                    <span>KNOW MORE</span>
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
