import React from 'react';

interface ProjectCardProps {
    title: string;
    role: string;
    company: string;
    description: string;
    isDark: boolean;
    skills: { name: string; val: string }[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, role, company, description, isDark, skills }) => {
    return (
        <div className={`
      relative p-8 transition-all duration-500 overflow-hidden group
      ${isDark
                ? 'bg-[#050000] border border-[#330000] hover:border-red-900'
                : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-[var(--accent-color)] backdrop-blur-sm'
            }
    `}>
            {/* Void Scheme: Grid Overlay */}
            {isDark && (
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(50,0,0,0.1),rgba(50,0,0,0.1)_1px,transparent_1px,transparent_20px)] pointer-events-none opacity-20"></div>
            )}

            <div className="relative z-10">
                <h3 className={`text-2xl mb-2 font-bold heading-font burn-text ${isDark ? 'uppercase tracking-widest' : ''}`}>
                    {title}
                </h3>
                <div className="flex items-center gap-2 mb-6">
                    <span className={`text-xs font-bold px-2 py-0.5 ${isDark ? 'bg-red-900/30 text-red-500 border border-red-900' : 'bg-[var(--accent-color)] text-black'}`}>
                        {role}
                    </span>
                    <span className="opacity-50 text-sm">@ {company}</span>
                </div>

                <p className="text-lg leading-relaxed opacity-90 font-light mb-8">
                    {description}
                </p>

                {/* Skills/Tech Spec */}
                <div className="mt-auto">
                    <div className={`text-[10px] font-mono mb-3 uppercase opacity-50 ${isDark ? 'tracking-[0.2em]' : ''}`}>
                        System Specifications
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <span
                                key={i}
                                className={`
                  text-xs px-2 py-1 border 
                  ${isDark
                                        ? 'border-red-900/50 text-red-400 font-mono'
                                        : 'border-[var(--accent-color)] text-[var(--accent-color)] opacity-80'
                                    }
                `}
                            >
                                {skill.name} <span className="opacity-50">| {skill.val}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hover Effect: Corner Brackets */}
            <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-all duration-300 ${isDark ? 'border-red-600' : 'border-[var(--accent-color)]'} opacity-0 group-hover:opacity-100`}></div>
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-all duration-300 ${isDark ? 'border-red-600' : 'border-[var(--accent-color)]'} opacity-0 group-hover:opacity-100`}></div>
        </div>
    );
};
