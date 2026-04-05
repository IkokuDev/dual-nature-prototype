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
            THE VOID<br />HUNTERS
          </h1>
          <p className="text-xl md:text-2xl text-[var(--secondary-text)] max-w-2xl mx-auto font-bold tracking-widest border-l-4 border-red-900 pl-6 text-left font-mono">
            This is a space for my fictional writing. Cosmic horror in the form of journal entries and short stories that slowly uncover a plot. Enjoy!
          </p>
          <p className="text-xl md:text-2xl text-[var(--secondary-text)] max-w-2xl mx-auto font-bold tracking-widest border-l-4 border-red-900 pl-6 text-left font-mono">
            "Blessed is the mind too small for doubt."
          </p>
        </div>
      ) : (

        <div className="max-w-4xl mx-auto space-y-12 pt-12">
          <div className="flex flex-col md:flex-row items-center gap-12 text-left">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[var(--accent-color)] shadow-2xl flex-shrink-0 relative group">
              <img
                src="https://i.ibb.co/gZqGkRVM/IMG-5933-1.jpg"
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full"></div>
            </div>

            <div className="space-y-6">
              <div className="inline-block text-[var(--accent-color)] text-sm tracking-[0.3em] font-bold uppercase border-b border-[var(--accent-color)] pb-2 opacity-80">
                About Me
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-black text-gray-900 tracking-tight leading-none">
                Michael <br /> <span className="text-[var(--accent-color)] italic font-light">Ikoku</span>
              </h1>
              <p className="text-xl md:text-2xl font-serif leading-relaxed text-white">
                Results-driven Software Engineer and AI Specialist with over 5 years of experience developing and automating enterprise-level solutions. Expertise in web applications, AI-driven features, APIs, and workflow optimization. Proven in independent and team environments, delivering high-quality products on time.
              </p>
            </div>
          </div >

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-30"></div>
        </div >
      )}
    </section >
  );
};