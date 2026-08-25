import { useEffect } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

export default function Privacy() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | Behind the Build";
  }, []);

  const tocItems = [
    { num: '01', label: 'Introduction', id: 'intro' },
    { num: '02', label: 'Information We Collect', id: 'collect' },
    { num: '03', label: 'How We Use Information', id: 'use-info' },
    { num: '04', label: 'Information Sharing', id: 'sharing' },
    { num: '05', label: 'Cookies & Tracking', id: 'cookies' },
    { num: '06', label: 'Data Security', id: 'security' },
    { num: '07', label: 'Third-Party Services', id: 'third-party' },
    { num: '08', label: 'Your Rights', id: 'rights' },
    { num: '09', label: 'Data Retention', id: 'retention' },
    { num: '10', label: 'Changes to This Policy', id: 'changes' },
    { num: '11', label: 'Contact Us', id: 'contact' }
  ];

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleHomeRedirect = (e) => {
    e.preventDefault();
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="bg-brand-white pt-28 pb-16 min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full space-y-12">
        
        {/* LEGAL PAGE HERO */}
        <section className="space-y-4 pt-8 select-none">
          <ScrollReveal delay={0} yOffset={10}>
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              LEGAL
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} yOffset={35}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#212121] leading-none font-sans">
              PRIVACY POLICY
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} yOffset={15}>
            <p className="text-xs font-mono text-[#212121]/50 font-bold uppercase tracking-widest mt-4">
              Last updated: August 25, 2026
            </p>
          </ScrollReveal>
        </section>

        <hr className="border-[#E5E5E5] w-full" />

        {/* CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 pt-6">
          
          {/* LEFT SIDE: STICKY TABLE OF CONTENTS */}
          <div className="lg:col-span-4 lg:sticky lg:top-[120px] self-start select-none">
            {/* Desktop TOC */}
            <div className="hidden lg:block space-y-3.5">
              <span className="text-[10px] font-mono font-black text-[#212121]/30 uppercase tracking-widest block mb-6">
                TABLE OF CONTENTS
              </span>
              <ul className="space-y-3">
                {tocItems.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleTocClick(e, item.id)}
                      className="group flex items-center gap-3 text-[11px] font-mono font-black uppercase tracking-widest text-[#212121]/55 hover:text-[#C8041C] transition-colors duration-300"
                    >
                      <span className="text-[#C8041C] text-[9px]">{item.num}</span>
                      <span className="border-b border-transparent group-hover:border-[#C8041C] transition-all">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile/Tablet TOC: Compact Horizontal Scrollbar */}
            <div className="lg:hidden w-full pb-4 border-b border-[#E5E5E5] overflow-x-auto scrollbar-none flex gap-6 whitespace-nowrap">
              {tocItems.map((item, idx) => (
                <a
                  key={idx}
                  href={`#${item.id}`}
                  onClick={(e) => handleTocClick(e, item.id)}
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest text-[#212121]/60 hover:text-[#C8041C] transition-colors duration-300"
                >
                  <span className="text-[#C8041C] text-[8px]">{item.num}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: LEGAL CONTENT */}
          <div className="lg:col-span-8 space-y-16 max-w-3xl">
            
            {/* 01 Introduction */}
            <section id="intro" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                01 / INTRODUCTION
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                WELCOME & OVERVIEW
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                At Behind The Build, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, store, and safeguard your data when you visit our website or engage our creative media and digital marketing services.
              </p>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                By accessing our website or submitting project details through our configurators and forms, you agree to the practices outlined in this policy. If you do not agree with any part of this policy, please refrain from using our services or submitting information.
              </p>
            </section>

            {/* 02 Information We Collect */}
            <section id="collect" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                02 / DATA COLLECTION
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                INFORMATION WE COLLECT
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                We collect information that you choose to provide directly to us through our website's contact forms, project planner, booking flows, and when communicating with us. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                <li><strong className="text-[#212121]">Identity Details:</strong> Full name, company or organization name, and industry.</li>
                <li><strong className="text-[#212121]">Contact Information:</strong> Email address, phone number, and location (City, Country).</li>
                <li><strong className="text-[#212121]">Project Requirements:</strong> Scope details, asset types, visual specifications, timelines, budget indicators, and other custom information submitted through our build planner.</li>
                <li><strong className="text-[#212121]">Communications:</strong> Any message details, feedback, or inquiries you send to our administrative email.</li>
              </ul>
            </section>

            {/* 03 How We Use Information */}
            <section id="use-info" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                03 / PURPOSE
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                HOW WE USE INFORMATION
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                We use the information we collect to operate, maintain, and improve our services, and to build exactly what you need. Specifically, we use your data to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                <li>Respond immediately to project enquiries, scope validation requests, and scheduling preferences.</li>
                <li>Customize editing, motion design, and brand storytelling services to align with your platform requirements.</li>
                <li>Verify structural booking requests, process orders, and provide active customer support.</li>
                <li>Send transactional email confirmations, calendar notifications, and invoice updates.</li>
                <li>Track overall website health, analyze client engagement metrics, and optimize onboarding steps.</li>
                <li>Ensure compliance with legal mandates and prevent fraudulent operations or terms violations.</li>
              </ul>
            </section>

            {/* 04 Information Sharing */}
            <section id="sharing" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                04 / SHARING & DISCLOSURE
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                INFORMATION SHARING
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                We value your trust and do not sell, rent, trade, or distribute your personal details to third parties for independent marketing purposes. We only share your data with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                <li><strong className="text-[#212121]">Trusted Subcontractors:</strong> Service providers and infrastructure developers who assist us with secure email relay (e.g. Resend, Nodemailer), hosting database management (e.g. Supabase), and website telemetry analytics. These companies are strictly bound by confidentiality terms.</li>
                <li><strong className="text-[#212121]">Legal Authorities:</strong> When we are legally forced to comply with local regulations, court processes, or to defend the intellectual rights and safety of Behind The Build.</li>
              </ul>
            </section>

            {/* 05 Cookies & Tracking */}
            <section id="cookies" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                05 / COOKIES
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                COOKIES & TELEMETRY
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                Our website utilizes basic technical cookies and standard browser tracking mechanisms to enhance user experience, preserve UI states, and monitor performance traffic. 
              </p>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                These cookies store non-personally identifiable variables like viewport dimensions, device types, loading durations, and section views. You can configure your browser to reject cookies, though doing so might affect specific interactive tools like the project cost calculator.
              </p>
            </section>

            {/* 06 Data Security */}
            <section id="security" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                06 / SECURITY PROTOCOLS
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                DATA SECURITY
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                We implement robust physical, technical, and administrative security measures to prevent unauthorized data access, leakage, modification, or destruction. All data transmission on our site is encrypted over HTTPS.
              </p>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                However, please remember that no transmission system over the internet is completely infallible. While we strive to guard your information, we cannot guarantee absolute, bulletproof security.
              </p>
            </section>

            {/* 07 Third-Party Services */}
            <section id="third-party" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                07 / THIRD PARTIES
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                THIRD-PARTY INTEGRATIONS
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                Our portfolio, case studies, and content plans link out to external websites and social networks (e.g. YouTube, Instagram, LinkedIn). Behind The Build is not responsible for the privacy regulations, code behaviors, or content policies of third-party platforms. We recommend checking their individual privacy specifications.
              </p>
            </section>

            {/* 08 Your Rights */}
            <section id="rights" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                08 / USER RIGHTS
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                YOUR DATA RIGHTS
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                Depending on your geographical location, you have rights regarding the personal information you submit to us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                <li><strong className="text-[#212121]">Access & Rectify:</strong> You can request a summary of the data we hold on you, or ask to correct any inaccuracies.</li>
                <li><strong className="text-[#212121]">Erasure (Right to be Forgotten):</strong> You can ask us to completely delete your contact information and build request history from our records.</li>
                <li><strong className="text-[#212121]">Data Portability:</strong> Request a transferable digital copy of the information you provided to us.</li>
              </ul>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                To exercise any of these rights, contact us directly at our administrative email.
              </p>
            </section>

            {/* 09 Data Retention */}
            <section id="retention" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                09 / RETENTION
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                DATA RETENTION LIMITS
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                We only retain your personal data for as long as it is necessary to fulfill the creative and business purposes detailed in this policy, including resolving client projects, billing audits, and complying with taxation and business record laws.
              </p>
            </section>

            {/* 10 Changes to This Policy */}
            <section id="changes" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                10 / REVISIONS
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                POLICY UPDATES
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                Behind The Build reserves the right to update this policy periodically to reflect operational, legal, or service changes. When updates are published, the "Last Updated" date at the top will be updated. We encourage you to review this page regularly.
              </p>
            </section>

            {/* 11 Contact Us */}
            <section id="contact" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                11 / CONTACT
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                GET IN TOUCH
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                If you have questions, concerns, or requests regarding this Privacy Policy, please reach out to us:
              </p>
              <div className="space-y-2 pt-2 text-[16px] sm:text-[17px] leading-[1.75] font-sans font-bold text-[#212121]">
                <p>Behind The Build</p>
                <p>Hyderabad, India</p>
                <p className="pt-2 font-mono text-sm tracking-wide">
                  Email: <a href="mailto:admin@behindthebuild.in" className="text-[#C8041C] hover:underline">admin@behindthebuild.in</a>
                </p>
              </div>
            </section>

            {/* Back to Home Link */}
            <div className="pt-12 text-left">
              <a
                href="/"
                onClick={handleHomeRedirect}
                className="inline-flex items-center gap-2.5 text-xs font-mono font-black uppercase tracking-widest text-[#212121] hover:text-[#C8041C] transition-colors duration-300"
              >
                <span>← BACK TO HOME</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
