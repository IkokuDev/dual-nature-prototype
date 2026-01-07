import React from 'react';

interface SonicRelayProps {
  isDark: boolean;
}

export const SonicRelay: React.FC<SonicRelayProps> = ({ isDark }) => {
  return (
    <section className="max-w-2xl mx-auto py-12 relative z-20">
      <div className={`
        relative overflow-hidden transition-all duration-700
        ${isDark 
          ? 'border-[10px] border-[#222] bg-[#111] shadow-[0_0_20px_rgba(255,0,0,0.2)]' 
          : 'rounded-full p-1 bg-gradient-to-r from-[var(--sky-color)] to-[var(--ground-color)] shadow-[0_0_50px_var(--accent-color)]'
        }
      `}>
        {/* Title Overlay */}
        <div className={`
          absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-6 py-2 pointer-events-none
          ${isDark ? 'bg-black/80 border-b border-red-900/30' : 'hidden'}
        `}>
          <span className="text-[10px] font-mono text-red-600 tracking-widest">SONIC_RELAY_V.09</span>
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
        </div>

        {/* Spotify IFrame */}
        <div className={`${isDark ? 'pt-8 pb-2 px-2 bg-black' : 'rounded-full overflow-hidden bg-black'}`}>
             <iframe 
              style={{borderRadius: isDark ? '0px' : '12px'}} 
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX6J5NfMJS675?utm_source=generator&theme=0" 
              width="100%" 
              height="152" 
              frameBorder="0" 
              allowFullScreen={false} 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className={isDark ? 'opacity-60 grayscale contrast-125' : 'opacity-90'}
            ></iframe>
        </div>

        {/* CRT Overlay for Dark Mode */}
        {isDark && (
          <div className="absolute inset-0 pointer-events-none z-40 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.3),rgba(0,0,0,0.3)_1px,transparent_1px,transparent_3px)] mix-blend-overlay"></div>
        )}
        
        {/* Aura Glow for Light Mode */}
        {!isDark && (
           <div className="absolute inset-0 rounded-full border-4 border-[var(--accent-color)] opacity-20 animate-pulse pointer-events-none"></div>
        )}
      </div>

      <div className="text-center mt-6">
        <h3 className={`text-sm tracking-[0.4em] uppercase font-bold ${isDark ? 'text-[#333]' : 'text-[var(--accent-color)]'}`}>
          {isDark ? 'Signals from the Void' : 'Atmospheric Explorations'}
        </h3>
      </div>
    </section>
  );
};