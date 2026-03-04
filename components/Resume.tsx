import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProjectCard } from './ProjectCard';

interface ResumeProps {
  isDark: boolean;
}

export const Resume: React.FC<ResumeProps> = ({ isDark }) => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("category", "==", "Project"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Fetched Projects:', fetched);
        setProjects(fetched);
      } catch (err) {
        console.warn("Index fallback triggered for projects", err);
        // Fallback: fetch all posts, filter in memory
        try {
          const fallbackQ = query(collection(db, "posts"), orderBy("createdAt", "desc"));
          const snap = await getDocs(fallbackQ);
          const all = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const filtered = all.filter((p: any) => p.category === 'Project');
          console.log('Fallback fetched Projects:', filtered);
          setProjects(filtered);
        } catch (fallbackErr) {
          const rawSnap = await getDocs(collection(db, "posts"));
          const all = rawSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const filtered = all.filter((p: any) => p.category === 'Project');
          console.log('Raw fallback fetched Projects:', filtered);
          setProjects(filtered);
        }
      }
    };

    fetchProjects();
  }, []);

  const content = {
    light: {
      header: "Software Architect",
      title: "CTO / AI & Fintech Solutions Engineer",
      role: "Solutions Strategist",
      company: "visionFotge LTD",
      experience: "Building the Future.",
      skills: [
        { name: "Interstellar Communication", val: "IELTS 7.5/9" },
        { name: "Fintech Architecture", val: "Expert" },
        { name: "Python / Data Science", val: "Advanced" },
        { name: "React / MERN / PERN ", val: "Expert" },
        { name: "CI/CD Workflows", val: "Expert" },
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
          id={current.id}
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
            id={project.id}
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