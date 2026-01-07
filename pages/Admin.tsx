import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuth } from '../lib/useAuth';
import { Trash2, Edit, AlertCircle, Sun, Moon, Archive } from 'lucide-react';

export const Admin: React.FC = () => {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Dashboard State
  const [activeTab, setActiveTab] = useState<'light' | 'dark' | 'projects'>('light');
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Common Fields
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');

  // Specific Fields
  const [category, setCategory] = useState(''); // Light: Chapter Num, Dark: Type
  const [layoutConfig, setLayoutConfig] = useState(''); // Light side customization
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [skills, setSkills] = useState('');

  // Helper to reset form
  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setImage('');
    setBody('');
    setRole('');
    setCompany('');
    setSkills('');
    if (activeTab === 'light') setCategory('01');
    else if (activeTab === 'dark') setCategory('Journal');
    else setCategory('Project');
    setLayoutConfig('');
  };

  // Effect: Fetch posts when user or activeTab changes
  useEffect(() => {
    if (!user) return;

    let q;
    if (activeTab === 'projects') {
      // Fetch projects regardless of side, or where category is Project
      q = query(collection(db, "posts"), where("category", "==", "Project"), orderBy("createdAt", "desc"));
    } else {
      q = query(collection(db, "posts"), where("side", "==", activeTab), orderBy("createdAt", "desc"));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.warn("Index fallback trigger", err);
      // Fallback
      const fbQ = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      getDocs(fbQ).then(snap => {
        const all = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (activeTab === 'projects') {
          setPosts(all.filter((p: any) => p.category === 'Project'));
        } else {
          setPosts(all.filter((p: any) => p.side === activeTab));
        }
      });
    });

    return () => unsubscribe();
  }, [user, activeTab]);

  // Handle Edit Click
  const handleEdit = (post: any) => {
    setEditingId(post.id);
    setTitle(post.title);
    setImage(post.image || '');
    setBody(post.body);
    setCategory(post.category);
    setLayoutConfig(post.layoutConfig || '');
    if (post.category === 'Project') {
      setRole(post.role || '');
      setCompany(post.company || '');
      if (post.skills && Array.isArray(post.skills)) {
        setSkills(post.skills.map((s: any) => `${s.name}:${s.val}`).join(', '));
      } else {
        setSkills('');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      const docData: any = {
        title,
        side: activeTab === 'projects' ? 'shared' : activeTab,
        category: activeTab === 'projects' ? 'Project' : category,
        image,
        body,
        updatedAt: serverTimestamp()
      };

      if (activeTab === 'light') {
        docData.layoutConfig = layoutConfig;
      }

      if (activeTab === 'projects') {
        docData.role = role || 'Engineer';
        docData.company = company || 'Unknown';
        docData.skills = skills.split(',').map(s => {
          const [name, val] = s.split(':').map(i => i.trim());
          return { name: name || s.trim(), val: val || 'Proficient' };
        });
      }

      if (!editingId) {
        docData.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, "posts"), docData);
        console.log("Document written with ID: ", docRef.id);
      } else {
        await updateDoc(doc(db, "posts", editingId), docData);
      }
    } catch (err) {
      console.error(err);
      alert("Transmission Failed");
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Deleting document with ID: ", id);
    if (!window.confirm("CONFIRM DELETION?")) return;
    try {
      await deleteDoc(doc(db, "posts", id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-12 text-center font-mono">LOADING PROTOCOLS...</div>;

  // Login View (Simplified for brevity, kept brutalist style)
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="border border-red-900 p-8 max-w-md w-full bg-[#050000]">
          <h1 className="text-xl text-red-600 font-mono mb-6 tracking-widest text-center">AUTHENTICATION REQUIRED</h1>
          <form onSubmit={async (e) => { e.preventDefault(); try { await signInWithEmailAndPassword(auth, email, password); } catch (e: any) { setError(e.message); } }}>
            <input type="email" placeholder="OPERATOR" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black border border-red-900 text-red-500 p-3 mb-4 focus:outline-none" />
            <input type="password" placeholder="KEY" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-red-900 text-red-500 p-3 mb-6 focus:outline-none" />
            {error && <p className="text-xs text-red-500 mb-4">{error}</p>}
            <button className="w-full bg-red-900 text-black font-bold py-3 hover:bg-red-700">ENTER</button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  const isLight = activeTab === 'light';
  const isProject = activeTab === 'projects';
  const themeColor = isLight ? 'text-gray-900' : 'text-green-500';
  const bgColor = isLight ? 'bg-gray-100' : 'bg-black';
  const borderColor = isLight ? 'border-gray-300' : 'border-green-900';
  const inputBg = isLight ? 'bg-white' : 'bg-black';

  return (
    <div className={`min-h-screen ${bgColor} ${themeColor} font-mono p-4 md:p-12 transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">

        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b pb-4" style={{ borderColor: isLight ? '#ccc' : '#14532d' }}>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">CONTROL_PLANE // {activeTab === 'light' ? 'TREATISE' : activeTab === 'dark' ? 'COSMOS' : 'PROJECTS'}</h1>
            <p className="text-xs opacity-50 mt-1">Select operating frequency below.</p>
          </div>

          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab('light')}
              className={`flex items-center gap-2 px-6 py-2 border transition-all ${activeTab === 'light' ? 'bg-white border-black text-black' : 'border-transparent opacity-50 hover:opacity-100'}`}
            >
              <Sun size={16} /> TREATISE
            </button>
            <button
              onClick={() => setActiveTab('dark')}
              className={`flex items-center gap-2 px-6 py-2 border transition-all ${activeTab === 'dark' ? 'bg-green-900/20 border-green-500 text-green-500' : 'border-transparent opacity-50 hover:opacity-100'}`}
            >
              <Moon size={16} /> COSMOS
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 py-2 border transition-all ${activeTab === 'projects' ? 'bg-blue-900/20 border-blue-500 text-blue-500' : 'border-transparent opacity-50 hover:opacity-100'}`}
            >
              <Archive size={16} /> PROJECTS
            </button>
            <button onClick={() => signOut(auth)} className="text-xs px-4 py-2 border border-red-900 text-red-500 hover:bg-red-900/10 ml-8">
              EXIT
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Form Area */}
          <div className="lg:col-span-2">
            <div className={`p-8 border ${isLight ? 'bg-white border-gray-200 shadow-xl' : 'bg-[#001100] border-green-900 shadow-[0_0_30px_rgba(0,255,0,0.1)]'}`}>
              <h2 className="text-xl font-bold mb-6 pb-2 border-b opacity-70">
                {editingId ? 'EDITING RECORD' : `NEW ${activeTab.toUpperCase()} ENTRY`}
              </h2>

              <form onSubmit={handlePost} className="space-y-6">
                {/* Common: Title */}
                <div>
                  <label className="block text-xs font-bold mb-2">TITLE</label>
                  <input
                    value={title} onChange={e => setTitle(e.target.value)}
                    className={`w-full p-3 border focus:outline-none ${inputBg} ${borderColor}`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Specific: Category */}
                  {activeTab !== 'projects' && (
                    <div>
                      <label className="block text-xs font-bold mb-2">
                        {isLight ? 'CHAPTER NUMBER' : 'CATEGORY'}
                      </label>
                      {isLight ? (
                        <input
                          value={category} onChange={e => setCategory(e.target.value)}
                          placeholder="01"
                          className={`w-full p-3 border focus:outline-none ${inputBg} ${borderColor}`}
                        />
                      ) : (
                        <select
                          value={category} onChange={e => setCategory(e.target.value)}
                          className={`w-full p-3 border focus:outline-none ${inputBg} ${borderColor}`}
                        >
                          <option value="Journal">Journal</option>
                          <option value="Story">Story</option>
                          <option value="Artefact">Artefact</option>
                        </select>
                      )}
                    </div>
                  )}

                  {/* Common: Image */}
                  <div className={activeTab === 'projects' ? 'md:col-span-2' : ''}>
                    <label className="block text-xs font-bold mb-2">IMAGE URL</label>
                    <input
                      value={image} onChange={e => setImage(e.target.value)}
                      placeholder="https://..."
                      className={`w-full p-3 border focus:outline-none ${inputBg} ${borderColor}`}
                    />
                  </div>
                </div>

                {/* Project Specific Fields */}
                {activeTab === 'projects' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold mb-2">ROLE</label>
                      <input
                        value={role} onChange={e => setRole(e.target.value)}
                        className={`w-full p-3 border focus:outline-none ${inputBg} ${borderColor}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2">COMPANY</label>
                      <input
                        value={company} onChange={e => setCompany(e.target.value)}
                        className={`w-full p-3 border focus:outline-none ${inputBg} ${borderColor}`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold mb-2">SKILLS (comma-separated: e.g., React:Proficient, Node:Expert)</label>
                      <input
                        value={skills} onChange={e => setSkills(e.target.value)}
                        className={`w-full p-3 border focus:outline-none ${inputBg} ${borderColor}`}
                      />
                    </div>
                  </div>
                )}

                {/* Light Side Specific: Customization */}
                {isLight && (
                  <div>
                    <label className="block text-xs font-bold mb-2">LAYOUT CONFIG (JSON)</label>
                    <textarea
                      value={layoutConfig} onChange={e => setLayoutConfig(e.target.value)}
                      placeholder='{"align": "center", "font": "serif"}'
                      rows={2}
                      className={`w-full p-3 border focus:outline-none font-mono text-xs ${inputBg} ${borderColor}`}
                    />
                  </div>
                )}

                {/* Common: Body */}
                <div>
                  <label className="block text-xs font-bold mb-2">CONTENT (MARKDOWN)</label>
                  <textarea
                    value={body} onChange={e => setBody(e.target.value)}
                    rows={10}
                    className={`w-full p-3 border focus:outline-none font-mono text-sm ${inputBg} ${borderColor}`}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button type="submit" className={`px-8 py-3 font-bold uppercase tracking-widest transition-colors ${isLight ? 'bg-black text-white hover:bg-gray-800' : 'bg-green-900 text-black hover:bg-green-700'}`}>
                    {editingId ? 'Save Changes' : 'Publish'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="px-4 py-3 text-red-500 border border-red-500 hover:bg-red-500/10 uppercase text-xs font-bold">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle size={20} />
              DATABASE // {activeTab.toUpperCase()}
            </h3>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
              {posts.map(post => (
                <div key={post.id} className={`p-4 border group transition-all cursor-pointer ${editingId === post.id ? 'border-blue-500 opacity-100' : `${borderColor} opacity-60 hover:opacity-100`}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-widest border px-1 opacity-50">
                      {post.category}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(post)}><Edit size={14} /></button>
                      <button onClick={() => handleDelete(post.id)} className="text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <h4 className="font-bold truncate">{post.title}</h4>
                  <p className="text-[10px] mt-1 truncate opacity-50">{post.id}</p>
                </div>
              ))}
              {posts.length === 0 && <div className="opacity-30 italic text-sm">No entries found.</div>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
