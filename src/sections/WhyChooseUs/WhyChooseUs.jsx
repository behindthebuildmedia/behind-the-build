import { motion } from 'framer-motion';
import { Camera, Clock, Compass, Sliders, Layers, HeartHandshake, HelpCircle } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

const iconMap = {
  Camera,
  Clock,
  Compass,
  Sliders,
  Layers,
  HeartHandshake
};

const features = [
  {
    id: 'prod',
    title: 'PROFESSIONAL PRODUCTION',
    desc: 'High-quality content that stands out.',
    icon: 'Camera'
  },
  {
    id: 'turn',
    title: 'FAST TURNAROUND',
    desc: 'On-time delivery, every time.',
    icon: 'Clock'
  },
  {
    id: 'brand',
    title: 'CONTENT THAT FITS YOUR BRAND',
    desc: 'Custom content aligned with your identity.',
    icon: 'Compass'
  },
  {
    id: 'edit',
    title: 'PREMIUM EDITING',
    desc: 'Cinematic edits that make an impact.',
    icon: 'Sliders'
  },
  {
    id: 'pack',
    title: 'FLEXIBLE PACKAGES',
    desc: 'Plans that grow with your needs.',
    icon: 'Layers'
  },
  {
    id: 'supp',
    title: 'DEDICATED SUPPORT',
    desc: "We're with you at every step.",
    icon: 'HeartHandshake'
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Headline */}
          <ScrollReveal className="lg:col-span-5 text-left space-y-6 lg:sticky lg:top-[15vh] self-start">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8041C]">
                07 / WHY CHOOSE US
              </span>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
                WHY BRANDS
                <br />
                CHOOSE <span className="text-[#C8041C]">US.</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Right Column - 2x3 Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full text-left">
            {features.map((feature, idx) => {
              const Icon = iconMap[feature.icon] || HelpCircle;

              return (
                <ScrollReveal
                  key={feature.id}
                  delay={idx * 0.06}
                  className="bg-brand-white p-8 border border-[#E6E6E6] rounded-none transition-all duration-300 flex flex-col items-start select-none relative group hover:border-brand-charcoal/40"
                >
                  {/* Icon Box */}
                  <div className="w-10 h-10 bg-[#FAF9F9] border border-[#E6E6E6] flex items-center justify-center rounded-none shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-4 h-4 text-[#C8041C]" />
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-sm font-black text-brand-charcoal font-sans uppercase tracking-wider mt-6">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-brand-charcoal/50 leading-relaxed font-sans font-normal mt-3">
                    {feature.desc}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
