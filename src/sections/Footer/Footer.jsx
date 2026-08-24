import logoUrl from '../../assets/images/btb logo.webp';

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

  const linkClass = "group flex items-center gap-1.5 text-brand-charcoal hover:text-[#C8041C] font-bold text-sm transition-all duration-300 transform hover:translate-x-1";

  const hoverDot = (
    <span className="w-1.5 h-1.5 bg-[#C8041C] rounded-none scale-0 group-hover:scale-100 transition-transform duration-300 shrink-0" />
  );

  return (
    <footer 
      id="footer" 
      className="bg-brand-white text-brand-charcoal pt-20 pb-8 relative overflow-hidden z-10 text-left font-sans border-t border-[#E5E5E5]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Main Grid: Left Column Brand + Right Columns Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
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
                { icon: InstagramIcon, href: 'https://instagram.com/behindthebuild', label: 'Instagram' },
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
                    className="text-brand-charcoal hover:text-[#C8041C] transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Column Wrapper */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 w-full">
            
            {/* Services Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#C8041C] tracking-widest uppercase font-sans">
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
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#C8041C] tracking-widest uppercase font-sans">
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
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#C8041C] tracking-widest uppercase font-sans">
                CONTACT
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:admin@behindthebuild.in" 
                    className="text-brand-charcoal hover:text-[#C8041C] font-bold text-sm transition-colors duration-300 break-words block"
                  >
                    admin@behindthebuild.in
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+916302026012" 
                    className="text-brand-charcoal hover:text-[#C8041C] font-bold text-sm transition-colors duration-300 block"
                  >
                    +91 63020 26012
                  </a>
                </li>
                <li className="text-brand-charcoal/70 font-medium text-sm">
                  Hyderabad, India
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#C8041C] tracking-widest uppercase font-sans">
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
            </div>

          </div>

        </div>

        {/* Divider */}
        <hr className="border-[#E5E5E5] w-full" />

        {/* Bottom Copyright & Legal links alignment */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-sans text-brand-charcoal/60 leading-none">
          <p className="font-medium">
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
