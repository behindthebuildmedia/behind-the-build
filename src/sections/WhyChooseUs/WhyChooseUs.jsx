import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Clock, Compass, Sliders, Layers, HeartHandshake, HelpCircle, ArrowRight } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

const iconMap = {
  Camera,
  Clock,
  Compass,
  Sliders,
  Layers,
  HeartHandshake
};

import partner1 from '../../assets/images/partner_1.webp';
import partner2 from '../../assets/images/partner_2.webp';
import ctaImg from '../../assets/images/why_us_cta.webp';

const features = [
  {
    id: 'prod',
    title: 'PROFESSIONAL PRODUCTION',
    desc: 'High-quality photography and videography for events, brands, products, and businesses.',
    icon: 'Camera'
  },
  {
    id: 'turn',
    title: 'FAST TURNAROUND',
    desc: 'Efficient production workflows designed to deliver quality content on time without compromising the final result.',
    icon: 'Clock'
  },
  {
    id: 'brand',
    title: 'CONTENT THAT FITS YOUR BRAND',
    desc: 'Every visual is created around your brand, audience, communication goals, and identity.',
    icon: 'Compass'
  },
  {
    id: 'edit',
    title: 'PREMIUM EDITING',
    desc: 'Professional editing, color correction, motion graphics, sound design, and platform-ready content.',
    icon: 'Sliders'
  },
  {
    id: 'pack',
    title: 'FLEXIBLE PACKAGES',
    desc: "Choose the services you need or build a package around your project's requirements.",
    icon: 'Layers'
  },
  {
    id: 'supp',
    title: 'DEDICATED SUPPORT',
    desc: 'Clear communication, regular updates, and reliable support throughout every project.',
    icon: 'HeartHandshake'
  }
];

export default function WhyChooseUs() {
  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const targetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="why-choose-us" className="py-20 md:py-24 bg-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Top Grid: Left Editorial Header & Right 2x3 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Panel */}
          <ScrollReveal className="lg:col-span-5 text-left space-y-8 lg:sticky lg:top-[15vh] self-start">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C8041C]">
                07 / WHY CHOOSE US
              </p>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#212121] leading-[1.05] font-sans">
                WHY BRANDS<br />
                CHOOSE<br />
                BEHIND THE<br />
                BUILD<span className="text-[#C8041C]">.</span>
              </h2>
            </div>

            <div className="space-y-4 max-w-sm text-sm sm:text-base text-[#212121]/70 leading-relaxed font-sans font-normal">
              <p className="font-bold text-[#212121] text-sm sm:text-base">
                We don't just create content. We create visual experiences that help brands attract attention, build trust, and grow faster.
              </p>
              <p className="text-xs sm:text-sm">
                From product launches to corporate events, every project is crafted with creativity, precision, and cinematic quality.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleScrollTo('#build-plan')}
                className="bg-[#C8041C] text-white hover:bg-[#A30316] px-8 py-3.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                BOOK YOUR PROJECT &rarr;
              </button>
              <button
                onClick={() => handleScrollTo('#work')}
                className="border border-[#212121] text-[#212121] hover:bg-[#212121]/5 bg-transparent px-8 py-3.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                VIEW OUR WORK &rarr;
              </button>
            </div>

            {/* Client Divider & Logos */}
            <div className="pt-10 border-t border-[#212121]/10">
              <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#212121]/45 mb-4">
                TRUSTED BY AMBITIOUS BRANDS
              </p>
              <div className="flex gap-8 items-center">
                <img
                  src={partner1}
                  alt="Consistency.AI"
                  width="120"
                  height="56"
                  className="h-12 sm:h-14 object-contain opacity-40 hover:opacity-80 grayscale transition-opacity duration-300"
                  loading="lazy"
                />
                <img
                  src={partner2}
                  alt="DELUSIONAI"
                  width="120"
                  height="56"
                  className="h-12 sm:h-14 object-contain opacity-40 hover:opacity-80 grayscale transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right Panel: 2x3 Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = iconMap[feature.icon] || HelpCircle;

              return (
                <ScrollReveal
                  key={feature.id}
                  delay={idx * 0.08}
                  className="bg-white p-8 rounded-xl border border-[#E5E5E5] transition-all duration-250 flex flex-col items-start text-left select-none relative overflow-hidden group hover:border-[#C8041C] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
                >
                  {/* Icon Box */}
                  <div className="p-3 bg-[#F5F5F5] border border-[#212121]/5 rounded-xl group-hover:scale-105 transition-transform duration-250 shrink-0">
                    <Icon className="w-5.5 h-5.5 text-[#C8041C] stroke-[2px]" />
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-sm font-bold text-[#212121] font-sans uppercase tracking-wider mt-6 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-[#212121]/60 leading-relaxed font-sans font-normal mt-3">
                    {feature.desc}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Block */}
        <ScrollReveal className="w-full">
          <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden flex flex-col md:flex-row items-stretch min-h-[320px]">
            {/* Left side cinematic image */}
            <div className="w-full md:w-1/2 relative min-h-[220px] md:min-h-0 overflow-hidden bg-brand-lightgray">
              <motion.img
                src={ctaImg}
                alt="Cinema Production Workspace"
                width="600"
                height="400"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
            {/* Right side block */}
            <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center items-start text-left space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#212121] font-sans leading-tight">
                Ready to Build Something Incredible?
              </h3>
              <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed font-sans font-normal max-w-sm">
                Let's create content that helps your brand stand out and connect with your audience.
              </p>
              <button
                onClick={() => handleScrollTo('#build-plan')}
                className="bg-[#C8041C] text-white hover:bg-[#A30316] px-8 py-3.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                BOOK YOUR PROJECT &rarr;
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
