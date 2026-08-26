import { useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

export default function MediaDigital() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      num: '01',
      title: 'MEDIA',
      items: [
        'Video Production',
        'Video Editing',
        'Photography',
        'Event Coverage',
        'Motion Graphics'
      ]
    },
    {
      num: '02',
      title: 'CONTENT',
      items: [
        'Social Media',
        'Content Strategy',
        'Reels & Short-form',
        'Personal Branding',
        'Creative Campaigns'
      ]
    },
    {
      num: '03',
      title: 'DIGITAL',
      items: [
        'Websites',
        'Landing Pages',
        'E-commerce',
        'Digital Experiences',
        'Digital Marketing'
      ]
    },
    {
      num: '04',
      title: 'DESIGN',
      items: [
        'Graphic Design',
        'Logo Design',
        'Brand Identity',
        'Carousel Design',
        'Presentation Design'
      ]
    }
  ];

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
          
          <ScrollReveal yOffset={20} duration={0.7} delay={0.25}>
            <p className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-normal max-w-2xl">
              We combine media, content, digital experiences and design to help brands build attention, presence and momentum.
            </p>
          </ScrollReveal>
        </div>

        {/* Services 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
          {services.map((service, idx) => (
            <ScrollReveal key={idx} delay={0.1 * idx}>
              <div
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-brand-white border border-[#E6E6E6] p-8 rounded-none flex flex-col justify-between min-h-[380px] cursor-default transition-all duration-500 overflow-hidden transform ${
                  hoveredCard !== null && hoveredCard !== idx ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
                } ${hoveredCard === idx ? '-translate-y-2 border-[#C8041C]/25 shadow-[0_12px_40px_rgba(0,0,0,0.03)]' : ''}`}
              >
                {/* Subtle red top bar revealed on hover */}
                <div 
                  className={`absolute top-0 left-0 w-full h-[3px] bg-[#C8041C] transition-transform duration-500 origin-left ${
                    hoveredCard === idx ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />

                <div className="space-y-8">
                  {/* Top Bar with Number & Title */}
                  <div className="flex justify-between items-baseline border-b border-brand-charcoal/5 pb-4">
                    <h3 className={`text-lg font-black tracking-wider uppercase transition-colors duration-300 ${
                      hoveredCard === idx ? 'text-[#C8041C]' : 'text-brand-charcoal'
                    }`}>
                      {service.title}
                    </h3>
                    <span className="text-xl font-mono font-black text-brand-charcoal/20 select-none">
                      {service.num}
                    </span>
                  </div>

                  {/* Service Items List */}
                  <ul className="space-y-4">
                    {service.items.map((item, itemIdx) => (
                      <li 
                        key={itemIdx}
                        className="text-xs sm:text-sm font-semibold text-brand-charcoal/70 hover:text-brand-charcoal transition-colors duration-200 flex items-start gap-3.5"
                      >
                        <span className="w-1.5 h-[1.5px] bg-[#C8041C] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
