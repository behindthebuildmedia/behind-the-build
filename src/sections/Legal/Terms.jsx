import { useEffect } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

export default function Terms() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    document.title = "Terms & Conditions | Behind the Build";
  }, []);

  const tocItems = [
    { num: '01', label: 'Introduction', id: 'intro' },
    { num: '02', label: 'Use of Website', id: 'usage' },
    { num: '03', label: 'Services', id: 'services' },
    { num: '04', label: 'Project Requests', id: 'requests' },
    { num: '05', label: 'Payments', id: 'payments' },
    { num: '06', label: 'Intellectual Property', id: 'intellectual-property' },
    { num: '07', label: 'Client Responsibilities', id: 'client-responsibilities' },
    { num: '08', label: 'Third-Party Platforms', id: 'third-party' },
    { num: '09', label: 'Limitation of Liability', id: 'liability' },
    { num: '10', label: 'Changes to Terms', id: 'changes' },
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
              TERMS & CONDITIONS
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
                01 / WELCOME
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                INTRODUCTION
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                Welcome to Behind The Build. These Terms & Conditions govern your use of our website and outline the terms of service for any project inquiries, video editing, social media management, creative design, and branding services provided by our agency.
              </p>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                By browsing our site, submitting details through our configurators, or engaging us to build your content, you enter into a binding agreement and accept these terms. Please read them carefully.
              </p>
            </section>

            {/* 02 Use of Website */}
            <section id="usage" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                02 / ACCESS RULES
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                USE OF WEBSITE
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                You are granted a non-exclusive, non-transferable, revocable license to access our platform strictly in accordance with these terms. You agree not to use the site for any unlawful actions, attempts to disrupt our server networks, or extract assets from our showcased case studies without licensing authorizations.
              </p>
            </section>

            {/* 03 Services */}
            <section id="services" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                03 / WORK DESCRIPTION
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                AGENCY SERVICES
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                Behind The Build provides high-retention media asset creation, professional video editing, custom motion graphics, social designs, and general branding support. The details, constraints, features, and target prices for each service layer are defined during the project scope definition phase.
              </p>
            </section>

            {/* 04 Project Requests */}
            <section id="requests" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                04 / SUBMISSIONS
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                PROJECT ENQUIRIES
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                When you submit a plan configuration or enquiry using our website forms, you confirm that all information provided is accurate and that you have authority to act on behalf of your brand. Submission of an enquiry does not obligate Behind The Build to accept the project. Work officially begins only upon signing a mutually agreed service contract.
              </p>
            </section>

            {/* 05 Payments */}
            <section id="payments" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                05 / BILLING
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                PAYMENT TERMS & INVOICES
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                Specific payment milestones, retainer splits, and invoicing timelines are detailed inside your individual creative agreement. Generally:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                <li>Payments must be settled according to the due dates specified on the official invoice.</li>
                <li>All transaction fees are the responsibility of the client unless specified otherwise.</li>
                <li>Revisions outside the defined scope may result in additional charges, which will be quoted upfront.</li>
              </ul>
            </section>

            {/* 06 Intellectual Property */}
            <section id="intellectual-property" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                06 / OWNERSHIP
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                INTELLECTUAL PROPERTY
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                Our policy ensures a fair transfer of creative rights to allow you to build your presence securely:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                <li><strong className="text-[#212121]">Deliverables:</strong> Upon receipt of full and final payment, ownership and publishing rights of the final edited video or digital assets transfer to the client.</li>
                <li><strong className="text-[#212121]">Behind The Build IP:</strong> We retain ownership of our core editing frameworks, project files (unless explicitly bought out), workflows, proprietary software tools, and underlying source files used in the creation process.</li>
                <li><strong className="text-[#212121]">Portfolio Showcase:</strong> Behind The Build reserves the right to display final deliverables, snippets, and project growth metrics within our online case studies, portfolio, and marketing channels, unless a non-disclosure agreement (NDA) has been agreed upon.</li>
              </ul>
            </section>

            {/* 07 Client Responsibilities */}
            <section id="client-responsibilities" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                07 / RESPONSIBILITY
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                CLIENT RESPONSIBILITIES
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                To keep creative builds running smoothly, clients must cooperate in good faith:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                <li>Provide clean high-quality raw assets, logo packs, fonts, and conceptual guides on schedule.</li>
                <li>Verify that all client-supplied assets are free of third-party copyright claims.</li>
                <li>Review drafts and submit clear, consolidated feedback requests within the agreed-upon revision window.</li>
                <li>Understand that project delays caused by client inaction or slow feedback may adjust delivery schedules.</li>
              </ul>
            </section>

            {/* 08 Third-Party Platforms */}
            <section id="third-party" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                08 / INTEGRATIONS
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                THIRD-PARTY TOOLS
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                We may utilize third-party plugins, stock libraries, music tracks, and database platforms (like Supabase or Resend) to deliver your project. Any licensing limitations or terms of service established by these external providers apply directly to the final deliverables.
              </p>
            </section>

            {/* 09 Limitation of Liability */}
            <section id="liability" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                09 / LIABILITY LIMITS
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                LIMITATION OF LIABILITY
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                To the maximum extent permitted by law, Behind The Build and its team will not be liable for any indirect, incidental, special, or consequential damages (including loss of views, revenue, audience retention drop, or platform copyright flags) arising out of the use of our website or services. Our total liability is strictly limited to the amount paid to us for the specific project in question.
              </p>
            </section>

            {/* 10 Changes to Terms */}
            <section id="changes" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                10 / REVISIONS
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                CHANGES TO TERMS
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                We reserve the right to revise and edit these terms at any time. Any changes will be published here with an updated "Last updated" date. Your continued access to the site or use of our services indicates your acceptance of the updated terms.
              </p>
            </section>

            {/* 11 Contact Us */}
            <section id="contact" className="space-y-4 scroll-mt-28">
              <span className="text-[#C8041C] font-mono font-black text-[10px] uppercase tracking-widest block">
                11 / CONTACT INFO
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                GET IN TOUCH
              </h2>
              <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#212121]/80 font-sans font-normal">
                For questions, clarifications, or to initiate a project agreement request, please contact Behind The Build:
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
