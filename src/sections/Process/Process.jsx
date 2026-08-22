import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Calendar, Camera, Sliders, Rocket, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

import discoveryImg from '../../assets/images/process/discovery.webp';
import planningImg from '../../assets/images/process/planning.webp';
import productionImg from '../../assets/images/process/production.webp';
import editingImg from '../../assets/images/process/editing.webp';
import launchImg from '../../assets/images/process/launch.webp';

const steps = [
  {
    num: '01',
    title: 'DISCOVERY',
    desc: 'We understand your business, goals, audience, and creative vision before planning anything.',
    icon: MessageSquare,
    image: discoveryImg
  },
  {
    num: '02',
    title: 'PLANNING',
    desc: 'We prepare shot lists, production schedules, locations, scripts, and timelines before every production.',
    icon: Calendar,
    image: planningImg
  },
  {
    num: '03',
    title: 'PRODUCTION',
    desc: 'Our team captures cinematic photos and videos using professional cameras, lighting, drones, and high-end production equipment.',
    icon: Camera,
    image: productionImg
  },
  {
    num: '04',
    title: 'EDITING & REVIEW',
    desc: 'Professional editing, motion graphics, sound design, color grading, revisions, and client approvals.',
    icon: Sliders,
    image: editingImg
  },
  {
    num: '05',
    title: 'LAUNCH',
    desc: 'Final content is exported, optimized, and delivered for Instagram, YouTube, LinkedIn, websites, and digital campaigns.',
    icon: Rocket,
    image: launchImg
  }
];

export default function Process() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Monitor scroll progress over the entire section naturally
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate connector line path animation lengths linked to scroll ranges
  const path1Length = useTransform(scrollYProgress, [0.05, 0.20], [0, 1]);
  const path2Length = useTransform(scrollYProgress, [0.25, 0.40], [0, 1]);
  const path3Length = useTransform(scrollYProgress, [0.45, 0.60], [0, 1]);
  const path4Length = useTransform(scrollYProgress, [0.65, 0.80], [0, 1]);
  const connectorPathLengths = [path1Length, path2Length, path3Length, path4Length];

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="py-20 md:py-24 bg-brand-white relative overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-left max-w-xl mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red font-mono">05 / THE PROCESS</p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-brand-charcoal mt-2">
            Our Process
          </h2>
          <p className="text-sm md:text-base text-brand-charcoal/60 mt-4 leading-relaxed">
            From idea to final delivery, every project follows a clear production workflow designed for speed, quality, and collaboration.
          </p>
        </ScrollReveal>

        {/* Alternate Step Cards */}
        <div className="space-y-12">
          {steps.map((step, idx) => {
            const isLeftText = idx % 2 === 0;

            return (
              <div key={idx} className="relative">
                {/* Step Row Flex Layout */}
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between ${
                  isLeftText ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}>
                  
                  {/* Text Card */}
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 0, y: 20 } : { opacity: 0, y: 40, x: isLeftText ? -30 : 30 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={!shouldReduceMotion ? { y: -8 } : {}}
                    className="w-full lg:w-[46%] bg-brand-white p-8 sm:p-10 md:p-12 rounded-[20px] shadow-sm hover:shadow-md border border-brand-charcoal/5 transition-all duration-300 flex flex-col items-start text-left relative z-10"
                  >
                    {/* Red Step Number with underline */}
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-3xl font-mono font-bold text-brand-red tracking-wider leading-none">
                        {step.num}
                      </span>
                      <span className="w-8 h-[2px] bg-brand-red" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-black text-brand-charcoal font-sans uppercase tracking-tight mt-6">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-charcoal/60 leading-relaxed font-sans font-normal mt-3">
                      {step.desc}
                    </p>

                    {/* Rounded Icon Box */}
                    <div className="mt-8 p-3 rounded-xl bg-brand-lightgray border border-brand-charcoal/5 hover:scale-105 transition-transform duration-300 shrink-0">
                      <step.icon className="w-5.5 h-5.5 text-brand-red stroke-[2px]" />
                    </div>
                  </motion.div>

                  {/* Image Card */}
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 0, y: 20 } : { opacity: 0, y: 40, x: isLeftText ? 30 : -30 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full lg:w-[46%] h-[240px] sm:h-[300px] md:h-[340px] rounded-[20px] overflow-hidden shadow-sm hover:shadow-md border border-brand-charcoal/5 relative z-10 transition-shadow duration-300"
                  >
                    <motion.img
                      src={step.image}
                      alt={step.title}
                      width="600"
                      height="450"
                      whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                  </motion.div>

                </div>

                {/* Scroll-Animated Curved Dotted Connectors */}
                {idx < steps.length - 1 && (
                  <div className="h-32 w-full relative hidden lg:block overflow-visible z-0 pointer-events-none my-4">
                    <svg className="absolute left-1/2 -translate-x-1/2 w-48 h-32 overflow-visible" viewBox="0 0 200 128" fill="none">
                      <motion.path
                        d={isLeftText 
                          ? "M 100 0 C 180 40, 20 80, 100 128" // curves right, then left
                          : "M 100 0 C 20 40, 180 80, 100 128"  // curves left, then right
                        }
                        stroke="#C8041C"
                        strokeWidth="2"
                        strokeDasharray="5 4"
                        style={shouldReduceMotion ? { pathLength: 1 } : { pathLength: connectorPathLengths[idx] }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-32 pt-20 border-t border-brand-charcoal/5 text-center max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-brand-charcoal font-sans">
              Ready to Build Something Incredible?
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-brand-charcoal/60 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
              Let's transform your ideas into powerful visual stories.
            </p>
            <div className="pt-6 flex justify-center">
              <button
                onClick={() => {
                  const el = document.getElementById('build-plan');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brand-red text-brand-white hover:bg-brand-red/90 px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 group transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
