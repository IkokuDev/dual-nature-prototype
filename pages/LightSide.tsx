import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Hero } from '../components/Hero';
import { Resume } from '../components/Resume';
import { useNavigate } from 'react-router-dom';

interface Post {
    id: string;
    title: string;
    body: string;
    image?: string;
    category?: string;
    createdAt: any;
    [key: string]: any;
}

export const LightSide: React.FC = () => {
    const [chapters, setChapters] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                // Query for posts with type 'chapter' or side 'light'
                // Currently assuming we will update Admin to save these fields
                // For now, we can perhaps filter or just fetch all and filter in memory if schema isn't ready
                // But let's write the query we WANT.
                const q = query(
                    collection(db, "posts"),
                    where("side", "==", "light"),
                    orderBy("createdAt", "desc")
                );

                // Fallback for current data (if any) or handle empty
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
                setChapters(data);
            } catch (err) {
                console.error("Failed to fetch light side chapters", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChapters();
    }, []);

    return (
        <div className="space-y-24 animate-fadeIn">
            <Hero isDark={false} />
            {/* Shared Resume/Projects Section */}
            <Resume isDark={false} />

            {/* Treatise Section */}
            <section className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-4xl font-bold uppercase tracking-widest text-[#333]">The Treatise</h2>
                    <div className="h-px bg-[#333] flex-grow opacity-30"></div>
                </div>

                {loading ? (
                    <p className="opacity-50 tracking-widest">Loading archives...</p>
                ) : chapters.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {chapters.map(chapter => (
                            <article
                                key={chapter.id}
                                className="group cursor-pointer"
                                onClick={() => navigate(`/article/${chapter.id}`)}
                            >
                                {chapter.image && (
                                    <div className="overflow-hidden mb-6 border border-[#333]/10">
                                        <img
                                            src={chapter.image}
                                            alt={chapter.title}
                                            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                                        />
                                    </div>
                                )}
                                <div className="flex items-baseline justify-between border-b border-[#333]/20 pb-2 mb-4">
                                    <span className="text-xs font-bold tracking-[0.2em] opacity-50">CHAPTER // {chapter.category || '01'}</span>
                                    <span className="text-xs font-serif italic text-gray-500">
                                        {chapter.createdAt?.toDate ? new Date(chapter.createdAt.toDate()).toLocaleDateString() : 'Unknown Date'}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-[#555] transition-colors">
                                    {chapter.title}
                                </h3>
                                <p className="font-serif text-gray-600 line-clamp-3 leading-relaxed">
                                    {chapter.body}
                                </p>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 border border-dashed border-[#333]/20">
                        <h3 className="font-serif italic text-xl text-gray-500">The archives are empty.</h3>
                        <p className="text-xs uppercase tracking-widest mt-2 opacity-50">No chapters written yet.</p>
                    </div>
                )}
            </section>


        </div>
    );
};
