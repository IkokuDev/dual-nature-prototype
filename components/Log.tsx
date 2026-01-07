import React from 'react';

interface LogProps {
  isDark: boolean;
}

export const Log: React.FC<LogProps> = ({ isDark }) => {
  return (
    <section className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <span className={`inline-block px-3 py-1 text-xs font-bold tracking-[0.3em] uppercase mb-4 border ${isDark ? 'border-red-900 text-red-900' : 'border-teal-700 text-teal-900'}`}>
          {isDark ? 'ARCHIVE // CORRUPTED' : 'Oral Histories'}
        </span>
        <h2 className="text-4xl md:text-5xl font-bold uppercase">
          {isDark ? 'VOICES FROM THE WARP' : 'The Afrofuturist Manifesto'}
        </h2>
      </div>

      <div className={`columns-1 md:columns-2 gap-8 space-y-8 ${isDark ? 'font-mono text-sm' : 'font-sans text-lg'}`}>
        {isDark ? (
          // Dark Mode Content
          <>
            <div className="break-inside-avoid p-6 bg-[#0a0000] border border-red-900/50">
              <p className="text-red-700 mb-2 font-bold">>> ENTRY 0441</p>
              <p className="opacity-70 leading-relaxed">
                The code screams when I compile it. Not errors, but actual screams. The machine spirit is displeased with the new neural architecture. It demands blood sacrifice. I gave it 16GB of RAM instead. It is waiting.
              </p>
            </div>
            <div className="break-inside-avoid p-6 bg-[#0a0000] border border-red-900/50">
              <p className="text-red-700 mb-2 font-bold">>> ENTRY 0442</p>
              <p className="opacity-70 leading-relaxed">
                I looked into the monitor and saw the event horizon. The user interface is melting. My reflection in the screen has no eyes.
              </p>
            </div>
            <div className="break-inside-avoid p-6 bg-[#0a0000] border border-red-900/50">
              <p className="text-red-700 mb-2 font-bold">>> ENTRY 0445</p>
              <p className="opacity-70 leading-relaxed uppercase">
                Sanity is a constraint. Chaos is the only true variable.
              </p>
            </div>
          </>
        ) : (
          // Light Mode Content
          <>
            <div className="break-inside-avoid p-8 bg-[rgba(255,255,255,0.2)] backdrop-blur-sm">
              <p className="text-[var(--secondary-text)] font-bold mb-4">I. Reclaiming the Future</p>
              <p className="leading-relaxed opacity-90">
                We do not merely predict the future; we construct it from the clay of our heritage. Technology is the drum, and code is the rhythm.
              </p>
            </div>
            <div className="break-inside-avoid p-8 bg-[rgba(255,255,255,0.2)] backdrop-blur-sm">
              <p className="text-[var(--secondary-text)] font-bold mb-4">II. The Digital Diaspora</p>
              <p className="leading-relaxed opacity-90">
                In the infinite expanse of the cloud, we find a new home. A space where identity is fluid, and the spirit is unbound by geography.
              </p>
            </div>
            <div className="break-inside-avoid p-8 bg-[rgba(255,255,255,0.2)] backdrop-blur-sm">
              <p className="text-[var(--secondary-text)] font-bold mb-4">III. Solarpunk Dreams</p>
              <p className="leading-relaxed opacity-90">
                Green tech, gold sand. A utopia built not on conquest, but on connection.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};