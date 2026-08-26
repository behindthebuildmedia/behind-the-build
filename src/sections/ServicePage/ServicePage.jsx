import { useEffect, useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { servicesData } from '../../data/servicesData';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function ServicePage({ serviceKey }) {
  const data = servicesData[serviceKey] || servicesData['video-editing'];
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
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full space-y-20">
        
        {/* HERO SECTION */}
        <section className="space-y-6 pt-8 select-none">
          <ScrollReveal delay={0} yOffset={15}>
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              SERVICE {data.num}
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} yOffset={35}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#212121] leading-none">
              {data.name}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} yOffset={25} className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#212121]/90 leading-tight">
              "{data.intro}"
            </h2>
          </ScrollReveal>
        </section>

        <hr className="border-[#E5E5E5] w-full" />

        {/* SERVICES INCLUDED */}
        <section className="space-y-10">
          <ScrollReveal delay={0} yOffset={15} className="space-y-1">
            <h3 className="text-xs font-mono font-black text-[#C8041C] uppercase tracking-widest block">
              WHAT'S INCLUDED
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {data.servicesList.map((service, idx) => (
              <ScrollReveal key={idx} delay={0.08 * idx} className="border-l-2 border-[#C8041C] pl-5 py-0.5 space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-[#212121] uppercase tracking-wider">
                  {service.name}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#212121]/60 leading-relaxed font-semibold">
                  {service.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <hr className="border-[#E5E5E5] w-full" />

        {/* PRICING SECTION */}
        <section className="space-y-12">
          <ScrollReveal delay={0} yOffset={15} className="space-y-2 text-center">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#212121]">
              CHOOSE YOUR PLAN
            </h3>
          </ScrollReveal>

          {/* INTRODUCTORY PRICING BANNER */}
          {data.pricing && data.pricing.introductory && (
            <ScrollReveal delay={0.05} yOffset={15} className="max-w-2xl mx-auto">
              <div className="border border-[#C8041C]/20 bg-[#FAF9F9] p-5 text-center space-y-1 rounded-none relative overflow-hidden">
                <span className="text-[10px] font-mono font-black text-[#C8041C] uppercase tracking-widest block">
                  FIRST FEW CLIENTS / INTRODUCTORY RATES
                </span>
                <p className="text-[11px] sm:text-xs text-[#212121]/70 leading-relaxed font-semibold">
                  Partner with us early. Our current packages are offered at introductory rates for our first few clients. Rates will be revised after the initial partnerships.
                </p>
              </div>
            </ScrollReveal>
          )}

          {data.pricing && data.pricing.custom ? (
            /* Custom Contact Plan */
            <ScrollReveal delay={0.1} className="max-w-md mx-auto">
              <div className="bg-brand-white border border-[#E6E6E6] p-8 text-center space-y-6 rounded-none">
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-[#212121] uppercase tracking-wide">
                    CUSTOM PARTNERSHIP
                  </h4>
                  <p className="text-xs text-[#212121]/60 leading-relaxed font-semibold">
                    Let's structure a custom performance-focused campaign matching your specific budget, goals, and release frequency.
                  </p>
                </div>
                <button
                  onClick={handleCtaClick}
                  className="w-full py-4 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border-2 border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-brand-white"
                >
                  <span>{data.pricing.customText.replace(' →', '')}</span>
                  <span>→</span>
                </button>
              </div>
            </ScrollReveal>
          ) : (
            /* Standard Pricing Cards */
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
                {/* STARTER CARD */}
                <ScrollReveal delay={0.1} className="w-full flex h-full">
                  <PricingCard plan={data.pricing.starter} onCta={handleCtaClick} isGrowth={false} />
                </ScrollReveal>

                {/* GROWTH CARD */}
                <ScrollReveal delay={0.18} className="w-full flex h-full">
                  <PricingCard plan={data.pricing.growth} onCta={handleCtaClick} isGrowth={true} />
                </ScrollReveal>
              </div>

              {/* Optional Custom note */}
              {data.pricing && data.pricing.note && (
                <ScrollReveal delay={0.25} yOffset={10} className="text-center">
                  <p className="text-[10px] sm:text-xs font-mono text-[#212121]/50 uppercase tracking-wider">
                    * {data.pricing.note}
                  </p>
                </ScrollReveal>
              )}
            </div>
          )}
        </section>

        {/* FAQ SECTION */}
        {data.faq && data.faq.length > 0 && (
          <section className="space-y-10 max-w-2xl mx-auto">
            <ScrollReveal delay={0} yOffset={15} className="space-y-1 text-center">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#212121]">
                QUESTIONS
              </h3>
            </ScrollReveal>

            <div className="space-y-4">
              {data.faq.map((item, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.05} className="border border-[#E6E6E6] rounded-none overflow-hidden bg-brand-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-[#FAF9F9] transition-colors focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-[#212121]">
                      {item.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#212121]/60 transition-transform duration-300 ${
                      openFaq === idx ? 'transform rotate-180' : ''
                    }`} />
                  </button>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${
                    openFaq === idx ? 'max-h-40 border-t border-[#E6E6E6]' : 'max-h-0'
                  }`}>
                    <p className="p-6 text-xs sm:text-sm text-[#212121]/70 leading-relaxed font-semibold">
                      {item.answer}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* SERVICE CTA */}
        <section className="py-16 md:py-20 border-t border-[#E5E5E5] w-full text-center space-y-6 select-none">
          <ScrollReveal delay={0} yOffset={15}>
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#212121] leading-none">
              READY TO BUILD?
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1} yOffset={15}>
            <p className="text-xs sm:text-sm text-[#212121]/60 max-w-sm mx-auto leading-relaxed">
              Configure your customized brand-building plan and see pricing instantly.
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
function PricingCard({ plan, onCta, isGrowth }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-brand-white border p-8 flex flex-col justify-between min-h-[480px] w-full transition-all duration-300 rounded-none transform ${
        isGrowth 
          ? 'border-[#C8041C] shadow-[0_12px_40px_rgba(200,4,28,0.02)]' 
          : 'border-[#E6E6E6]'
      } ${isHovered ? '-translate-y-1 shadow-[0_16px_40px_rgba(0,0,0,0.03)] border-[#C8041C]/25' : ''}`}
    >
      {/* Subtle top indicator bar */}
      <div 
        className={`absolute top-0 left-0 w-full h-[3px] bg-[#C8041C] transition-transform duration-300 origin-left ${
          isHovered || isGrowth ? 'scale-x-100' : 'scale-x-0'
        }`}
      />

      <div className="space-y-8 text-left">
        {/* Header Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-mono font-black tracking-widest text-[#212121]/45 uppercase">
              {plan.planName}
            </span>
            {isGrowth && (
              <span className="text-[8px] font-mono font-bold bg-[#C8041C] text-brand-white px-2 py-0.5 tracking-wider uppercase">
                MOST POPULAR
              </span>
            )}
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-black text-[#212121] tracking-tight leading-none">
              {plan.price}
            </h4>
            <span className="text-[9px] font-mono text-[#212121]/50 uppercase tracking-widest font-black block">
              {plan.billing}
            </span>
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-3 border-t border-brand-charcoal/5 pt-6">
          {plan.features.map((feat, idx) => (
            <li key={idx} className="text-xs sm:text-sm font-semibold text-[#212121]/80 flex items-start gap-3">
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
            isGrowth
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
