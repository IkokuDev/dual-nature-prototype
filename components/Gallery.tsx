import React from 'react';

interface GalleryProps {
  isDark: boolean;
}

const CAT_IMAGES = [
  "https://picsum.photos/seed/cat1/600/600",
  "https://picsum.photos/seed/cat2/600/800",
  "https://picsum.photos/seed/cat3/800/600",
  "https://picsum.photos/seed/cat4/600/600",
  "https://picsum.photos/seed/cat5/600/800",
  "https://picsum.photos/seed/cat6/800/600",
];

export const Gallery: React.FC<GalleryProps> = ({ isDark }) => {
  return (
    <section className="relative z-10">
      <div className="flex items-center justify-center mb-16">
        {isDark ? (
          <h2 className="text-5xl font-black uppercase tracking-widest burn-text text-center">
            COGITATOR // SCANS
          </h2>
        ) : (
          <h2 className="text-6xl font-thin italic text-center">
            Visual <span className="font-bold text-[var(--accent-color)] not-italic">Artifacts</span>
          </h2>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {CAT_IMAGES.map((src, idx) => (
          <div 
            key={idx}
            className={`
              relative transition-all duration-700 group
              ${isDark 
                ? 'aspect-video border-[6px] border-[#333] bg-black p-1 shadow-2xl' 
                : 'aspect-square rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-4'
              }
            `}
          >
            {/* Image Layer */}
            <div className={`w-full h-full overflow-hidden ${isDark ? '' : 'rounded-full'}`}>
              <img 
                src={src} 
                alt={`Gallery item ${idx}`}
                className={`
                  w-full h-full object-cover
                  ${isDark 
                    ? 'mix-blend-luminosity opacity-40 grayscale contrast-125' 
                    : 'saturate-150'
                  }
                `}
              />
            </div>

            {/* Dark Mode: Warp Feed Overlays */}
            {isDark && (
               <>
                 <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)_1px,transparent_1px,transparent_2px)] opacity-50 pointer-events-none"></div>
                 <div className="absolute top-2 left-2 right-2 flex justify-between font-mono text-[10px] text-red-600 tracking-widest font-bold">
                    <span className="animate-pulse">REC ●</span>
                    <span>CAM_0{idx + 1}</span>
                 </div>
                 <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-red-600 font-mono text-xs font-bold bg-black/80 px-2 py-1 inline-block mb-1 border border-red-900">
                       SIGNAL STRENGTH: WEAK
                    </div>
                    <div className="text-[#555] font-mono text-[9px] uppercase">
                       7 DAYS UNTIL COLLAPSE
                    </div>
                 </div>
               </>
            )}
            
            {/* Light Mode: Reflection */}
            {!isDark && (
               <div 
                className="absolute -bottom-12 left-0 right-0 h-full opacity-30 rounded-full blur-sm pointer-events-none transform scale-y-[-1]"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'cover',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'
                }}
               ></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};