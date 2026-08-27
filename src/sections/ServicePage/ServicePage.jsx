import { useEffect, useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { servicesData } from '../../data/servicesData';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Helper function to dynamically highlight brand keywords in red
const highlightText = (text) => {
  if (!text) return "";
  const keywords = [
    "PROFESSIONAL", "SHORT-FORM", "BRANDS", "PRODUCTS",
    "STRATEGY", "CONTENT", "PRESENCE", "GROWTH", "ENGAGEMENT",
    "DESIGN", "CREATIVE", "IDENTITY", "ASSETS", "BRAND",
    "WEBSITES", "CONVERT", "CUSTOM", "DEVELOPMENT",
    "TECH EVENT", "EXPERIENCE", "BROADCAST", "STREAMING", "LAUNCHES", "CONFERENCES",
    "DIGITAL MARKETING", "ROI", "TRAFFIC", "CAMPAIGNS", "AUDIENCE", "VISIBILITY", "REACH",
    "RECOGNIZABLE", "CONSISTENT"
  ];
  
  let highlighted = text;
  // Sort keywords by length descending to prevent shorter matches inside longer keywords
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  sortedKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
    highlighted = highlighted.replace(regex, `<span class="text-[#C8041C] font-black">$1</span>`);
  });
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
};

// Helper function to highlight key numbers and actions in plan features
const highlightFeature = (feat) => {
  if (!feat) return "";
  const regex = /(\b\d+\b|captions|sound effects|best|premium|advanced|custom logo|branding kit|analytics|seo|coverage|full event)/gi;
  const highlighted = feat.replace(regex, `<span class="text-[#C8041C] font-bold">$1</span>`);
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
};

export default function ServicePage({ serviceKey }) {
  const serviceKeyClean = (serviceKey === 'tech-event-coverage' || serviceKey === 'tech-events-coverage' || serviceKey === 'event-coverage') 
    ? 'tech-events-coverage' 
    : serviceKey;
  const data = servicesData[serviceKeyClean] || servicesData['video-editing'];
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${data.name} | Behind the Build`;
  }, [data]);

  const handleSpaNav = (e, path) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCtaClick = (e, planName = 'CUSTOM') => {
    e.preventDefault();
    const servicePath = serviceKeyClean === 'tech-events-coverage' ? 'tech-event-coverage' : serviceKeyClean;
    const planSlug = planName.toLowerCase();
    
    window.history.pushState(null, '', `/booking?service=${servicePath}&plan=${planSlug}`);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="bg-brand-white text-[#212121] pt-32 pb-24 min-h-screen font-sans text-left select-none">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full space-y-16">
        
        {/* HERO SECTION */}
        <section className="space-y-4 pt-4">
          <ScrollReveal delay={0} yOffset={10}>
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              SERVICE {data.num}
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} yOffset={15}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#212121] leading-[1.05]">
              {data.name}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} yOffset={15} className="max-w-2xl pt-2">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#212121]/90 leading-relaxed">
              "{highlightText(data.intro)}"
            </h2>
          </ScrollReveal>
        </section>

        <hr className="border-[#E5E5E5] w-full" />

        {/* SERVICES INCLUDED */}
        <section className="space-y-8">
          <ScrollReveal delay={0} yOffset={10}>
            <h3 className="text-[11px] font-mono font-black text-[#C8041C] uppercase tracking-widest block">
              WHAT'S INCLUDED
            </h3>
          </ScrollReveal>

          <div className="border-b border-[#E6E6E6]">
            {data.servicesList.map((service, idx) => (
              <ScrollReveal key={idx} delay={0.05 * idx} className="w-full">
                <div className="border-t border-[#E6E6E6] py-5 flex items-start justify-between group hover:bg-[#FAF9F9]/60 transition-all duration-300 px-3">
                  <div className="flex items-start gap-6">
                    <span className="text-sm font-mono font-black text-[#C8041C] pt-0.5 group-hover:scale-110 transition-transform duration-300">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#212121] group-hover:text-[#C8041C] transition-colors duration-300">
                        {service.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#212121]/60 leading-relaxed font-semibold">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#212121]/20 group-hover:text-[#C8041C] group-hover:translate-x-1.5 transition-all duration-300 pt-0.5" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <hr className="border-[#E5E5E5] w-full" />

        {/* PRICING SECTION */}
        <section className="space-y-12">
          <ScrollReveal delay={0} yOffset={10} className="text-center">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#C8041C]">
              CHOOSE YOUR PLAN
            </h3>
          </ScrollReveal>

          {/* INTRODUCTORY PRICING BANNER */}
          {data.pricing && data.pricing.introductory && (
            <ScrollReveal delay={0.05} yOffset={10} className="max-w-2xl mx-auto">
              <div className="border border-[#C8041C]/20 bg-[#FAF9F9] p-5 text-center space-y-1 rounded-none relative overflow-hidden">
                <span className="text-[10px] font-mono font-black text-[#C8041C] uppercase tracking-widest block">
                  INTRODUCTORY PRICING
                </span>
                <p className="text-[11px] sm:text-xs text-[#212121]/70 leading-relaxed font-semibold">
                  Special pricing available for our first 4 clients. Pricing will increase as we expand.
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Standard Pricing Cards */}
          {data.pricing && data.pricing.starter && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
                {/* STARTER CARD */}
                <ScrollReveal delay={0.1} className="w-full flex h-full">
                  <PricingCard plan={data.pricing.starter} onCta={handleCtaClick} isGrowth={false} cardNum="01" />
                </ScrollReveal>

                {/* GROWTH CARD */}
                <ScrollReveal delay={0.18} className="w-full flex h-full">
                  <PricingCard plan={data.pricing.growth} onCta={handleCtaClick} isGrowth={true} cardNum="02" />
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
          <section className="space-y-8 max-w-2xl mx-auto">
            <ScrollReveal delay={0} yOffset={10} className="space-y-1 text-center">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#C8041C]">
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
        <section className="py-12 border-t border-[#E5E5E5] w-full text-center space-y-5">
          <ScrollReveal delay={0} yOffset={10}>
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#212121] leading-none">
              READY TO BUILD?
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1} yOffset={10}>
            <p className="text-xs sm:text-sm text-[#212121]/60 max-w-sm mx-auto leading-relaxed">
              Configure your customized brand-building plan and see pricing instantly.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} yOffset={10} className="pt-2">
            <button
              onClick={handleCtaClick}
              className="bg-[#212121] text-brand-white hover:bg-[#C8041C] px-10 py-5 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-95 mx-auto rounded-full hover:shadow-[0_8px_20px_rgba(200,4,28,0.25)]"
            >
              <span>CONFIGURE PLAN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </ScrollReveal>
        </section>

        {/* BACK TO HOME LINK */}
        <div className="pt-4 text-left">
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
function PricingCard({ plan, onCta, isGrowth, cardNum }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-brand-white border-2 p-8 flex flex-col justify-between min-h-[480px] w-full transition-all duration-300 rounded-xl transform ${
        isGrowth 
          ? 'border-[#C8041C] shadow-[0_12px_40px_rgba(200,4,28,0.04)]' 
          : 'border-[#212121]/15 hover:border-[#212121]/30'
      } ${isHovered ? '-translate-y-1.5 shadow-[0_16px_40px_rgba(200,4,28,0.06)] border-[#C8041C]/80' : ''}`}
    >
      <div className="space-y-8 text-left">
        {/* Header Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-black tracking-widest text-[#212121]/45 uppercase block">
                {plan.planName}
              </span>
              {isGrowth && (
                <span className="inline-block text-[8px] font-mono font-bold bg-[#C8041C] text-brand-white px-2 py-0.5 tracking-wider uppercase">
                  RECOMMENDED
                </span>
              )}
            </div>
            
            {/* Red Package Numbering */}
            <span className="text-2xl font-mono font-black text-[#C8041C]/30 group-hover:text-[#C8041C] leading-none">
              {cardNum}
            </span>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-3xl sm:text-4xl font-black text-[#C8041C] tracking-tight leading-none">
              {plan.price}
            </h4>
            <span className="text-[9px] font-mono text-[#212121]/50 uppercase tracking-widest font-black block pt-1">
              {plan.billing ? `/ ${plan.billing}` : 'Single Project'}
            </span>
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-3.5 border-t border-[#E6E6E6] pt-6">
          {plan.features.map((feat, idx) => (
            <li key={idx} className="text-xs sm:text-sm font-semibold text-[#212121]/80 flex items-start gap-3">
              <span className="w-1.5 h-[1.5px] bg-[#C8041C] mt-2 shrink-0" />
              <span>{highlightFeature(feat)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button CTA */}
      <div className="pt-8 text-left">
        <button
          onClick={(e) => onCta(e, plan.planName)}
          className={`w-full py-4 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border-2 rounded-full ${
            isGrowth || isHovered
              ? 'bg-[#C8041C] border-[#C8041C] text-brand-white hover:scale-[1.02] shadow-[0_4px_12px_rgba(200,4,28,0.2)]'
              : 'border-[#212121] bg-brand-white text-[#212121] hover:bg-[#212121] hover:text-brand-white'
          }`}
        >
          <span>SELECT PLAN</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
