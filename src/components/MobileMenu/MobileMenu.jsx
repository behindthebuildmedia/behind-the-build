import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ChevronDown } from 'lucide-react';
import logoUrl from '../../assets/images/btb logo.webp';

export default function MobileMenu({ isOpen, onClose, onNavClick, activeSection }) {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const menuVariants = {
    initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
    animate: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Build Your Plan', href: '#build-plan', isDropdown: true },
    { label: 'Our Process', href: '#process' },
    { label: 'About', href: '/about', isSpa: true },
    { label: 'Careers', href: '/careers', isSpa: true },
    { label: 'Contact', href: '#footer' }
  ];

  const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.215, 0.610, 0.355, 1] } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 bg-brand-white text-brand-charcoal z-50 flex flex-col justify-between p-5 sm:p-12 overflow-y-auto"
        >
          {/* Top Header */}
          <div className="flex justify-between items-center w-full">
            <img 
              src={logoUrl} 
              alt="Behind the Build Logo" 
              width="103"
              height="32"
              className="h-8 sm:h-10 w-auto object-contain" 
            />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-3 border border-brand-charcoal/10 hover:border-brand-charcoal/30 rounded-full transition-colors focus-ring"
            >
              <X className="w-5 h-5 text-brand-charcoal" />
            </button>
          </div>

          {/* Navigation Links */}
          <motion.nav
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-4 sm:gap-5 my-auto text-left max-w-lg"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <div key={link.label} className="overflow-hidden">
                  {link.isDropdown ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                        className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-brand-charcoal hover:text-brand-red transition-colors block py-1 uppercase text-left w-full flex items-center justify-between"
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isMobileDropdownOpen ? 'transform rotate-180 text-brand-red' : ''}`} />
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${isMobileDropdownOpen ? 'max-h-[300px] my-3 pl-4 border-l border-brand-charcoal/10 space-y-3' : 'max-h-0'}`}>
                        {[
                          { label: 'VIDEO EDITING', path: '/services/video-editing' },
                          { label: 'SOCIAL MEDIA MARKETING', path: '/services/social-media-marketing' },
                          { label: 'DESIGN', path: '/services/design' },
                          { label: 'WEBSITE DESIGN', path: '/services/website-design' },
                          { label: 'TECH EVENTS COVERAGE', path: '/services/tech-events-coverage' },
                          { label: 'DIGITAL MARKETING', path: '/services/digital-marketing' }
                        ].map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.path}
                            onClick={(e) => {
                              e.preventDefault();
                              onClose();
                              setTimeout(() => {
                                window.history.pushState(null, '', subItem.path);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo({ top: 0, behavior: 'instant' });
                              }, 300);
                            }}
                            className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-brand-charcoal/70 hover:text-brand-red block uppercase"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.a
                      variants={itemVariants}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        setTimeout(() => {
                          if (link.isSpa) {
                            window.history.pushState(null, '', link.href);
                            window.dispatchEvent(new Event('popstate'));
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          } else {
                            onNavClick(link.href);
                          }
                        }, 400);
                      }}
                      className={`font-sans text-3xl sm:text-5xl font-bold tracking-tight transition-colors block py-1 uppercase ${
                        isActive ? 'text-brand-red' : 'hover:text-brand-red text-brand-charcoal'
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  )}
                </div>
              );
            })}
          </motion.nav>

          {/* Bottom Footer Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-brand-charcoal/10 pt-6 gap-6 w-full">
            <p className="text-xs sm:text-sm text-brand-charcoal/40 font-mono tracking-wider">
              WHAT YOU BUILD DESERVES TO BE SEEN.
            </p>
            <a
              href="#build-plan"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                setTimeout(() => {
                  onNavClick('#build-plan');
                }, 400);
              }}
              className="bg-brand-red text-white flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-brand-red/90 transition-colors w-full sm:w-auto justify-center focus-ring"
            >
              START A PROJECT <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

