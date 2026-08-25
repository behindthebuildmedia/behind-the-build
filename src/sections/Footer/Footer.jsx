import logoUrl from '../../assets/images/btb logo.webp';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

// Custom inline SVG outline icons to match the high-end creative agency mockup
const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const MapPinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

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

export default function Footer() {
  const handleNavClick = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="footer" 
      className="bg-brand-white text-brand-charcoal pt-24 pb-8 relative overflow-hidden z-10 text-left font-sans border-t border-[#E5E5E5]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* SECTION 1: TOP BRAND + CONTACT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
          
          {/* Left Column: Brand Info with Vertical Red Accent Line */}
          <ScrollReveal delay={0} yOffset={35} className="lg:col-span-7 space-y-8">
            <img
              src={logoUrl}
              alt="Behind the Build Logo"
              width="140"
              height="52"
              className="h-9 w-auto object-contain"
              loading="lazy"
            />
            
            <div className="flex gap-6">
              {/* Vertical Red Accent Line */}
              <div className="w-[3px] bg-[#C8041C] shrink-0" />
              
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl md:text-[56px] font-black uppercase tracking-tight text-[#212121] leading-[1.05] font-sans">
                  YOUR STORY.
                  <br />
                  <span className="text-[#C8041C]">BUILT TO BE</span>
                  <br />
                  <span className="text-[#C8041C]">SEEN.</span>
                </h2>
                
                <p className="text-sm md:text-[15px] text-[#212121]/80 leading-relaxed font-normal max-w-lg font-sans">
                  Behind The Build helps creators, brands, and businesses craft high-retention digital media assets. We build flexible creative services around exactly what you need.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Prominent Contact Information */}
          <ScrollReveal delay={0.15} yOffset={30} className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-12 pt-8 lg:pt-24 w-full">
            {/* Email Address */}
            <div className="flex items-center gap-4">
              <MailIcon className="text-[#C8041C] shrink-0" />
              <a 
                href="mailto:admin@behindthebuild.in" 
                className="text-[17px] font-bold text-[#212121] hover:text-[#C8041C] transition-colors duration-300 lg:whitespace-nowrap font-sans"
              >
                admin@behindthebuild.in
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <MapPinIcon className="text-[#C8041C] shrink-0" />
              <span className="text-[17px] font-bold text-[#212121] font-sans">
                Hyderabad, India
              </span>
            </div>
          </ScrollReveal>

        </div>

        {/* SECTION 2: NAVIGATION AREA */}
        <ScrollReveal delay={0.3} yOffset={20} className="w-full">
          <hr className="border-[#E5E5E5] w-full" />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full pt-4">
          
          {/* Services Column */}
          <ScrollReveal delay={0.38} yOffset={25} className="space-y-6">
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
                    className="relative group text-[15px] font-bold text-[#212121] hover:text-[#C8041C] transition-colors duration-300 font-sans inline-block py-0.5"
                  >
                    <span>{item.label}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8041C] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Company Column */}
          <ScrollReveal delay={0.48} yOffset={25} className="space-y-6">
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
                    className="relative group text-[15px] font-bold text-[#212121] hover:text-[#C8041C] transition-colors duration-300 font-sans inline-block py-0.5"
                  >
                    <span>{item.label}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8041C] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Social Column with Outline Icons */}
          <ScrollReveal delay={0.58} yOffset={25} className="space-y-6">
            <h4 className="text-xs font-bold text-[#C8041C] tracking-widest uppercase font-sans">
              SOCIAL
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Instagram', href: 'https://instagram.com/behindthebuild.co', icon: InstagramIcon },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/behindthebuild', icon: LinkedinIcon },
                { label: 'YouTube', href: 'https://youtube.com/@behindthebuild', icon: YoutubeIcon }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <li key={idx}>
                    <a 
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group text-[15px] font-bold text-[#212121] hover:text-[#C8041C] transition-colors duration-300 font-sans inline-flex items-center gap-2.5 py-0.5"
                    >
                      <IconComponent className="text-[#212121] group-hover:text-[#C8041C] transition-colors duration-300" />
                      <span>{item.label}</span>
                      <span className="absolute bottom-0 left-[28px] right-0 h-[1.5px] bg-[#C8041C] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>

          {/* Legal Column */}
          <ScrollReveal delay={0.68} yOffset={25} className="space-y-6">
            <h4 className="text-xs font-bold text-[#C8041C] tracking-widest uppercase font-sans">
              LEGAL
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms & Conditions', path: '/terms' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.path} 
                    className="relative group text-[15px] font-bold text-[#212121] hover:text-[#C8041C] transition-colors duration-300 font-sans inline-block py-0.5"
                  >
                    <span>{item.label}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8041C] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

        </div>

        {/* SECTION 3: BOTTOM AREA */}
        <ScrollReveal delay={0.75} yOffset={10} className="w-full space-y-8">
          <hr className="border-[#E5E5E5] w-full" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-sans text-brand-charcoal/50 leading-none pt-2">
            <p className="font-semibold">
              &copy; 2026 Behind The Build. All rights reserved.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
}
