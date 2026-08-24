import { motion } from 'framer-motion';
import { MessageSquare, Calendar, Camera } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'DISCOVERY',
      desc: 'Understanding your brand, goals, and audience.',
      icon: MessageSquare
    },
    {
      num: '02',
      title: 'PLANNING',
      desc: 'Strategy, ideation, and creative direction.',
      icon: Calendar
    },
    {
      num: '03',
      title: 'PRODUCTION',
      desc: 'Creating high-quality content that delivers results.',
      icon: Camera
    }
  ];

  return (
    <section id="process" className="py-24 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-left max-w-xl mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C8041C] font-mono">OUR PROCESS</p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal mt-2">
            OUR PROCESS<span className="text-[#C8041C]">.</span>
          </h2>
        </ScrollReveal>

        {/* Horizontal Editorial Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative">
          
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <ScrollReveal key={idx} delay={idx * 0.08} className="w-full">
                <div className="flex flex-col items-start relative text-left space-y-6">
                  
                  {/* Step Row Header */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      {/* Step Number */}
                      <span className="text-4xl font-black text-brand-charcoal/5 leading-none select-none font-mono">
                        {step.num}
                      </span>
                      {/* Icon */}
                      <div className="w-10 h-10 bg-brand-white border border-[#E6E6E6] flex items-center justify-center rounded-none shrink-0 shadow-sm">
                        <IconComponent className="w-4 h-4 text-[#C8041C]" />
                      </div>
                    </div>

                    {/* Connector Line (Desktop) */}
                    {!isLast && (
                      <div className="hidden md:block absolute left-[120px] right-[-40px] top-[18px] h-[1.5px] bg-[#C8041C]/30 z-0" />
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2 relative z-10 pt-2">
                    <h3 className="text-base font-bold uppercase tracking-tight text-brand-charcoal font-sans">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-charcoal/60 leading-relaxed font-sans font-normal max-w-[280px]">
                      {step.desc}
                    </p>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}

        </div>

      </div>
    </section>
  );
}
