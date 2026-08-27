import { MessageSquare, Calendar, Camera, Send } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'DISCOVERY',
      desc: 'We dive deep into your brand, goals, and audience to uncover what truly matters.',
      icon: MessageSquare,
      checklist: [
        'Understand your brand',
        'Analyze your audience',
        'Define clear objectives'
      ]
    },
    {
      num: '02',
      title: 'PLANNING',
      desc: 'We create a strategic plan and creative direction tailored to your goals and timeline.',
      icon: Calendar,
      checklist: [
        'Strategy & concept development',
        'Content roadmap',
        'Timeline & resource planning'
      ]
    },
    {
      num: '03',
      title: 'PRODUCTION',
      desc: 'We bring the plan to life with high-quality content built for impact.',
      icon: Camera,
      checklist: [
        'Professional content creation',
        'Quality review & refinement',
        'On-time delivery'
      ]
    },
    {
      num: '04',
      title: 'DELIVERY',
      desc: 'We deliver the polished assets, optimized and ready to launch.',
      icon: Send,
      checklist: [
        'Final assets delivery',
        'Platform optimization',
        'Launch support'
      ]
    }
  ];

  return (
    <section id="process" className="py-20 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-left space-y-3 max-w-xl">
          <ScrollReveal yOffset={10} duration={0.4} delay={0}>
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              OUR PROCESS
            </span>
          </ScrollReveal>
          
          <ScrollReveal yOffset={15} duration={0.6} delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none">
              OUR PROCESS,<br />
              <span className="text-[#C8041C]">BUILT FOR RESULTS.</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal yOffset={15} duration={0.6} delay={0.2} className="pt-1">
            <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed font-semibold">
              A clear, collaborative process that ensures every project is executed with purpose and precision.
            </p>
          </ScrollReveal>
          
          <ScrollReveal yOffset={5} duration={0.4} delay={0.3} className="pt-2">
            <div className="w-16 h-[2px] bg-[#C8041C]" />
          </ScrollReveal>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 lg:gap-12 pt-6">
          
          {/* Vertical line behind step circular icons on mobile */}
          <div className="absolute left-[39px] top-12 bottom-12 w-[1px] bg-[#C8041C]/20 md:hidden z-0" />

          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <ScrollReveal 
                key={idx} 
                delay={idx * 0.12} 
                yOffset={20}
                className="w-full flex flex-col items-start relative text-left space-y-5 group"
              >
                
                {/* Visual Connection Line */}
                <div className="flex items-center w-full relative">
                  <span className="text-4xl font-mono font-black text-[#C8041C] pr-4 select-none leading-none">
                    {step.num}
                  </span>
                  
                  {/* Circular icon container */}
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E6E6E6] flex items-center justify-center shrink-0 z-10 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-[#C8041C]/40">
                    <IconComponent className="w-4 h-4 text-[#C8041C] transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Horizontal red connector line (Desktop only) */}
                  {!isLast && (
                    <div className="hidden md:block absolute left-[96px] right-[-24px] lg:right-[-36px] top-1/2 -translate-y-1/2 h-[1px] bg-[#E6E6E6] z-0 overflow-hidden">
                      <div className="w-full h-full bg-[#C8041C] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    </div>
                  )}
                </div>

                {/* Step Details */}
                <div className="space-y-2 relative z-10 w-full">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#212121] group-hover:text-[#C8041C] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed font-semibold">
                    {step.desc}
                  </p>
                </div>

                {/* Checklist Container */}
                <ul className="space-y-0.5 w-full pt-1">
                  {step.checklist.map((item, cIdx) => (
                    <li key={cIdx} className="border-t border-[#E6E6E6] py-3.5 flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#212121]/80">
                      <svg className="w-3.5 h-3.5 text-[#C8041C] shrink-0 stroke-[2.5px] fill-none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l2 2 4-4" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="border-t border-[#E6E6E6] h-0" />
                </ul>

              </ScrollReveal>
            );
          })}

        </div>

        {/* Bottom Callout Block */}
        <ScrollReveal delay={0.4} yOffset={25} className="pt-4">
          <div className="border border-[#C8041C]/35 rounded-xl bg-[#FAF9F9] p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 w-full text-left">
            {/* Visual Indicator Circle */}
            <div className="w-5 h-5 rounded-full border-2 border-[#C8041C] shrink-0 mt-1 md:mt-1.5 animate-pulse" />
            
            <div className="space-y-2 w-full">
              <h4 className="text-base md:text-lg font-black uppercase tracking-tight text-[#212121]">
                From strategy to screen — we handle everything, so you get impact.
              </h4>
              <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed font-semibold">
                Our process is built to save you time, reduce guesswork, and deliver content that drives growth.
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
