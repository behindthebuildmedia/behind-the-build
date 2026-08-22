import { partners } from '../../data/partners';

export default function Partners() {
  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden border-t border-brand-charcoal/5 flex flex-col justify-center select-none">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
        
        {/* Editorial Section Title */}
        <h2 
          className="font-bold uppercase tracking-tight text-brand-charcoal mb-8 text-center font-sans"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 5.5rem)', lineHeight: '1.1' }}
        >
          OUR CLIENTS<span className="text-brand-red">.</span>
        </h2>

        {/* Static Clients Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 items-center justify-center max-w-5xl mx-auto py-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center w-full h-16 sm:h-20"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} Logo`}
                className="max-w-[140px] max-h-full object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-90 transition-all duration-300 ease-in-out cursor-pointer"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
