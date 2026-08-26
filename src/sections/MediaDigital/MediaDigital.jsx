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
      desc: 'High-impact edits that keep your audience hooked.',
      services: ['Reels Editing', 'Personal Growth Edits', 'Motion Graphics', 'Product Videos'],
      path: '/services/video-editing'
    },
    {
      num: '02',
      title: 'SOCIAL MEDIA MARKETING',
      subtitle: 'CONTENT',
      desc: 'Strategic content that builds presence and drives engagement.',
      services: ['Social Media Strategy', 'Content Creation', 'Content Calendar & Scheduling', 'Community Management'],
      path: '/services/social-media-marketing'
    },
    {
      num: '03',
      title: 'DESIGN',
      subtitle: 'DESIGN',
      desc: 'Creative design systems that make brands recognizable.',
      services: ['Announcement Posts', 'Thumbnails', 'Story Designs', 'Branding & Identity'],
      path: '/services/design'
    },
    {
      num: '04',
      title: 'WEBSITE DESIGN',
      subtitle: 'DIGITAL',
      desc: 'Websites that look great and perform even better.',
      services: ['Portfolio Websites', 'E-commerce', 'Commercial Websites', 'Landing Pages'],
      path: '/services/website-design'
    },
    {
      num: '05',
      title: 'TECH EVENTS COVERAGE',
      subtitle: 'EVENTS',
      desc: 'We capture the moments, people and energy that matter.',
      services: ['Videography', 'Photography', 'Video Editing', 'Event Highlights'],
      path: '/services/tech-events-coverage'
    },
    {
      num: '06',
      title: 'DIGITAL MARKETING',
      subtitle: 'MARKETING',
      desc: 'Performance-focused strategies designed to grow your brand.',
      services: ['Paid Campaigns', 'Search Marketing', 'Meta & Google Ads', 'Analytics & Reporting'],
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center space-y-16">
        
        {/* SECTION HEADER */}
        <div className="space-y-4 max-w-3xl">
          <ScrollReveal yOffset={10} duration={0.6} delay={0}>
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              WHAT WE DO
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.12} yOffset={25} duration={0.6}>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
              BUILDING BRANDS<br /> FOR WHAT’S NEXT.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.24} yOffset={15} duration={0.6} className="pt-2">
            <p className="text-xs sm:text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-semibold max-w-2xl mx-auto">
              From powerful content and digital experiences to design and event coverage, we help brands show up, stand out and grow.
            </p>
          </ScrollReveal>
        </div>

        {/* SERVICE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 w-full text-left items-stretch">
          {categories.map((cat, idx) => (
            <ScrollReveal key={idx} delay={0.3 + 0.08 * idx} yOffset={20} duration={0.6} className="flex flex-col h-full w-full">
              <a
                href={cat.path}
                onClick={(e) => handleSpaClick(e, cat.path)}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-brand-white border border-[#E6E6E6] p-6 rounded-xl flex flex-col justify-between transition-all duration-300 w-full h-full transform ${
                  hoveredCard === idx 
                    ? '-translate-y-1.5 border-[#C8041C]/35 bg-[#FAF9F9]' 
                    : ''
                }`}
                style={{ minHeight: '350px' }}
              >
                <div className="space-y-4">
                  {/* Service Number */}
                  <span className="text-2xl font-mono font-black text-[#C8041C] leading-none select-none block">
                    {cat.num}
                  </span>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-black tracking-wider uppercase text-brand-charcoal leading-snug">
                    {cat.title}
                  </h3>

                  {/* Thin Red Accent Line */}
                  <div className="w-6 h-[1.5px] bg-[#C8041C]" />

                  {/* One-line Description */}
                  <p className="text-[11px] text-brand-charcoal/60 leading-relaxed font-semibold min-h-[44px]">
                    {cat.desc}
                  </p>

                  {/* Capabilities Items */}
                  <ul className="space-y-2 pt-2 border-t border-brand-charcoal/5">
                    {cat.services.map((service, sIdx) => (
                      <li key={sIdx} className="text-[10px] font-semibold text-brand-charcoal/70 flex items-start gap-2">
                        <span className="w-1 h-[1px] bg-[#C8041C] mt-1.5 shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Explore button at the bottom */}
                <div className="pt-6 flex items-center gap-1 text-[9px] font-mono font-black uppercase tracking-widest text-[#212121] transition-colors">
                  <span>EXPLORE</span>
                  <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${
                    hoveredCard === idx ? 'transform translate-x-1 text-[#C8041C]' : 'text-[#212121]/50'
                  }`} />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* INTRODUCTORY PRICING BANNER */}
        <ScrollReveal delay={0.8} yOffset={20} duration={0.6} className="w-full max-w-4xl pt-4">
          <div className="border border-[#E6E6E6] bg-[#FAF9F9] rounded-xl p-8 sm:p-10 text-center relative overflow-hidden select-none space-y-4">
            {/* Subtle red top bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#C8041C]" />
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-black tracking-widest text-[#C8041C] uppercase block">
                INTRODUCTORY RATES
              </span>
              <h4 className="text-base sm:text-lg font-black uppercase text-brand-charcoal tracking-wide">
                SPECIAL PRICING FOR OUR FIRST 4 CLIENTS.
              </h4>
            </div>

            <p className="text-xs text-brand-charcoal/60 leading-relaxed font-semibold max-w-xl mx-auto">
              Partner with us early. Our current packages are offered at introductory rates for our first four client partnerships.
            </p>

            <span className="text-[9px] font-mono font-bold text-[#C8041C] uppercase tracking-wider block">
              Rates will be updated after the fourth client partnership.
            </span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
