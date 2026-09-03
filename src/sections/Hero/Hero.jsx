import { motion, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Briefcase, Clock, Smile, Star } from 'lucide-react';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useResponsive } from '../../hooks/useResponsive';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import heroVideoUrl from '../../assets/videos/hero_video.mp4';
import MagneticButton from '../../components/MagneticButton/MagneticButton';
import heroWebp from '../../assets/hero.webp';



export default function Hero() {
  const { isMobile, isTouch } = useResponsive();
  const shouldReduceMotion = useReducedMotion();

  // Desktop only mouse parallax spring outputs
  const { x: mouseX, y: mouseY } = useMouseParallax(!isTouch && !shouldReduceMotion);

  // Parallax mappings
  const bgParallaxX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const bgParallaxY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);
  const fgParallaxX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const fgParallaxY = useTransform(mouseY, [-0.5, 0.5], [-18, 18]);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const workSection = document.querySelector('#work');
    if (workSection) {
      const headerOffset = 80;
      const elementPosition = workSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleStartProject = (e) => {
    e.preventDefault();
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      const headerOffset = 80;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Stagger animation variables
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const lineMaskVariants1 = {
    initial: { y: '105%' },
    animate: {
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
    },
  };

  const lineMaskVariants2 = {
    initial: { y: '105%' },
    animate: {
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
  };

  const lineMaskVariants3 = {
    initial: { y: '105%' },
    animate: {
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
    },
  };

  const eyebrowVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
    },
  };

  const fadeUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
    },
  };

  const videoRevealVariants = {
    initial: { clipPath: 'inset(0 100% 0 0)' },
    animate: {
      clipPath: 'inset(0 0 0 0)',
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
    },
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-[100dvh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-white">
      
      {/* Background Video with motion parallax & premium light gradient mask */}
      <motion.div
        variants={videoRevealVariants}
        initial={shouldReduceMotion ? "animate" : "initial"}
        animate="animate"
        style={{
          x: !isTouch ? bgParallaxX : 0,
          y: !isTouch ? bgParallaxY : 0,
          scale: 1.05, // Slight scale-up to prevent border clipping during parallax shifts
        }}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
      >
        {!isTouch ? (
          <video
            src={heroVideoUrl}
            poster={heroWebp}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-[0.55]"
          />
        ) : (
          <img
            src={heroWebp}
            alt="Behind the Build visual"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-[0.55]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/60 to-white/30" />
      </motion.div>

      {/* Subtle brand lines in background for luxury draft feel */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-brand-charcoal/10" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-brand-charcoal/10" />
        <div className="absolute left-1/3 top-0 w-[1px] h-full bg-brand-charcoal/10" />
        <div className="absolute left-2/3 top-0 w-[1px] h-full bg-brand-charcoal/10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Headline Content (spans more columns for wide editorial layout) */}
        <div className="lg:col-span-9 flex flex-col items-start text-left z-10">
          {/* Eyebrow Positioning Line */}
          <span className="animate-hero-eyebrow text-xs font-mono font-bold uppercase tracking-widest text-brand-red mb-4 block">
            BUILDING BRANDS FOR WHAT'S NEXT.
          </span>

          {/* Main Headline line-by-line mask reveal */}
          <h1 className="font-sans text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-brand-charcoal leading-[1.05] uppercase">
            <span className="block overflow-hidden pb-1">
              <span className="animate-hero-line-1 block">
                YOU BUILD IT.
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="animate-hero-line-2 block">
                WE <span className="text-brand-red">BRING IT</span>
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="animate-hero-line-3 block">
                TO THE WORLD.
              </span>
            </span>
          </h1>

          {/* Description (Tagline) - Reduced font size and tighter spacing */}
          <p className="animate-hero-fade mt-6 text-sm sm:text-base text-brand-charcoal/60 max-w-md font-sans font-normal leading-relaxed">
            Media, content, digital and design for ambitious brands, startups and technology companies.
          </p>

          {/* CTA Buttons */}
          <div className="animate-hero-fade mt-10 flex flex-wrap items-center gap-6">
            <MagneticButton>
              <a
                href="#services"
                onClick={handleStartProject}
                className="relative bg-brand-red text-white hover:bg-brand-red/90 text-sm font-bold uppercase tracking-wider px-8 py-4 flex items-center gap-2 transition-colors duration-300 focus-ring overflow-hidden group rounded-lg"
              >
                START A PROJECT
                <motion.span 
                  className="inline-block"
                  animate={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </a>
            </MagneticButton>

            <a
              href="#work"
              onClick={handleScrollToWork}
              className="text-brand-charcoal hover:text-brand-red text-sm font-bold uppercase tracking-wider py-4 flex items-center gap-1.5 transition-colors relative group font-sans focus-ring"
            >
              VIEW OUR WORK
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="absolute bottom-3 left-0 w-full h-[1px] bg-brand-charcoal/20 group-hover:bg-brand-red transition-colors" />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="animate-hero-fade mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-brand-charcoal/5 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-8 w-full">
            {/* Projects Delivered */}
            <div className="flex flex-col items-start min-w-[80px] sm:min-w-[100px]">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red mb-1.5 sm:mb-2" />
              <span className="text-xl sm:text-3xl font-bold tracking-tight text-brand-charcoal">50+</span>
              <span className="text-[11px] sm:text-xs text-brand-charcoal/50 mt-0.5 sm:mt-1">Projects Delivered</span>
            </div>

            <div className="hidden sm:block h-10 w-[1px] bg-brand-charcoal/10" />

            {/* Editing Hours */}
            <div className="flex flex-col items-start min-w-[80px] sm:min-w-[100px]">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red mb-1.5 sm:mb-2" />
              <span className="text-xl sm:text-3xl font-bold tracking-tight text-brand-charcoal">150+</span>
              <span className="text-[11px] sm:text-xs text-brand-charcoal/50 mt-0.5 sm:mt-1">Editing Hours</span>
            </div>

            <div className="hidden md:block h-10 w-[1px] bg-brand-charcoal/10" />

            {/* Client Satisfaction */}
            <div className="flex flex-col items-start min-w-[80px] sm:min-w-[100px]">
              <Smile className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red mb-1.5 sm:mb-2" />
              <span className="text-xl sm:text-3xl font-bold tracking-tight text-brand-charcoal">98%</span>
              <span className="text-[11px] sm:text-xs text-brand-charcoal/50 mt-0.5 sm:mt-1">Client Satisfaction</span>
            </div>

            <div className="hidden sm:block h-10 w-[1px] bg-brand-charcoal/10" />

            {/* Client Brands */}
            <div className="flex flex-col items-start min-w-[80px] sm:min-w-[100px]">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red mb-1.5 sm:mb-2" />
              <span className="text-xl sm:text-3xl font-bold tracking-tight text-brand-charcoal">5+</span>
              <span className="text-[11px] sm:text-xs text-brand-charcoal/50 mt-0.5 sm:mt-1">Client Brands</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



