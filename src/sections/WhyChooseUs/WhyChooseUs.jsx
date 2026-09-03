import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

const features = [
  {
    id: 'prod',
    title: <>PROFESSIONAL <span className="text-[#C8041C]">PRODUCTION</span></>,
    desc: 'High-quality content that stands out.'
  },
  {
    id: 'turn',
    title: <>FAST <span className="text-[#C8041C]">TURNAROUND</span></>,
    desc: 'On-time delivery without compromising quality.'
  },
  {
    id: 'brand',
    title: <>CONTENT FITS YOUR <span className="text-[#C8041C]">BRAND</span></>,
    desc: 'Content aligned with your identity and audience.'
  },
  {
    id: 'edit',
    title: <>PREMIUM <span className="text-[#C8041C]">EDITING</span></>,
    desc: 'Cinematic edits built for impact.'
  },
  {
    id: 'pack',
    title: <><span className="text-[#C8041C]">FLEXIBLE</span> PACKAGES</>,
    desc: 'Plans that grow with your requirements.'
  },
  {
    id: 'supp',
    title: <><span className="text-[#C8041C]">DEDICATED</span> SUPPORT</>,
    desc: 'A team that stays involved throughout the project.'
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-14 sm:py-20 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Headline & Supporting Statement */}
          <div className="lg:col-span-5 text-left space-y-6 lg:sticky lg:top-[20vh] self-start pt-2">
            <div className="space-y-3">
              <ScrollReveal yOffset={10} duration={0.4} delay={0}>
                <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
                  WHY CHOOSE US
                </span>
              </ScrollReveal>
              
              <ScrollReveal yOffset={15} duration={0.6} delay={0.1}>
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#212121] leading-[1.05]">
                  WHY BRANDS<br />
                  CHOOSE <span className="text-[#C8041C]">US.</span>
                </h2>
              </ScrollReveal>
            </div>
            
            <ScrollReveal yOffset={15} duration={0.6} delay={0.2} className="max-w-md pt-1">
              <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed font-semibold">
                Built for brands that want better content, sharper execution, and results that actually matter.
              </p>
            </ScrollReveal>
            
            <ScrollReveal yOffset={5} duration={0.4} delay={0.3} className="pt-2">
              <div className="w-16 h-[2px] bg-[#C8041C]" />
            </ScrollReveal>
          </div>

          {/* Right Column - Benefits Editorial Blocks */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full text-left pt-2">
            {features.map((feature, idx) => (
              <ScrollReveal
                key={feature.id}
                delay={0.1 + idx * 0.08}
                yOffset={20}
                className="w-full"
              >
                <div className="bg-white p-7 md:p-8 border border-[#E6E6E6] rounded-xl flex flex-col items-start relative group hover:border-[#212121] hover:-translate-y-1 transition-all duration-300 cursor-default shadow-[0_4px_12px_rgba(0,0,0,0.005)]">
                  
                  {/* Red Square Accent Element */}
                  <div className="w-2.5 h-2.5 bg-[#C8041C] transition-transform duration-300 group-hover:scale-125" />

                  {/* Title & Description */}
                  <h3 className="text-xs sm:text-sm font-black text-[#212121] font-sans uppercase tracking-wider mt-5">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xs text-[#212121]/60 leading-relaxed font-semibold mt-2.5">
                    {feature.desc}
                  </p>

                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
