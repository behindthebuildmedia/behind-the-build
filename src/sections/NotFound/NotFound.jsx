import { ArrowLeft } from 'lucide-react';

export default function NotFound({ onHomeRedirect }) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-brand-white px-6 py-24 text-left">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red block">
          404 — PAGE NOT FOUND
        </span>
        <h1 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.05] uppercase">
          THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST.
        </h1>
        <p className="text-sm sm:text-base text-brand-charcoal/60 font-sans font-normal leading-relaxed max-w-lg">
          The link you followed may be broken or the page may have been moved. Let's get you back to the build.
        </p>
        <div className="pt-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onHomeRedirect) onHomeRedirect();
              else {
                window.history.pushState(null, '', '/');
                window.dispatchEvent(new Event('popstate'));
              }
            }}
            className="inline-flex items-center gap-2 bg-brand-red text-white hover:bg-brand-red/90 text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg transition-colors duration-300 focus-ring shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN TO HOMEPAGE
          </a>
        </div>
      </div>
    </section>
  );
}
