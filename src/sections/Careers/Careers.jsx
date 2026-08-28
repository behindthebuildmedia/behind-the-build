import { useEffect, useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Careers() {
  const [activeJob, setActiveJob] = useState(null);

  const mailtoSubject = encodeURIComponent("General Job Application — Behind The Build");
  const mailtoBody = encodeURIComponent(
    "Hello Behind The Build Team,\n\n" +
    "I would like to apply for an opportunity at Behind The Build.\n\n" +
    "Name:\n" +
    "Role:\n" +
    "Phone:\n" +
    "Portfolio / LinkedIn:\n" +
    "Additional information:\n\n" +
    "Thank you,\n" +
    "[Your Name]"
  );
  const generalMailto = `mailto:admin@behindthebuild.in?subject=${mailtoSubject}&body=${mailtoBody}`;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Careers | Behind the Build";
  }, []);

  const openings = [
    {
      id: 'video-editor',
      title: "Lead Video Editor",
      department: "Post-Production",
      location: "Remote / Hybrid (India)",
      type: "Full-Time",
      desc: "We are looking for a creative, high-retention video editor who understands short-form pacing, dynamic typography, and sound design. If you can make videos impossible to ignore, we want you.",
      requirements: [
        "2+ Years experience editing for high-reach creators or agencies",
        "Expert skills in Premiere Pro, After Effects, and DaVinci Resolve",
        "In-depth understanding of social media hooks and pacing analytics",
        "Strong portfolio of published high-retention vertical videos"
      ]
    },
    {
      id: 'social-strategist',
      title: "Social Media Strategist",
      department: "Content & Strategy",
      location: "Hyderabad, India (On-Site)",
      type: "Full-Time",
      desc: "Behind The Build is seeking a social strategist to lead script planning, organic growth campaigns, and creator client relationships. You will define the narrative strategy for brands and founders.",
      requirements: [
        "Proven track record managing organic channels (IG, YT, LinkedIn)",
        "Excellent copywriting, hooks planning, and content mapping skills",
        "Ability to analyze audience retention reports and pivot strategy",
        "Excellent communication and client relationship skills"
      ]
    },
    {
      id: 'motion-designer',
      title: "Motion Designer",
      department: "Design & VFX",
      location: "Remote",
      type: "Contract / Freelance",
      desc: "We are looking for a motion designer to create custom animation overlays, typography templates, logo reveals, and cinematic event transitions for brand campaigns.",
      requirements: [
        "Expert knowledge of After Effects, Blender, or Cinema 4D",
        "Strong aesthetic for clean, premium, minimalist brand animations",
        "Quick turnaround capability and cooperative workflow",
        "Stunning motion graphics reel demonstrating modern pacing"
      ]
    }
  ];

  const handleSpaNav = (e, path) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="bg-brand-white text-[#212121] pt-32 pb-16 min-h-screen font-sans text-left">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full space-y-12 md:space-y-14">
        
        {/* HERO SECTION */}
        <section className="space-y-4 pt-2 md:pt-4 select-none">
          <ScrollReveal delay={0} yOffset={10}>
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              JOIN THE TEAM
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} yOffset={35}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#212121] leading-none">
              BUILD WITH US.
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} yOffset={25} className="max-w-2xl pt-2">
            <p className="text-sm sm:text-base md:text-lg text-[#212121]/60 leading-relaxed font-normal">
              We're looking for people who want to build, create and experiment.
            </p>
          </ScrollReveal>
        </section>

        <hr className="border-[#E5E5E5] w-full" />

        {/* WORK CULTURE VALUES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal delay={0} className="space-y-3">
            <span className="text-[10px] font-mono font-bold text-[#C8041C] uppercase tracking-widest block">01 / PRINCIPLE</span>
            <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-[#212121]">CREATIVE AUTONOMY</h3>
            <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed">
              We trust our editors and strategists to make the final creative call. No micromanagement, only great outcomes.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="space-y-3">
            <span className="text-[10px] font-mono font-bold text-[#C8041C] uppercase tracking-widest block">02 / PRINCIPLE</span>
            <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-[#212121]">CONTINUOUS EXPERIMENTATION</h3>
            <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed">
              Algorithms pivot, formats adapt. We invest time in prototyping content concepts and tracking conversion maps.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="space-y-3">
            <span className="text-[10px] font-mono font-bold text-[#C8041C] uppercase tracking-widest block">03 / PRINCIPLE</span>
            <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-[#212121]">QUALITY OVER VOLUME</h3>
            <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed">
              We don't churn out template junk. Every client build is treated with editorial focus and custom visual curation.
            </p>
          </ScrollReveal>
        </section>

        {/* OPEN OPPORTUNITIES */}
        <section className="space-y-12">
          <ScrollReveal delay={0} yOffset={15} className="space-y-2">
            <span className="text-xs font-mono font-black text-[#C8041C] uppercase tracking-widest block">
              ACTIVE ROLES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#212121]">
              CURRENT OPENINGS
            </h3>
          </ScrollReveal>

          <div className="space-y-4">
            {openings.map((job, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05} className="border border-[#E6E6E6] rounded-none overflow-hidden bg-brand-white">
                <button
                  onClick={() => setActiveJob(activeJob === idx ? null : idx)}
                  className="w-full py-6 px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-left hover:bg-[#FAF9F9] transition-colors focus:outline-none gap-4"
                >
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono font-bold text-[#C8041C] uppercase tracking-widest">
                      {job.department} — {job.type}
                    </span>
                    <h4 className="text-lg font-black uppercase tracking-wide text-[#212121]">
                      {job.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-xs text-[#212121]/50 uppercase tracking-widest font-mono">
                      {job.location}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#212121]/60 transition-transform duration-300 ${
                      activeJob === idx ? 'transform rotate-180' : ''
                    }`} />
                  </div>
                </button>
                
                <div className={`transition-all duration-300 overflow-hidden ${
                  activeJob === idx ? 'max-h-[500px] border-t border-[#E6E6E6]' : 'max-h-0'
                }`}>
                  <div className="p-6 sm:p-8 space-y-6">
                    <p className="text-xs sm:text-sm text-[#212121]/70 leading-relaxed font-normal">
                      {job.desc}
                    </p>
                    
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-[#212121]/40 uppercase tracking-widest block">
                        REQUIREMENTS
                      </span>
                      <ul className="space-y-2">
                        {job.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="text-xs sm:text-sm font-semibold text-brand-charcoal/80 flex items-start gap-3">
                            <span className="w-1.5 h-[1.5px] bg-[#C8041C] mt-2 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-brand-charcoal/5">
                      <p className="text-xs text-[#212121]/50 leading-relaxed font-mono">
                        To apply, email your resume and portfolio links to{' '}
                        <a href={`mailto:admin@behindthebuild.in?subject=[CAREERS] ${job.title} — Your Name`} className="text-[#C8041C] hover:underline font-bold">
                          admin@behindthebuild.in
                        </a>{' '}
                        with the subject format: <code className="bg-brand-charcoal/5 px-2 py-0.5 rounded text-[11px] font-bold">[CAREERS] {job.title} — Your Name</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* GENERAL APPLICATION CTA */}
        <section className="py-12 md:py-16 border-t border-[#E5E5E5] w-full text-center space-y-6 select-none">
          <ScrollReveal delay={0} yOffset={15}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none">
              DON'T SEE YOUR ROLE?
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1} yOffset={15}>
            <p className="text-sm sm:text-base text-[#212121]/60 max-w-md mx-auto leading-relaxed">
              We are always looking for talented video editors, motion artists, sound engineers, and creative content producers.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} yOffset={15} className="pt-4">
            <a
              href={generalMailto}
              className="bg-[#C8041C] text-brand-white hover:bg-[#C8041C]/90 px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-95 mx-auto"
            >
              <span>SEND GENERAL APPLICATION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </ScrollReveal>
        </section>

        {/* BACK TO HOME LINK */}
        <div className="pt-6 text-left select-none">
          <a
            href="/"
            onClick={(e) => handleSpaNav(e, '/')}
            className="inline-flex items-center gap-2.5 text-xs font-mono font-black uppercase tracking-widest text-[#212121] hover:text-[#C8041C] transition-colors duration-300"
          >
            <span>← BACK TO HOME</span>
          </a>
        </div>

      </div>
    </div>
  );
}
