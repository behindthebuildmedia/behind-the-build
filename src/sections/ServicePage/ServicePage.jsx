import { useEffect, useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { servicesData } from '../../data/servicesData';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function ServicePage({ serviceKey }) {
  const data = servicesData[serviceKey] || servicesData.media;
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${data.name} Services | Behind the Build`;
  }, [data]);

  const handleSpaNav = (e, path) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new Event('popstate'));
    
    setTimeout(() => {
      const element = document.querySelector('#build-plan');
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="bg-brand-white text-[#212121] pt-28 pb-16 min-h-screen font-sans text-left">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full space-y-24">
        
        {/* HERO SECTION */}
        <section className="space-y-6 pt-8 select-none">
          <ScrollReveal delay={0} yOffset={10}>
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              {data.label}
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} yOffset={35}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#212121] leading-none">
              {data.name}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} yOffset={25} className="max-w-4xl pt-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#212121]/90 leading-tight">
              "{data.headline}"
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} yOffset={15} className="max-w-2xl pt-2">
            <p className="text-sm sm:text-base md:text-lg text-[#212121]/60 leading-relaxed font-normal">
              {data.description}
            </p>
          </ScrollReveal>
        </section>

        <hr className="border-[#E5E5E5] w-full" />

        {/* SERVICES INCLUDED */}
        <section className="space-y-12">
          <ScrollReveal delay={0} yOffset={15} className="space-y-2">
            <span className="text-xs font-mono font-black text-[#C8041C] uppercase tracking-widest block">
              01 / CAPABILITIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#212121]">
              SERVICES INCLUDED
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.servicesList.map((service, idx) => (
              <ScrollReveal key={idx} delay={0.08 * idx} className="border-l border-[#C8041C] pl-6 py-2 space-y-2">
                <h4 className="text-base sm:text-lg font-bold text-[#212121] uppercase tracking-wider">
                  {service.name}
                </h4>
                <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed">
                  {service.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="space-y-16">
          <ScrollReveal delay={0} yOffset={15} className="space-y-2 text-center">
            <span className="text-xs font-mono font-black text-[#C8041C] uppercase tracking-widest block">
              02 / FLEXIBLE COMMITS
            </span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#212121]">
              CHOOSE YOUR PLAN
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* STARTER CARD */}
            <ScrollReveal delay={0.05} className="w-full">
              <PricingCard plan={data.pricing.starter} onCta={handleCtaClick} />
            </ScrollReveal>

            {/* GROWTH CARD */}
            <ScrollReveal delay={0.15} className="w-full">
              <PricingCard plan={data.pricing.growth} onCta={handleCtaClick} />
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ SECTION */}
        {data.faq && data.faq.length > 0 && (
          <section className="space-y-12 max-w-3xl mx-auto">
            <ScrollReveal delay={0} yOffset={15} className="space-y-2 text-center">
              <span className="text-xs font-mono font-black text-[#C8041C] uppercase tracking-widest block">
                03 / CLARITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#212121]">
                FREQUENTLY ASKED QUESTIONS
              </h3>
            </ScrollReveal>

            <div className="space-y-4">
              {data.faq.map((item, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.05} className="border border-[#E6E6E6] rounded-none overflow-hidden bg-brand-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-[#FAF9F9] transition-colors focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold uppercase tracking-wide text-[#212121]">
                      {item.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#212121]/60 transition-transform duration-300 ${
                      openFaq === idx ? 'transform rotate-180' : ''
                    }`} />
                  </button>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${
                    openFaq === idx ? 'max-h-40 border-t border-[#E6E6E6]' : 'max-h-0'
                  }`}>
                    <p className="p-6 text-xs sm:text-sm text-[#212121]/70 leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* SERVICE CTA */}
        <section className="py-16 md:py-20 border-t border-[#E5E5E5] w-full text-center space-y-8 select-none">
          <ScrollReveal delay={0} yOffset={15}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none">
              READY TO BUILD?
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1} yOffset={15}>
            <p className="text-sm sm:text-base text-[#212121]/60 max-w-md mx-auto leading-relaxed">
              Configure your customized content plan and see pricing instantly using our builder.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} yOffset={15} className="pt-4">
            <button
              onClick={handleCtaClick}
              className="bg-[#C8041C] text-brand-white hover:bg-[#C8041C]/90 px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-95 mx-auto"
            >
              <span>CONFIGURE PLAN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </ScrollReveal>
        </section>

        {/* BACK TO HOME LINK */}
        <div className="pt-6 text-left select-none">
          <a
            href="/"
            onClick={(e) => handleSpaNav(e, '/')}
            className="inline-flex items-center gap-2.5 text-xs font-mono font-black uppercase tracking-widest text-[#212121] hover:text-[#C8041C] transition-colors duration-300"
          >
            <span>← BACK TO HOME</span>
          </a>
        </div>

      </div>
    </div>
  );
}

// Pricing Card Subcomponent
function PricingCard({ plan, onCta }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-brand-white border p-8 flex flex-col justify-between min-h-[480px] transition-all duration-500 rounded-none transform ${
        plan.highlighted 
          ? 'border-[#C8041C] shadow-[0_12px_40px_rgba(200,4,28,0.03)]' 
          : 'border-[#E6E6E6]'
      } ${isHovered ? '-translate-y-2 shadow-[0_16px_40px_rgba(0,0,0,0.03)]' : ''}`}
    >
      {/* Subtle top indicator bar */}
      <div 
        className={`absolute top-0 left-0 w-full h-[3px] bg-[#C8041C] transition-transform duration-500 origin-left ${
          isHovered || plan.highlighted ? 'scale-x-100' : 'scale-x-0'
        }`}
      />

      <div className="space-y-8 text-left">
        {/* Header Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-mono font-black tracking-widest text-[#212121]/45 uppercase">
              {plan.planName}
            </span>
            {plan.highlighted && (
              <span className="text-[8px] font-mono font-bold bg-[#C8041C] text-brand-white px-2 py-0.5 tracking-wider uppercase">
                RECOMMENDED
              </span>
            )}
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl sm:text-4xl font-black text-[#212121] tracking-tight leading-none">
              {plan.price}
            </h4>
            <span className="text-[10px] font-mono text-[#212121]/50 uppercase tracking-widest font-black block">
              {plan.billing}
            </span>
          </div>
          <p className="text-xs text-[#212121]/60 leading-relaxed font-normal">
            {plan.description}
          </p>
        </div>

        {/* Features List */}
        <ul className="space-y-3.5 border-t border-brand-charcoal/5 pt-6">
          {plan.features.map((feat, idx) => (
            <li key={idx} className="text-xs sm:text-sm font-semibold text-brand-charcoal/80 flex items-start gap-3">
              <span className="w-1.5 h-[1.5px] bg-[#C8041C] mt-2 shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button CTA */}
      <div className="pt-8 text-left">
        <button
          onClick={onCta}
          className={`w-full py-4 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
            plan.highlighted
              ? 'bg-[#C8041C] border-[#C8041C] text-brand-white hover:bg-[#C8041C]/90'
              : 'border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-brand-white'
          }`}
        >
          <span>{plan.buttonText.replace(' →', '')}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
