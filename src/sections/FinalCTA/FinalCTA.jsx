import { motion } from 'framer-motion';
import footerImg from '../../assets/images/footer.webp';

export default function FinalCTA() {
  const handleScrollToBuilder = (e) => {
    e.preventDefault();
    const builderSection = document.getElementById('services');
    if (builderSection) {
      const headerOffset = 80;
      const elementPosition = builderSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      const headerOffset = 80;
      const elementPosition = workSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="connect"
      className="relative py-28 md:py-36 flex items-center overflow-hidden bg-brand-white select-none border-t border-brand-charcoal/5"
    >
      
      {/* Background Image with Parallax & White Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={footerImg}
          alt="Behind the Build video production setup"
          className="w-full h-full object-cover origin-center opacity-25"
        />
        {/* Soft white overlay with left-to-right gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-white via-brand-white/90 to-brand-white/40 pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10 text-left">
        
        <div className="max-w-3xl flex flex-col items-start space-y-6 md:space-y-8">
          {/* Section Accent Label */}
          <p className="text-xs font-bold uppercase tracking-widest text-[#C8041C] font-mono">
            LET'S CREATE TOGETHER
          </p>

          {/* Large Typographic Editorial Heading */}
          <h2 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-brand-charcoal leading-[1.05] uppercase font-sans">
            YOUR NEXT<br />
            <span className="inline-flex items-center gap-3">
              <span className="bg-brand-charcoal text-brand-white px-4 py-1 text-3xl sm:text-5xl xl:text-6xl font-black rounded-none">
                BIG
              </span>
              <span className="text-[#C8041C]">STORY</span>
            </span>
            <br />
            STARTS HERE.
          </h2>

          {/* Description Copy */}
          <p className="text-sm sm:text-base text-brand-charcoal/70 leading-relaxed font-sans font-bold max-w-[600px]">
            You build it. We bring it to the world.
          </p>

          {/* Buttons Deck */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={handleScrollToBuilder}
              className="bg-[#C8041C] text-brand-white hover:bg-[#A60417] px-8 py-4 rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              <span>START A PROJECT →</span>
            </button>
            <button
              onClick={handleScrollToWork}
              className="bg-transparent border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-white px-8 py-4 rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
            >
              <span>VIEW OUR WORK →</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
