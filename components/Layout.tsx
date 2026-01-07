import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toggle } from './Toggle';
import { SonicRelay } from './SonicRelay';

export const Layout: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [animState, setAnimState] = useState<'idle' | 'spaghettify'>('idle');
  const location = useLocation();

  const toggleTheme = () => {
    if (animState !== 'idle') return;

    // Trigger Spaghettification
    setAnimState('spaghettify');

    // Swap Theme when content is invisible/distorted
    setTimeout(() => {
      setIsDark(prev => !prev);
    }, 600);

    // Return to normal
    setTimeout(() => {
      setAnimState('idle');
    }, 800);
  };

  // Sync global CSS variables
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden texture-overlay">

      {/* PERSISTENT LAYERS */}

      {/* Ghost Text (Dark Mode Only) */}
      <div className="ghost-text">
        THE SPEED OF LIGHT IS THE SPEED OF OUR IGNORANCE.
      </div>

      {/* Monolith (Light Mode Only - CSS handles opacity) */}
      <div className="monolith"></div>

      {/* CONTENT LAYER WITH TRANSITION */}
      <div className={`
        relative z-10 w-full min-h-screen gothic-container flex flex-col
        ${animState === 'spaghettify' ? 'spaghettify' : 'normalize'}
      `}>

        <div className="container mx-auto px-6 py-8 md:px-12 lg:px-24 flex-grow flex flex-col">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-12 sticky top-0 py-8 z-50 backdrop-blur-sm border-b border-[var(--border-color)]">
            <a href="/" className="text-3xl md:text-4xl font-bold uppercase burn-text tracking-widest heading-font hover:opacity-80 transition-opacity">
              {isDark ? (
                <span>AHAMEFUNA</span>
              ) : (
                <span>MICHAEL</span>
              )}
            </a>
            <Toggle isDark={isDark} onToggle={toggleTheme} />
          </nav>

          {/* Dynamic Content (Pages) */}
          <main className="flex-grow">
            <Outlet context={{ isDark }} />
          </main>

          {/* Persistent Footer Elements */}
          <div className="mt-24 mb-12">
            <SonicRelay isDark={isDark} />
          </div>

          <footer className="text-center pb-12 pt-12 border-t border-[var(--border-color)]">
            <p className={`text-xs tracking-[0.3em] uppercase opacity-70`}>
              {isDark ? 'THOUGHT BEGETS HERESY.' : 'SHINE ON YOU CRAZY DIAMOND.'}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};