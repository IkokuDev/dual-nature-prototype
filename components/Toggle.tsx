import React from 'react';

interface ToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`
        relative px-8 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300
        ${isDark 
          ? 'bg-[#1a0000] text-red-600 border border-red-800 hover:bg-red-900 hover:text-black hover:border-red-600' 
          : 'bg-[#004d4d] text-[#FFD700] border-none hover:bg-[#006666] hover:scale-105 shadow-xl'
        }
      `}
    >
      {isDark ? 'PURGE' : 'ASCEND'}
    </button>
  );
};