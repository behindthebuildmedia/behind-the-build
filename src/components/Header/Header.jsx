import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Menu, ArrowRight } from 'lucide-react';
import logoUrl from '../../assets/images/btb logo.webp';
import MobileMenu from '../MobileMenu/MobileMenu';

export default function Header({ onHomeRedirect }) {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Morph to compact pill state when scrolled past 15px
      if (currentScrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection Observer to highlight active sections on scroll
  useEffect(() => {
    const sections = ['work', 'build-plan', 'process', 'about', 'footer'];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section is in active view area
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Custom smooth scroll animation with duration control (600–800ms)
  const smoothScrollTo = (targetPosition, duration = 700) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);
      
      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleNavClick = (selector) => {
    // If not on homepage (e.g. on confirmation page), redirect first
    if (onHomeRedirect) {
      onHomeRedirect();
    }

    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        const headerOffset = 80; // Offset by 80px so headers aren't covered by navbar
        const elementPosition = element.getBoundingClientRect().top;
        const targetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        smoothScrollTo(targetPosition, 700);
      }
    }, onHomeRedirect ? 120 : 0);
  };
  const handleSpaClick = (e, path) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'Build Your Plan', href: '#build-plan', isDropdown: true },
    { label: 'Our Process', href: '#process' },
    { label: 'About', href: '/about', isSpa: true },
    { label: 'Careers', href: '/careers', isSpa: true },
    { label: 'Contact', href: '#footer' }
  ];

  return (
    <>
      <motion.header 
        initial={shouldReduceMotion ? {} : { y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center"
      >
        <div 
          style={{
            height: isScrolled ? '64px' : '72px',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.55)',
            backdropFilter: isScrolled ? 'blur(22px)' : 'blur(18px)',
            WebkitBackdropFilter: isScrolled ? 'blur(22px)' : 'blur(18px)',
            border: isScrolled ? '1px solid rgba(255, 255, 255, 0.65)' : '1px solid rgba(255, 255, 255, 0.60)',
            boxShadow: isScrolled ? '0 16px 48px rgba(0,0,0,0.12)' : '0 12px 40px rgba(0,0,0,0.08)'
          }}
          className="pointer-events-auto mt-5 w-[90%] md:w-[92%] max-w-[1400px] flex items-center justify-between px-4 sm:px-8 rounded-full transition-all duration-300 ease-out"
        >
          {/* Logo Morph Layout */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname !== '/') {
                if (onHomeRedirect) {
                  onHomeRedirect();
                }
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center pl-2 sm:pl-4"
            aria-label="Behind the Build Home"
          >
            <div className="relative flex items-center h-full">
              {/* Company Logo Wordmark */}
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isScrolled 
                    ? 'w-[75px] sm:w-[90px] md:w-[100px]' 
                    : 'w-[86px] sm:w-[103px] md:w-[115px]'
                }`}
              >
                <img 
                  src={logoUrl} 
                  alt="Behind the Build Logo" 
                  className="w-full object-contain" 
                />
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <div
                  key={item.label}
                  className="relative py-2.5"
                  onMouseEnter={() => item.isDropdown && setIsDropdownOpen(true)}
                  onMouseLeave={() => item.isDropdown && setIsDropdownOpen(false)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.isSpa) {
                        handleSpaClick(e, item.href);
                      } else {
                        handleNavClick(item.href);
                      }
                    }}
                    className={`relative font-sans text-[16px] font-semibold tracking-[0.2px] py-1.5 transition-colors duration-300 group ${
                      isActive ? 'text-brand-red' : 'text-brand-charcoal/80 hover:text-brand-red'
                    }`}
                  >
                    {item.label}
                    {/* Underline Active/Hover Animation */}
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-brand-red transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </a>

                  {item.isDropdown && (
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-brand-white border border-[#E6E6E6] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.08)] py-5 px-5 grid grid-cols-2 gap-3.5 w-[420px] text-left pointer-events-auto"
                        >
                          {[
                            { label: 'MEDIA', num: '01', path: '/services/video-editing', subtitle: 'Video & Event Production' },
                            { label: 'CONTENT', num: '02', path: '/services/social-media-marketing', subtitle: 'Social-First Content' },
                            { label: 'DIGITAL', num: '03', path: '/services/digital-marketing', subtitle: 'Performance & Web Design' },
                            { label: 'DESIGN', num: '04', path: '/services/design', subtitle: 'Brand & Creative Identity' }
                          ].map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.path}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsDropdownOpen(false);
                                handleSpaClick(e, subItem.path);
                              }}
                              className="relative group border border-[#E6E6E6] hover:border-[#C8041C]/25 bg-brand-white hover:bg-[#FAF9F9] p-4 rounded-lg flex flex-col justify-between min-h-[90px] transition-all duration-300 transform hover:-translate-y-1 select-none"
                            >
                              <div className="absolute top-0 left-0 w-full h-[2.5px] bg-[#C8041C] transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 rounded-t-lg" />
                              
                              <div className="flex justify-between items-start w-full">
                                <span className="text-[9px] font-mono font-black text-[#212121]/30 uppercase tracking-widest leading-none block">
                                  {subItem.num}
                                </span>
                              </div>
                              <div className="mt-3 flex flex-col text-left">
                                <span className="text-xs font-black uppercase text-brand-charcoal group-hover:text-[#C8041C] transition-colors tracking-wide leading-none">
                                  {subItem.label}
                                </span>
                                <span className="text-[9px] font-semibold text-[#212121]/45 tracking-tight pt-1 group-hover:text-brand-charcoal/60 transition-colors leading-none">
                                  {subItem.subtitle}
                                </span>
                              </div>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSpaClick(e, '/booking');
              }}
              className="hidden md:flex h-[48px] px-[28px] bg-brand-red text-brand-white text-xs font-mono font-bold uppercase tracking-widest items-center gap-2 rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(200,4,28,0.25)] group"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 border border-brand-charcoal/10 hover:border-brand-charcoal/30 rounded-full md:hidden transition-colors bg-white/50 backdrop-blur-sm focus-ring"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-brand-charcoal" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavClick={handleNavClick}
        activeSection={activeSection}
      />
    </>
  );
}

