import logoUrl from '../../assets/images/btb logo.webp';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

// Custom inline SVG icons to prevent lucide-react version export errors
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default function Footer() {
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

  const linkClass = "group flex items-center gap-1.5 text-brand-charcoal/85 hover:text-[#C8041C] font-semibold text-sm transition-all duration-300 transform hover:translate-x-1 font-sans";

  const hoverDot = (
    <span className="w-1.5 h-1.5 bg-[#C8041C] rounded-none scale-0 group-hover:scale-100 transition-transform duration-300 shrink-0" />
  );

  return (
    <footer 
      id="footer" 
      className="bg-brand-white text-brand-charcoal pt-20 pb-8 relative overflow-hidden z-10 text-left font-sans border-t border-[#E5E5E5]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Main Grid: 5 columns on desktop, 2 columns on tablet, single column stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr_1fr] gap-10 md:gap-12 items-start w-full">
          
          {/* Brand Info (spans across 2 columns on tablet, 1 column on desktop) */}
          <ScrollReveal className="sm:col-span-2 lg:col-span-1 space-y-6">
            <img
              src={logoUrl}
              alt="Behind the Build Logo"
              width="140"
              height="52"
              className="h-9 w-auto object-contain"
              loading="lazy"
            />
            
            <div className="space-y-1">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-none">
                YOUR STORY.
              </h3>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#C8041C] leading-none">
                BUILT TO BE SEEN.
              </h3>
            </div>

            <p className="text-sm text-brand-charcoal/80 leading-relaxed font-normal max-w-[500px]">
              Behind The Build helps creators, brands, and businesses craft high-retention digital media assets. We build flexible creative services around exactly what you need.
            </p>

            {/* Social Icons row */}
            <div className="flex gap-6 pt-2">
              {[
                { icon: InstagramIcon, href: 'https://instagram.com/behindthebuild.co', label: 'Instagram' },
                { icon: LinkedinIcon, href: 'https://linkedin.com/company/behindthebuild', label: 'LinkedIn' },
                { icon: YoutubeIcon, href: 'https://youtube.com/@behindthebuild', label: 'YouTube' }
              ].map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-charcoal hover:text-[#C8041C] transform transition-all duration-300 hover:-translate-y-0.5"
                    aria-label={social.label}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Services Links */}
          <ScrollReveal delay={0.08} className="space-y-4">
            <h4 className="text-xs font-semibold text-[#C8041C] tracking-widest uppercase font-sans">
              SERVICES
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Video Editing', id: '#build-plan' },
                { label: 'Event Coverage', id: '#build-plan' },
                { label: 'Social Media & Design', id: '#build-plan' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.id} 
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={linkClass}
                  >
                    {hoverDot}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Company Links */}
          <ScrollReveal delay={0.16} className="space-y-4">
            <h4 className="text-xs font-semibold text-[#C8041C] tracking-widest uppercase font-sans">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', id: '#about' },
                { label: 'Our Process', id: '#process' },
                { label: 'Our Work', id: '#work' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.id} 
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={linkClass}
                  >
                    {hoverDot}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.24} className="space-y-4">
            <h4 className="text-xs font-semibold text-[#C8041C] tracking-widest uppercase font-sans">
              CONTACT
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:admin@behindthebuild.in" 
                  className="text-brand-charcoal hover:text-[#C8041C] font-semibold text-sm lg:whitespace-nowrap transition-colors duration-300 block"
                >
                  admin@behindthebuild.in
                </a>
              </li>
              <li className="text-brand-charcoal/70 font-medium text-sm font-sans">
                Hyderabad, India
              </li>
            </ul>
          </ScrollReveal>

          {/* Legal Links */}
          <ScrollReveal delay={0.32} className="space-y-4">
            <h4 className="text-xs font-semibold text-[#C8041C] tracking-widest uppercase font-sans">
              LEGAL
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/privacy" 
                  className={linkClass}
                >
                  {hoverDot}
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className={linkClass}
                >
                  {hoverDot}
                  <span>Terms & Conditions</span>
                </a>
              </li>
            </ul>
          </ScrollReveal>

        </div>

        {/* Divider */}
        <hr className="border-[#E5E5E5] w-full mt-8" />

        {/* Bottom Copyright & Legal links alignment */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-sans text-brand-charcoal/60 leading-none pt-2">
          <p className="font-semibold">
            &copy; 2026 Behind The Build. All rights reserved.
          </p>
          <div className="hidden md:flex gap-6 items-center">
            <a href="/privacy" className="hover:text-[#C8041C] transition-colors font-medium">Privacy Policy</a>
            <span className="w-1 h-1 bg-brand-charcoal/30 rounded-full" />
            <a href="/terms" className="hover:text-[#C8041C] transition-colors font-medium">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
