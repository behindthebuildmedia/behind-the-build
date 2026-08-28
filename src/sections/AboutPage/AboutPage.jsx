import { useEffect, useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About | Behind the Build";
  }, []);

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

  const handleScrollToWhy = (e) => {
    e.preventDefault();
    const element = document.querySelector('#why-started');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-white text-[#212121] pt-32 pb-16 min-h-screen font-sans text-left">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full space-y-12 md:space-y-14">
        
        {/* 1. ABOUT PAGE HERO */}
        <section className="space-y-4 pt-2 md:pt-4 select-none relative">
          <ScrollReveal delay={0} yOffset={10}>
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              ABOUT BEHIND THE BUILD
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} yOffset={35}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-[#212121] leading-[0.95] max-w-4xl">
              WE'RE BUILDING<br />WHAT'S NEXT.
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} yOffset={25} className="max-w-2xl pt-4">
            <p className="text-sm sm:text-base md:text-lg text-[#212121]/60 leading-relaxed font-normal">
              Behind The Build helps ambitious brands turn what they build into stories, experiences and digital presence people remember.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3} yOffset={15} className="pt-6">
            <button
              onClick={handleScrollToWhy}
              className="bg-[#212121] text-brand-white hover:bg-[#C8041C] px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span>LET'S BUILD TOGETHER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </ScrollReveal>

          {/* Minimal background branding lines */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-[1px] bg-brand-charcoal/10 hidden md:block" />
        </section>

        <hr className="border-[#E5E5E5] w-full" />

        {/* 2. WHY WE STARTED */}
        <section id="why-started" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal delay={0} yOffset={15}>
              <span className="text-xs font-mono font-black text-[#C8041C] uppercase tracking-widest block">
                WHY WE STARTED
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1} yOffset={25}>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#212121] leading-none">
                GOOD PRODUCTS DESERVE TO BE SEEN.
              </h2>
            </ScrollReveal>
            <div className="w-12 h-[2px] bg-[#C8041C] mt-4" />
          </div>

          <ScrollReveal delay={0.2} yOffset={20} className="lg:col-span-7 space-y-6 text-[#212121]/70 font-normal leading-relaxed text-sm sm:text-base">
            <p className="font-bold text-[#212121]">
              Behind The Build was created around a simple observation:
            </p>
            <p>
              Businesses and startups spend months building products, services and ideas — but often struggle to communicate what they have built.
            </p>
            <div className="border-l border-brand-charcoal/10 pl-6 space-y-2 py-1 font-mono text-xs uppercase tracking-wider text-[#212121]/50">
              <p>Their story gets lost.</p>
              <p>Their content becomes inconsistent.</p>
              <p>Their digital presence doesn't reflect the quality of their work.</p>
            </div>
            <p className="font-bold text-[#212121]">
              Behind The Build exists to close that gap.
            </p>
            <p>
              We help brands turn what they build into something people can see, understand and remember.
            </p>
          </ScrollReveal>
        </section>

        {/* 3. OUR VISION */}
        <section className="bg-[#FAF9F9] border border-[#E6E6E6] p-8 sm:p-12 lg:p-14 space-y-6 select-none relative overflow-hidden">
          <ScrollReveal delay={0} yOffset={15}>
            <span className="text-xs font-mono font-black text-[#C8041C] uppercase tracking-widest block">
              OUR VISION
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={25} className="max-w-4xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#212121] leading-[1.05]">
              TO BECOME THE CREATIVE AND DIGITAL PARTNER BEHIND THE NEXT GENERATION OF AMBITIOUS BRANDS.
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={15} className="max-w-2xl text-xs sm:text-sm md:text-base text-[#212121]/60 leading-relaxed">
            <p>
              We envision a future where high-potential ideas aren't constrained by marketing complexity. By bridging high-end media production, modern user experiences, and automated digital structures, we partner with brands to craft clear, impactful, and lasting market presence.
            </p>
          </ScrollReveal>

          {/* Red decorative block */}
          <div className="absolute right-0 bottom-0 w-[4px] h-full bg-[#C8041C]" />
        </section>

        {/* 4. OUR MISSION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal delay={0} yOffset={15}>
              <span className="text-xs font-mono font-black text-[#C8041C] uppercase tracking-widest block">
                OUR MISSION
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1} yOffset={25}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none">
                BUILD.<br />CREATE.<br />GROW.
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} yOffset={15} className="lg:col-span-7">
            <p className="text-base sm:text-lg md:text-xl font-medium text-[#212121]/80 leading-relaxed">
              "To help brands move from idea to impact by combining media, content, design and digital experiences — while continuously evolving with new technologies."
            </p>
          </ScrollReveal>
        </section>

        <hr className="border-[#E5E5E5] w-full" />

        {/* 5. WHAT WE BELIEVE */}
        <section className="space-y-12">
          <ScrollReveal delay={0} yOffset={15} className="space-y-2">
            <span className="text-xs font-mono font-black text-[#C8041C] uppercase tracking-widest block">
              OUR BELIEFS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#212121]">
              WHAT WE BELIEVE
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'BUILD WITH PURPOSE.',
                desc: 'Great work starts with understanding why it exists.'
              },
              {
                num: '02',
                title: 'MAKE IT MATTER.',
                desc: 'Attention means nothing without impact.'
              },
              {
                num: '03',
                title: 'KEEP EVOLVING.',
                desc: 'The way brands grow constantly changes. We change with it.'
              },
              {
                num: '04',
                title: 'CREATE TOGETHER.',
                desc: 'The best work happens when we build with our clients, not just for them.'
              }
            ].map((belief, idx) => (
              <ScrollReveal key={idx} delay={0.08 * idx}>
                <BeliefCard belief={belief} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 6. WHAT WE'RE BUILDING */}
        <section className="space-y-8">
          <div className="space-y-3">
            <ScrollReveal delay={0} yOffset={15}>
              <span className="text-xs font-mono font-black text-[#C8041C] uppercase tracking-widest block">
                WHAT WE'RE BUILDING
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1} yOffset={25}>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#212121] leading-none">
                FROM MEDIA TO WHAT'S NEXT.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2} yOffset={15}>
              <p className="text-sm sm:text-base text-[#212121]/60 leading-relaxed font-normal max-w-2xl">
                Behind The Build started with media. It grew into content, design and digital. And we're building toward something bigger.
              </p>
            </ScrollReveal>
          </div>

          {/* Visual progression timeline */}
          <div className="w-full pt-4">
            {/* Desktop Horizontal progression */}
            <div className="hidden md:grid grid-cols-5 gap-4 relative">
              {[
                { title: 'MEDIA', desc: 'Video, photo & sound assets.' },
                { title: 'CONTENT', desc: 'Distribution & viral hooks.' },
                { title: 'DIGITAL', desc: 'React portals & configurators.' },
                { title: 'DESIGN', desc: 'Minimal visual systems.' },
                { title: "WHAT'S NEXT", desc: 'New platforms & systems.', highlighted: true }
              ].map((step, idx) => (
                <ScrollReveal key={idx} delay={0.1 * idx} className="relative flex flex-col items-center text-center p-6 border border-[#E6E6E6] bg-brand-white min-h-[140px] justify-between">
                  <div className="absolute top-0 left-0 w-full h-[2.5px] bg-[#C8041C]/10" />
                  {step.highlighted && <div className="absolute top-0 left-0 w-full h-[2.5px] bg-[#C8041C]" />}
                  <span className="text-xs font-mono font-black text-brand-charcoal/20 select-none">
                    0{idx + 1}
                  </span>
                  <h4 className={`text-sm font-black uppercase tracking-wider ${step.highlighted ? 'text-[#C8041C]' : 'text-brand-charcoal'}`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-brand-charcoal/50 leading-tight">
                    {step.desc}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            {/* Mobile Vertical progression */}
            <div className="flex md:hidden flex-col gap-4">
              {[
                { title: 'MEDIA', desc: 'Video, photo & sound assets.' },
                { title: 'CONTENT', desc: 'Distribution & viral hooks.' },
                { title: 'DIGITAL', desc: 'React portals & configurators.' },
                { title: 'DESIGN', desc: 'Minimal visual systems.' },
                { title: "WHAT'S NEXT", desc: 'New platforms & systems.', highlighted: true }
              ].map((step, idx) => (
                <ScrollReveal key={idx} delay={0.05 * idx} className="relative flex flex-row items-center justify-between p-5 border border-[#E6E6E6] bg-brand-white text-left pl-8">
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-[#C8041C]/15" />
                  {step.highlighted && <div className="absolute left-0 top-0 h-full w-[3px] bg-[#C8041C]" />}
                  <div className="space-y-1">
                    <h4 className={`text-xs font-black uppercase tracking-wider ${step.highlighted ? 'text-[#C8041C]' : 'text-brand-charcoal'}`}>
                      {step.title}
                    </h4>
                    <p className="text-[10px] text-brand-charcoal/50">
                      {step.desc}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-black text-brand-charcoal/20 select-none pr-2">
                    0{idx + 1}
                  </span>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 7. OUR APPROACH: BUILT TO EVOLVE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          <div className="lg:col-span-4">
            <ScrollReveal delay={0} yOffset={10}>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#212121]">
                BUILT TO EVOLVE.
              </h3>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8">
            <ScrollReveal delay={0.1} yOffset={15}>
              <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed">
                Behind The Build continuously adapts to new platforms, technologies and ways of building brands. We ensure your assets stay compatible with modern digital ecosystems, shifting audience behaviors, and emerging technical interfaces.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="py-12 md:py-16 border-t border-[#E5E5E5] w-full text-center space-y-6 select-none">
          <ScrollReveal delay={0} yOffset={15}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none">
               HAVE SOMETHING<br />WORTH BUILDING?
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1} yOffset={15}>
            <p className="text-sm sm:text-base text-[#212121]/60 max-w-md mx-auto leading-relaxed">
              Let's turn your next idea into something people remember.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} yOffset={15} className="pt-4">
            <button
              onClick={handleCtaClick}
              className="bg-[#C8041C] text-brand-white hover:bg-[#C8041C]/90 px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-95 mx-auto"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </ScrollReveal>
        </section>

        {/* BACK TO HOME LINK */}
        <div className="pt-6 text-left select-none">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', '/');
              window.dispatchEvent(new Event('popstate'));
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="inline-flex items-center gap-2.5 text-xs font-mono font-black uppercase tracking-widest text-[#212121] hover:text-[#C8041C] transition-colors duration-300"
          >
            <span>← BACK TO HOME</span>
          </a>
        </div>

      </div>
    </div>
  );
}

// Belief Card Subcomponent
function BeliefCard({ belief }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative p-8 border border-[#E6E6E6] bg-brand-white text-left transition-all duration-500 rounded-none transform min-h-[160px] flex flex-col justify-between overflow-hidden ${
        hovered ? '-translate-y-1.5 border-[#C8041C]/25 shadow-[0_12px_40px_rgba(0,0,0,0.03)]' : ''
      }`}
    >
      <div 
        className={`absolute top-0 left-0 w-full h-[2.5px] bg-[#C8041C] transition-transform duration-500 origin-left ${
          hovered ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
      <div className="space-y-4">
        <div className="flex justify-between items-baseline border-b border-brand-charcoal/5 pb-2">
          <h4 className={`text-base font-black tracking-wider uppercase transition-colors duration-300 ${
            hovered ? 'text-[#C8041C]' : 'text-brand-charcoal'
          }`}>
            {belief.title}
          </h4>
          <span className="text-base font-mono font-black text-brand-charcoal/15 select-none">
            {belief.num}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-brand-charcoal/60 font-semibold leading-relaxed">
          {belief.desc}
        </p>
      </div>
    </div>
  );
}
