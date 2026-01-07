import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link } from 'react-router-dom';

interface LogEntry {
  id: string;
  title: string;
  category: string;
  date: any; // Firestore timestamp
  excerpt: string; // We'll just take first 100 chars of body
}

interface ShapleyLogsProps {
  isDark: boolean;
}

// Fallback data if Firebase isn't configured yet
const MOCK_LOGS = [
  { 
    id: '1',
    title: "The Teleportation Success", 
    category: "Log",
    date: { seconds: 1700000000 },
    excerpt: "Molecular cohesion stable. The Golden Sun feels warmer here. We have arrived at the coordinates provided by the ancients..." 
  },
  { 
    id: '2',
    title: "The Shift in the Stars", 
    category: "Manifesto",
    date: { seconds: 1700086400 },
    excerpt: "Constellations are drifting. The sky color is wrong. It bleeds into the terracotta. I checked the nav-computer..." 
  },
];

export const ShapleyLogs: React.FC<ShapleyLogsProps> = ({ isDark }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const fetched = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            excerpt: doc.data().body.substring(0, 120) + "..."
          }));
          setLogs(fetched);
        } else {
          setLogs(MOCK_LOGS);
        }
      } catch (e) {
        console.warn("Firebase not connected or empty, using mocks.", e);
        setLogs(MOCK_LOGS);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <section className="max-w-4xl mx-auto py-12 relative z-20">
      <div className="text-center mb-16">
         <span className={`inline-block px-3 py-1 text-xs font-bold tracking-[0.3em] uppercase mb-4 border ${isDark ? 'border-red-900 text-red-600 font-mono' : 'border-[var(--accent-color)] text-[var(--accent-color)]'}`}>
          {isDark ? 'ACCESSING MAINFRAME...' : 'Journal Entries'}
        </span>
        <h2 className={`text-4xl md:text-5xl font-bold uppercase ${isDark ? 'burn-text font-mono tracking-tighter' : 'tracking-widest font-heading'}`}>
          {isDark ? 'TERMINAL_LOGS // SHAPLEY' : 'Afrofuturist Manifestos'}
        </h2>
      </div>

      <div className="space-y-12">
        {logs.map((log) => (
          <Link to={`/article/${log.id}`} key={log.id} className="block group">
            <div className={`
              relative p-8 transition-all duration-500
              ${isDark 
                ? 'bg-black border-l-4 border-red-900 font-mono shadow-[0_0_15px_rgba(255,0,0,0.1)] hover:bg-[#110000]' 
                : 'bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[var(--border-color)] rounded-sm hover:translate-x-2 shadow-lg hover:bg-[rgba(255,255,255,0.1)]'
              }
            `}>
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className={`text-2xl font-bold ${isDark ? 'text-red-600 group-hover:text-red-500' : 'text-white group-hover:text-[var(--accent-color)]'}`}>
                  {isDark ? `> ${log.title.toUpperCase()}` : log.title}
                </h3>
                <span className={`text-sm mt-2 md:mt-0 ${isDark ? 'text-red-800' : 'text-[var(--accent-color)]'} font-bold tracking-widest`}>
                  {isDark ? `T-MINUS ${Math.floor(Math.random() * 10)} DAYS` : new Date(log.date.seconds * 1000).toLocaleDateString()}
                </span>
              </div>

              {/* Content Summary */}
              <p className={`leading-relaxed text-lg ${isDark ? 'text-red-500/80' : 'text-gray-200 font-light'}`}>
                {log.excerpt}
                <span className={`ml-2 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-red-600' : 'text-[var(--accent-color)]'}`}>
                  {isDark ? '[DECRYPT FILE]' : 'Read More →'}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};