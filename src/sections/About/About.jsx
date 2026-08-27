import { motion } from 'framer-motion';

// Custom inline SVG icons to prevent lucide-react version export errors
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);



import imgEditing from '../../assets/about/about_editing.webp';
import imgEvents from '../../assets/images/services/events.webp';
import imgSocial from '../../assets/about/about_social.webp';
import imgPhotography from '../../assets/images/services/photography.webp';
import imgBTS from '../../assets/about/about_hero.webp';

export default function About() {
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

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const cardHover = {
    hover: { scale: 1.025, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden border-t border-brand-charcoal/5 flex flex-col justify-center select-none font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            <div className="space-y-6">
              {/* Section Tag */}
              <p className="text-xs font-bold uppercase tracking-widest text-[#C8041C]">
                06 / ABOUT BEHIND THE BUILD
              </p>
              
              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-[45px] font-black uppercase tracking-tight text-[#212121] leading-[1.05] font-sans">
                WE DON’T JUST<br />
                CREATE CONTENT.<br />
                <span className="text-[#C8041C]">WE MAKE BRANDS<br />VISIBLE.</span>
              </h2>

              {/* Body Text */}
              <div className="space-y-4 text-[#212121]/70 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
                <p>
                  Behind The Build is a creative production agency helping startups, brands, creators, and businesses tell their stories through photography, videography, editing, content creation, and strategic visual storytelling.
                </p>
                <p>
                  We believe every great product deserves great storytelling. Every project is crafted to capture attention, build trust, and create lasting impact.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleScrollTo('#work')}
                  className="px-6 py-3.5 bg-[#C8041C] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-full hover:bg-[#A30316] transition-colors cursor-pointer"
                >
                  VIEW OUR WORK &rarr;
                </button>
                <button
                  onClick={() => handleScrollTo('#build-plan')}
                  className="px-6 py-3.5 bg-white border border-[#212121] text-[#212121] text-xs font-sans font-bold uppercase tracking-wider rounded-full hover:bg-[#212121]/5 transition-colors cursor-pointer"
                >
                  START A PROJECT &rarr;
                </button>
              </div>
            </div>

            {/* Social Divider & Icon List */}
            <div className="space-y-4 pt-10 border-t border-[#212121]/10">
              <span className="text-[10px] font-bold tracking-widest text-[#212121]/50 uppercase block">
                FOLLOW US
              </span>
              <div className="flex items-center gap-6 text-[#212121]/60">
                <a href="https://www.instagram.com/behindthebuild_official/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8041C] transition-colors">
                  <InstagramIcon />
                </a>
                <a href="https://www.linkedin.com/company/behind-the-build-official/posts/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8041C] transition-colors">
                  <LinkedinIcon />
                </a>
                <a href="https://www.youtube.com/channel/UCSYVvK1307E2DyVbKGMGLQg" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8041C] transition-colors">
                  <YoutubeIcon />
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Visual Production Wall */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 w-full animate-fadeIn"
          >
            {/* Desktop / Tablet Masonry Wall (Hidden on Mobile) */}
            <div className="hidden sm:grid grid-cols-2 gap-4">
              
              {/* Left Masonry Column */}
              <div className="flex flex-col gap-4">
                
                {/* 1. VIDEO EDITING (Large Vertical) */}
                <motion.div 
                  variants={cardHover}
                  whileHover="hover"
                  className="aspect-[4/5] relative w-full overflow-hidden rounded-2xl border border-[#212121]/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] group select-none cursor-pointer bg-brand-lightgray"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
                  <img
                    src={imgEditing}
                    alt="Video Editing workstation"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                    <span className="w-4 h-[1.5px] bg-[#C8041C]" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-white">
                      VIDEO EDITING
                    </span>
                  </div>
                </motion.div>

                {/* 4. PHOTOGRAPHY (Medium) */}
                <motion.div 
                  variants={cardHover}
                  whileHover="hover"
                  className="aspect-[4/3] relative w-full overflow-hidden rounded-2xl border border-[#212121]/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] group select-none cursor-pointer bg-brand-lightgray"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
                  <img
                    src={imgPhotography}
                    alt="Professional Camera Lens"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                    <span className="w-4 h-[1.5px] bg-[#C8041C]" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-white">
                      PHOTOGRAPHY
                    </span>
                  </div>
                </motion.div>

              </div>

              {/* Right Masonry Column */}
              <div className="flex flex-col gap-4">
                
                {/* 2. EVENT COVERAGE (Stacked 1) */}
                <motion.div 
                  variants={cardHover}
                  whileHover="hover"
                  className="aspect-[4/3] relative w-full overflow-hidden rounded-2xl border border-[#212121]/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] group select-none cursor-pointer bg-brand-lightgray"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
                  <img
                    src={imgEvents}
                    alt="Event Film Camera setup"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                    <span className="w-4 h-[1.5px] bg-[#C8041C]" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-white">
                      EVENT COVERAGE
                    </span>
                  </div>
                </motion.div>

                {/* 3. SOCIAL MEDIA & DESIGN (Stacked 2 - Red tint overlay) */}
                <motion.div 
                  variants={cardHover}
                  whileHover="hover"
                  className="aspect-[4/3] relative w-full overflow-hidden rounded-2xl border border-[#212121]/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] group select-none cursor-pointer bg-brand-lightgray"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-[#C8041C]/15 mix-blend-color transition-all duration-500 group-hover:bg-[#C8041C]/5 z-20" />
                  <img
                    src={imgSocial}
                    alt="Social Media and Design studio workstation"
                    className="w-full h-full object-cover filter grayscale opacity-90 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2">
                    <span className="w-4 h-[1.5px] bg-[#C8041C]" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-white">
                      SOCIAL MEDIA & DESIGN
                    </span>
                  </div>
                </motion.div>

              </div>

            </div>

            {/* Mobile Layout Grid (Hidden on Desktop/Tablet) */}
            <div className="grid sm:hidden grid-cols-2 gap-3.5">
              
              {/* 1. VIDEO EDITING */}
              <div className="aspect-[4/5] relative w-full overflow-hidden rounded-2xl border border-[#212121]/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85 z-10" />
                <img
                  src={imgEditing}
                  alt="Video Editing workstation"
                  className="w-full h-full object-cover filter grayscale"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5">
                  <span className="w-2.5 h-[1.5px] bg-[#C8041C]" />
                  <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-white">
                    VIDEO EDITING
                  </span>
                </div>
              </div>

              {/* 2. EVENT COVERAGE */}
              <div className="aspect-[4/5] relative w-full overflow-hidden rounded-2xl border border-[#212121]/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85 z-10" />
                <img
                  src={imgEvents}
                  alt="Event Film Camera setup"
                  className="w-full h-full object-cover filter grayscale"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5">
                  <span className="w-2.5 h-[1.5px] bg-[#C8041C]" />
                  <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-white">
                    EVENT COVERAGE
                  </span>
                </div>
              </div>

              {/* 3. SOCIAL MEDIA & DESIGN */}
              <div className="aspect-[4/5] relative w-full overflow-hidden rounded-2xl border border-[#212121]/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85 z-10" />
                <div className="absolute inset-0 bg-[#C8041C]/15 mix-blend-color z-20" />
                <img
                  src={imgSocial}
                  alt="Social Media and Design studio workstation"
                  className="w-full h-full object-cover filter grayscale opacity-90"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 z-30 flex items-center gap-1.5">
                  <span className="w-2.5 h-[1.5px] bg-[#C8041C]" />
                  <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-white">
                    SOCIAL MEDIA & DESIGN
                  </span>
                </div>
              </div>

              {/* 4. PHOTOGRAPHY */}
              <div className="aspect-[4/5] relative w-full overflow-hidden rounded-2xl border border-[#212121]/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85 z-10" />
                <img
                  src={imgPhotography}
                  alt="Professional Camera Lens"
                  className="w-full h-full object-cover filter grayscale"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5">
                  <span className="w-2.5 h-[1.5px] bg-[#C8041C]" />
                  <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-white">
                    PHOTOGRAPHY
                  </span>
                </div>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
