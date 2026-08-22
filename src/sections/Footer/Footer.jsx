import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import logoUrl from '../../assets/images/btb logo.webp';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Custom inline SVG icons to prevent lucide-react version export errors
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const footerRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.footer 
      id="footer" 
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerRevealVariants}
      className="bg-brand-white text-brand-charcoal pt-8 pb-5 relative overflow-hidden z-10 text-left"
    >
      {/* Thin Red Build Line above the footer */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-brand-red w-full" />

      {/* Soft gradient background radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(200,4,28,0.035),transparent_65%)] pointer-events-none -z-10" />

      {/* Large watermark background typography */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex items-center justify-end pr-6 md:pr-16 opacity-[0.025]">
        <h2 className="font-sans text-[7rem] sm:text-[11rem] md:text-[13rem] lg:text-[16rem] font-black text-brand-white tracking-tighter leading-[0.85] uppercase text-right">
          BEHIND
          <br />
          THE
          <br />
          BUILD
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-6 border-b border-brand-charcoal/10">
          
          {/* Logo & Brand Statement Column */}
          <div className="md:col-span-5 space-y-4">
            <img
              src={logoUrl}
              alt="Behind the Build Logo"
              width="200"
              height="80"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain"
              loading="lazy"
            />
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#212121] leading-none">
                YOUR STORY.
                <br />
                <span className="text-[#C8041C]">BUILT TO BE SEEN.</span>
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal/50 max-w-sm leading-relaxed font-sans font-normal">
                Behind the Build helps creators, brands, and businesses craft high-retention digital media assets. We build flexible creative services around exactly what you need.
              </p>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] font-bold text-brand-red tracking-widest uppercase mb-3">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-bold uppercase tracking-wider font-sans">
              {[
                { label: 'Work', href: '#work' },
                { label: 'Build Your Plan', href: '#build-plan' },
                { label: 'Our Process', href: '#process' },
                { label: 'About', href: '#brand-statement' }
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="group flex items-center gap-1.5 text-brand-charcoal/60 hover:text-brand-red transition-colors duration-200"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-red pointer-events-none" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Socials Column */}
          <div className="md:col-span-4 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-[10px] font-bold text-brand-red tracking-widest uppercase mb-3">
                CONNECT WITH US
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:admin@behindthebuild.in"
                  className="group flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-charcoal/80 hover:text-brand-red transition-colors duration-200 relative pb-1 max-w-max"
                >
                  <Mail className="w-4 h-4 text-brand-red" />
                  <span>admin@behindthebuild.in</span>
                </a>
                
                {/* Social Icons row */}
                <div className="pt-1 flex gap-3">
                  {[
                    { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                    { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                    { icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' }
                  ].map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-brand-charcoal/10 flex items-center justify-center hover:border-brand-red hover:bg-brand-red/5 hover:text-brand-red transition-colors duration-200 text-brand-charcoal/60"
                        whileHover={!shouldReduceMotion ? { y: -3 } : {}}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      >
                        <IconComponent className="w-4 h-4 pointer-events-none" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Want to build your brand block */}
            <div className="space-y-1 pt-3 border-t border-brand-charcoal/10">
              <p className="text-sm font-sans font-bold text-[#212121]">
                Want to build your brand?
              </p>
              <a
                href="mailto:admin@behindthebuild.in"
                className="text-xs font-sans font-bold uppercase tracking-wider text-[#C8041C] hover:text-[#A30316] transition-colors inline-block mt-1"
              >
                We'll talk &rarr;
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Block */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-brand-charcoal/40">
            &copy; {currentYear} BEHIND THE BUILD. ALL RIGHTS RESERVED.
          </p>
          
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C8041C] font-sans">
            You build it. We bring it to the world.
          </p>
        </div>

      </div>
    </motion.footer>
  );
}

