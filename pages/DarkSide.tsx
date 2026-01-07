import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Hero } from '../components/Hero';
import { Resume } from '../components/Resume'; // Projects are shared
import { useNavigate } from 'react-router-dom';
import { FileText, Book, Anchor } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    body: string;
    image?: string;
    category: 'Journal' | 'Story' | 'Artefact' | string;
    [key: string]: any;
}

export const DarkSide: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDarkPosts = async () => {
            try {
                const q = query(
                    collection(db, "posts"),
                    where("side", "==", "dark"),
                    orderBy("createdAt", "desc")
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
                setPosts(data);
            } catch (err) {
                console.error("Failed to fetch dark side posts", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDarkPosts();
    }, []);

    const filteredPosts = activeCategory === 'All'
        ? posts
        : posts.filter(p => p.category === activeCategory);

    return (
        <div className="space-y-32 animate-fadeIn text-green-500/80">
            <Hero isDark={true} />

            {/* Cosmic Horror Archive */}
            <section className="container mx-auto px-4 min-h-[50vh]">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-green-900 pb-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-red-600 burn-text">
                            Archive // Restricted
                        </h2>
                        <p className="text-xs font-mono mt-2 tracking-widest text-green-700">
                            CLEARANCE: ULTRAVIOLET
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-4 mt-8 md:mt-0 font-mono text-xs">
                        {['All', 'Journal', 'Story', 'Artefact'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`
                            uppercase tracking-widest px-3 py-1 border transition-all
                            ${activeCategory === cat
                                        ? 'border-red-600 text-red-600 bg-red-900/10'
                                        : 'border-green-900 text-green-700 hover:border-green-500 hover:text-green-500'}
                        `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="font-mono text-center animate-pulse text-red-900">DECRYPTING...</div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredPosts.map(post => (
                            <div
                                key={post.id}
                                onClick={() => navigate(`/article/${post.id}`)}
                                className="border border-green-900 bg-[#050f05] p-6 hover:border-red-900 transition-colors cursor-pointer group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 bg-green-900/20 px-2 py-1 text-[10px] uppercase font-bold tracking-widest group-hover:bg-red-900/20 group-hover:text-red-500 transition-colors">
                                    {post.category}
                                </div>

                                <div className="flex items-start gap-4 mb-4">
                                    {post.category === 'Journal' && <FileText className="text-green-700 mt-1" size={20} />}
                                    {post.category === 'Story' && <Book className="text-green-700 mt-1" size={20} />}
                                    {post.category === 'Artefact' && <Anchor className="text-green-700 mt-1" size={20} />}

                                    <h3 className="text-xl font-bold font-mono tracking-tight group-hover:text-red-500 transition-colors">
                                        {post.title}
                                    </h3>
                                </div>

                                <p className="font-mono text-sm opacity-60 line-clamp-3 mb-4 group-hover:opacity-80">
                                    {post.body}
                                </p>

                                <div className="text-[10px] uppercase tracking-[0.2em] text-green-800 group-hover:text-red-900 transition-colors">
                                    Click to Expand Data
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border border-green-900/30 p-12 text-center">
                        <p className="font-mono text-green-900 tracking-widest uppercase">
                            NO ANOMALIES DETECTED IN THIS SECTOR.
                        </p>
                    </div>
                )}
            </section>

            {/* Shared Resume (Projects) adapted for dark mode by component itself */}
            <Resume isDark={true} />
        </div>
    );
};
