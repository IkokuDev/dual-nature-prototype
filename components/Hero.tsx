import React from 'react';

interface HeroProps {
  isDark: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isDark }) => {
  return (
    <section className="min-h-[50vh] flex flex-col justify-center text-center relative z-20">
      {isDark ? (
        <div className="space-y-8">
          <div className="inline-block border border-[var(--text-color)] px-6 py-2 text-xs tracking-[0.4em] font-bold mb-4 bg-black/50 backdrop-blur-md">
             SECTOR: IMPERIALIS
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-4 uppercase leading-[0.85] burn-text tracking-tighter">
            THE VOID<br/>HUNTERS
          </h1>
          <p className="text-xl md:text-2xl text-[var(--secondary-text)] max-w-2xl mx-auto font-bold tracking-widest border-l-4 border-red-900 pl-6 text-left font-mono">
            "Blessed is the mind too small for doubt."
          </p>
        </div>
      ) : (
        <div className="space-y-8">
           <div className="inline-block text-[var(--accent-color)] px-4 py-1 text-sm tracking-[0.3em] font-bold mb-4 uppercase">
             The Great Gig in the Sky
          </div>
          <h1 className="text-7xl md:text-9xl font-normal mb-6 uppercase tracking-normal italic burn-text">
            Echoes of <br/><span className="text-[var(--accent-color)] not-italic font-bold">The Horizon</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto opacity-90 font-heading">
            We are just two lost souls swimming in a fish bowl, year after year.
          </p>
          <div className="w-px h-24 bg-[var(--accent-color)] mx-auto mt-12 opacity-50"></div>
        </div>
      )}
    </section>
  );
};