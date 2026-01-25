import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import ReactMarkdown from 'react-markdown';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';

const ProjectDetail: React.FC = () => {
    const { id } = useParams();
    const { isDark } = useOutletContext<{ isDark: boolean }>();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, "posts", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProject(docSnap.data());
                }
            } catch (e) {
                console.error("Error fetching project:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) return <div className="text-center py-20 animate-pulse font-mono">LOADING PROJECT DATA...</div>;
    if (!project) return <div className="text-center py-20 font-mono text-red-500">PROJECT NOT FOUND IN ARCHIVES.</div>;

    const bgStyle = isDark ? 'bg-black text-gray-300' : 'bg-white text-gray-800';
    const accentColor = isDark ? 'text-red-500' : 'text-blue-600';
    const borderColor = isDark ? 'border-red-900' : 'border-gray-200';

    return (
        <article className={`min-h-screen pb-24 ${bgStyle} animate-fadeIn`}>
            {/* Navigation */}
            <div className="container mx-auto px-6 pt-12 mb-8">
                <Link
                    to="/"
                    className={`
                inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors
                ${isDark ? 'text-red-600 hover:text-red-400' : 'text-gray-500 hover:text-black'}
            `}
                >
                    <ArrowLeft size={14} /> Return to {isDark ? 'Sector' : 'Portfolio'}
                </Link>
            </div>

            {/* Hero Header */}
            <div className="container mx-auto px-6 mb-16">
                <div className="max-w-4xl">
                    <span className={`block text-xs font-mono mb-4 opacity-50 ${isDark ? 'text-red-500' : 'text-blue-500'}`}>
                        PROJECT ID: {id?.toUpperCase()}
                    </span>
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${isDark ? 'font-mono uppercase tracking-tighter text-white' : 'font-serif text-gray-900'}`}>
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 items-center text-sm mb-8">
                        <span className={`px-3 py-1 border ${isDark ? 'border-red-900 text-red-500' : 'bg-gray-100 text-gray-700 rounded-full'}`}>
                            {project.role}
                        </span>
                        <span className="opacity-50">@ {project.company}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mb-12">
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-3 font-bold border-2 transition-all hover:-translate-y-1 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}
                            >
                                <Github size={18} /> VIEW CODE
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-3 font-bold transition-all hover:-translate-y-1 ${isDark ? 'bg-red-900 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            >
                                <ExternalLink size={18} /> LIVE DEMO
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Showcase */}
            {project.image && (
                <div className="w-full h-[50vh] md:h-[70vh] relative mb-16 overflow-hidden bg-gray-900">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center opacity-90"
                    />
                    {isDark && <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay"></div>}
                </div>
            )}

            {/* Content & Specs */}
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <div className={`prose prose-lg ${isDark ? 'prose-invert prose-p:font-mono prose-p:text-gray-400' : 'prose-stone prose-headings:font-serif'} max-w-none`}>
                        <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDark ? 'text-red-600' : 'text-gray-400'}`}>
                            Project Overview
                        </h3>
                        <ReactMarkdown>{project.body}</ReactMarkdown>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className={`sticky top-24 p-8 border ${isDark ? 'border-red-900/30 bg-[#050000]' : 'border-gray-200 bg-gray-50'}`}>
                        <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDark ? 'text-red-500' : 'text-gray-900'}`}>
                            Tech Stack
                        </h3>
                        <div className="space-y-4">
                            {project.skills && project.skills.map((skill: any, i: number) => (
                                <div key={i} className="flex justify-between items-center pb-2 border-b border-gray-700/10">
                                    <span className="font-bold">{skill.name}</span>
                                    <span className="text-xs opacity-60">{skill.val}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-700/10 opacity-50 text-xs">
                            <p>DEPLOYED: {project.createdAt ? new Date(project.createdAt.seconds * 1000).toLocaleDateString() : 'UNKNOWN'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectDetail;
