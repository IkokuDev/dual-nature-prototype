import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProjectCard } from './ProjectCard';

interface ResumeProps {
  isDark: boolean;
}

export const Resume: React.FC<ResumeProps> = ({ isDark }) => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("category", "==", "Project"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched Projects:', fetched);
      setProjects(fetched);
    }, (error) => {
      console.error("Error fetching projects: ", error);
    });

    return () => unsubscribe();
  }, []);

  const content = {
    light: {
      header: "The Architect",
      title: "AI Architect of the Pre-Collapse",
      role: "Solutions Strategist",
      company: "Nakachi Consulting",
      experience: "Designing the financial infrastructure for the next century. Merging ancient trade routes with high-frequency algorithmic liquidity pools.",
      skills: [
        { name: "Interstellar Communication", val: "IELTS 7.5/9" },
        { name: "Fintech Architecture", val: "Expert" },
        { name: "Python / Data Science", val: "Advanced" },
        { name: "React / MERN", val: "Proficient" }
      ],
      id: "MK-2024-SOLAR"
    },
    dark: {
      header: "The Warden",
      title: "System Warden of the Attractor",
      role: "HIGH LORD OF TERRA",
      company: "ORDO HERETICUS",
      experience: "Purging corrupt data streams from the Noosphere. Constructing cathedral-class firewalls to contain the logic-scrap code of the Dark Mechanicvm.",
      skills: [
        { name: "Psionic Resilience", val: "UNBOUND" },
        { name: "Warp Manipulation", val: "HERETICAL" },
        { name: "Necron Glyphs", val: "NATIVE" },
        { name: "Neural Subjugation", val: "TOTAL" }
      ],
      id: "EXCOMMUNICATE TRAITORIS"
    }
  };

  const current = isDark ? content.dark : content.light;

  return (
    <section className="max-w-6xl mx-auto z-20 relative">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b-2 border-[var(--border-color)] pb-6">
        <h2 className={`text-5xl md:text-7xl font-bold uppercase burn-text ${isDark ? 'tracking-tighter' : 'tracking-normal italic'}`}>
          {current.header}
        </h2>
        <span className="font-mono opacity-50 text-xl mt-4 md:mt-0 tracking-widest">{current.id}</span>
      </div>

      <div className="grid grid-cols-1 gap-16">
        {/* Main Persona Card */}
        <ProjectCard
          title={current.title}
          role={current.role}
          company={current.company}
          description={current.experience}
          skills={current.skills}
          isDark={isDark}
        />

        {/* Dynamic Project Cards */}
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            role={project.role || 'Engineer'}
            company={project.company || 'Personal'}
            description={project.body} // Using body as description for projects
            skills={project.skills || []}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  );
};