import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import ReactMarkdown from 'react-markdown';

// Typewriter Hook for Dark Mode
const useTypewriter = (text: string, speed: number = 20, active: boolean) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    if (!active) {
      setDisplayedText(text);
      return;
    }
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, active]);
  return displayedText;
};

export const Article: React.FC = () => {
  const { id } = useParams();
  const { isDark } = useOutletContext<{ isDark: boolean }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      // Mock data handling if Firebase fails (for demo)
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          // Fallback mock
          setPost({
             title: "The Reality of the Attractor",
             category: "Classified",
             image: "https://picsum.photos/seed/warp/1200/600",
             date: { seconds: 1700086400 },
             body: "Gravity is inverting. The pillars are growing from the ground up. \n\nWe are not explorers; we are fuel. The geometry of this place defies Euclid. I looked into the monitor and saw the event horizon. The user interface is melting. My reflection in the screen has no eyes.\n\nEnd of transmission."
          });
        }
      } catch (e) {
        console.log("Using fallback content");
         setPost({
             title: "The Reality of the Attractor",
             category: "Classified",
             image: "https://picsum.photos/seed/warp/1200/600",
             date: { seconds: 1700086400 },
             body: "Gravity is inverting. The pillars are growing from the ground up. \n\nWe are not explorers; we are fuel. The geometry of this place defies Euclid. I looked into the monitor and saw the event horizon. The user interface is melting. My reflection in the screen has no eyes.\n\nEnd of transmission."
          });
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  // Hook for typewriter
  const typewrittenBody = useTypewriter(post?.body || '', 10, isDark);

  if (loading) return <div className="text-center py-20 animate-pulse">LOADING DATA STREAM...</div>;
  if (!post) return <div className="text-center py-20">DATA CORRUPTED. FILE NOT FOUND.</div>;

  return (
    <article className="min-h-screen relative animate-fade-in pb-20">
      <div className="mb-8">
        <Link to="/" className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-red-600 hover:text-red-400' : 'text-[var(--accent-color)] hover:text-white'}`}>
           ← Return to {isDark ? 'Terminal' : 'Archive'}
        </Link>
      </div>

      {/* Hero Image */}
      {post.image && (
        <div className={`w-full h-64 md:h-96 overflow-hidden mb-12 ${isDark ? 'border-y-4 border-red-900 grayscale contrast-125' : 'rounded-lg shadow-2xl'}`}>
          <img src={post.image} alt="Cover" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Mode A: High-Sun Magazine Layout */}
      {!isDark && (
        <div className="max-w-3xl mx-auto bg-[#fdfaf5] text-[#1a1a1a] p-12 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative">
          <div className="w-20 h-1 bg-[var(--ground-color)] mb-8"></div>
          <span className="block text-sm font-bold tracking-[0.3em] uppercase text-[var(--ground-color)] mb-4">{post.category}</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">{post.title}</h1>
          <div className="flex items-center text-xs font-bold uppercase tracking-widest opacity-50 mb-12 border-b border-gray-300 pb-8">
            <span>By Michael Ikoku</span>
            <span className="mx-4">•</span>
            <span>{new Date(post.date.seconds * 1000).toLocaleDateString()}</span>
          </div>
          <div className="prose prose-lg prose-stone font-serif leading-loose">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Mode B: Classified File Layout */}
      {isDark && (
        <div className="max-w-4xl mx-auto border border-red-900 bg-black p-8 md:p-12 relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none opacity-10 whitespace-nowrap">
             <span className="text-[10rem] font-black text-red-900 font-mono">TOP SECRET</span>
          </div>

          <div className="border-b border-red-900 pb-4 mb-8 flex justify-between items-end font-mono text-red-600">
            <div>
              <p className="text-xs">CLASSIFIED: LEVEL 5</p>
              <h1 className="text-2xl md:text-4xl font-bold uppercase mt-2">{post.title}</h1>
            </div>
            <div className="text-right text-xs">
              <p>ID: {id?.substring(0,6).toUpperCase()}</p>
              <p>DATE: [REDACTED]</p>
            </div>
          </div>

          <div className="font-mono text-red-500 text-lg leading-relaxed whitespace-pre-line relative z-10">
            {typewrittenBody}
            <span className="animate-pulse inline-block w-3 h-5 bg-red-500 ml-1 align-middle"></span>
          </div>
        </div>
      )}
    </article>
  );
};