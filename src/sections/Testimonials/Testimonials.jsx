import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

const testimonialsData = [
  {
    quote: "Behind The Build has been a <span class=\"text-[#C8041C]\">game-changer</span> for Consistency.AI. Their content, consistency, and creativity helped us grow an incredible community and reach <span class=\"text-[#C8041C]\">millions</span>.",
    name: "SANTOSH KUMAR THOTA",
    role: "FOUNDER, CONSISTENCY.AI"
  },
  {
    quote: "Their team understands our vision and turns it into powerful content every single time. <span class=\"text-[#C8041C]\">Professional</span>, reliable, and extremely <span class=\"text-[#C8041C]\">creative</span>.",
    name: "GANESH",
    role: "MARKETING HEAD, DELUSIONAL"
  },
  {
    quote: "Behind The Build brings strong creative execution and <span class=\"text-[#C8041C]\">development-focused</span> thinking to every project. Their team understands what needs to be built and communicates it clearly through content.",
    name: "UDAY",
    role: "DEVELOPMENT, JATAYU AI"
  },
  {
    quote: "Their execution is structured, reliable, and focused on <span class=\"text-[#C8041C]\">getting things done</span>. Behind The Build has been a valuable creative and operations partner for War Rooms.",
    name: "SASHI",
    role: "OPERATIONS HEAD, WAR ROOMS"
  },
  {
    quote: "Behind The Build has been a key creative partner for our tech channel. Their <span class=\"text-[#C8041C]\">editorial pacing</span> and clean sound design make our tech reviews look incredibly premium.",
    name: "TECHROXX",
    role: "CREATOR & FOUNDER"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-14 sm:py-20 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-3">
            <ScrollReveal yOffset={10} duration={0.4} delay={0}>
              <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
                CLIENT LOVE
              </span>
            </ScrollReveal>
            
            <ScrollReveal yOffset={15} duration={0.6} delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none">
                CLIENT LOVE<span className="text-[#C8041C]">.</span>
              </h2>
            </ScrollReveal>
          </div>
          
          <ScrollReveal yOffset={10} duration={0.4} delay={0.2} className="shrink-0">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#212121]/45 hover:text-[#C8041C] transition-colors duration-300">
              MORE REVIEWS ON REQUEST →
            </span>
          </ScrollReveal>
        </div>

        {/* 2-Column Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {testimonialsData.map((item, idx) => (
            <ScrollReveal 
              key={idx} 
              delay={idx * 0.1}
              yOffset={20}
              className={idx === 4 ? "w-full md:col-span-2" : "w-full"}
            >
              <div className="bg-white border border-[#E6E6E6] p-8 md:p-10 flex flex-col justify-between min-h-[220px] w-full hover:border-[#C8041C]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-all duration-300 relative group rounded-xl">
                
                {/* Visual accent left line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-[#C8041C] group-hover:h-3/5 transition-all duration-300 rounded-r-md" />

                <div className="space-y-5">
                  {/* Oversized Quote Icon */}
                  <span className="text-6xl font-serif font-black text-[#C8041C]/25 leading-none block select-none h-6 transition-colors duration-300 group-hover:text-[#C8041C]/60">
                    “
                  </span>
                  
                  {/* Quote Paragraph */}
                  <p 
                    className="text-xs sm:text-sm font-semibold text-[#212121]/80 leading-relaxed font-sans"
                    dangerouslySetInnerHTML={{ __html: item.quote }}
                  />
                </div>

                {/* Client Profile details */}
                <div className="pt-6 mt-auto border-t border-[#E6E6E6]/60 flex flex-col space-y-1">
                  <h3 className="text-xs font-black text-[#212121] uppercase tracking-wider leading-none">
                    {item.name}
                  </h3>
                  <p className="text-[9px] font-mono font-bold tracking-widest text-[#C8041C] uppercase leading-none pt-1">
                    {item.role}
                  </p>
                </div>

                {/* Bottom interactive border reveal */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8041C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
