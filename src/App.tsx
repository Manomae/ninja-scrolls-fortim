import React, { useState, useEffect } from 'react';
import { Search, Loader2, Hash, Users, Sparkles, Ghost, Swords, Wind, AlertCircle, Scroll, Plus, Trash2, LogIn, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGiphy } from './hooks/useGiphy';
import { CHARACTERS, CATEGORIES, GiphyGif, FEATURED_GIFS } from './types';
import { auth, signInWithGoogle, logout, db } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// Component: Scroll-themed GIF Card
interface GifCardProps {
  gif: GiphyGif;
  onDelete?: (id: string) => void;
  isCustom?: boolean;
  key?: React.Key;
}
const GifCard = ({ gif, onDelete, isCustom }: GifCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="group relative bg-[#1a1a1a] border-l-4 border-[#ff9c00] rounded-r-lg overflow-hidden shadow-xl cursor-zoom-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={gif.images.fixed_height.url}
        alt={gif.title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4"
          >
            <p className="text-[10px] font-mono text-[#ff9c00] uppercase tracking-widest mb-1 italic">
               {isCustom ? 'Pergaminho Personalizado' : 'Pergaminho Ninja'}
            </p>
            <h3 className="text-white font-bold text-sm line-clamp-2">{gif.title}</h3>
            {onDelete && (
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(gif.id); }}
                className="mt-2 text-red-500 hover:text-red-400 p-1 flex items-center gap-1 text-[10px] font-bold"
              >
                <Trash2 className="w-3 h-3" /> APAGAR
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute top-0 right-0 w-1 h-full bg-[#ff9c00]/30" />
    </motion.div>
  );
};

// Component: Character Badge
interface CharacterBadgeProps {
  character: typeof CHARACTERS[0];
  isActive: boolean;
  onClick: () => void;
  key?: React.Key;
}
const CharacterBadge = ({ character, isActive, onClick }: CharacterBadgeProps) => (
  <motion.button
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300 ${
      isActive 
        ? 'bg-[#ff9c00] text-black shadow-[0_0_15px_rgba(255,156,0,0.5)]' 
        : 'hover:bg-[#2a2a2a] text-gray-400'
    }`}
  >
    <span className="text-xl">{character.icon}</span>
    <span className="font-bold tracking-tight uppercase text-xs">{character.name}</span>
  </motion.button>
);

type Tab = 'destaques' | 'explorar' | 'personalizados';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('destaques');
  const [searchQuery, setSearchQuery] = useState('naruto epic moments');
  const [inputVal, setInputVal] = useState('');
  const { gifs, loading, error } = useGiphy(searchQuery);

  // Authentication State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Custom GIFs Logic
  const [customGifs, setCustomGifs] = useState<GiphyGif[]>([]);
  const [newGifUrl, setNewGifUrl] = useState('');
  const [newGifTitle, setNewGifTitle] = useState('');

  // Handle Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync with Firestore or LocalStorage
  useEffect(() => {
    if (user) {
      // Sync with Firestore
      const q = query(collection(db, 'users', user.uid, 'gifs'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const firestoreGifs = snapshot.docs.map(doc => doc.data() as GiphyGif);
        setCustomGifs(firestoreGifs.sort((a, b) => b.id.localeCompare(a.id)));
      });
      return () => unsubscribe();
    } else {
      // Fallback to LocalStorage
      const saved = localStorage.getItem('ninja_custom_gifs');
      if (saved) {
        setCustomGifs(JSON.parse(saved));
      }
    }
  }, [user]);

  // Persist LocalStorage if not logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem('ninja_custom_gifs', JSON.stringify(customGifs));
    }
  }, [customGifs, user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSearchQuery(inputVal);
      setActiveTab('explorar');
    }
  };

  const addCustomGif = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGifUrl.trim()) return;
    
    const id = Date.now().toString();
    const newGif: GiphyGif = {
      id,
      url: newGifUrl,
      title: newGifTitle || 'Meu Jutsu',
      images: {
        fixed_height: { url: newGifUrl },
        original: { url: newGifUrl }
      },
      isCustom: true
    };
    
    if (user) {
      // Save to Firestore
      try {
        await setDoc(doc(db, 'users', user.uid, 'gifs', id), {
          ...newGif,
          userId: user.uid,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.error("Erro ao salvar no pergaminho das nuvens:", err);
      }
    } else {
      // Save to LocalStorage state
      setCustomGifs([newGif, ...customGifs]);
    }
    
    setNewGifUrl('');
    setNewGifTitle('');
  };

  const deleteCustomGif = async (id: string) => {
    if (user) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'gifs', id));
      } catch (err) {
        console.error("Erro ao queimar o pergaminho:", err);
      }
    } else {
      setCustomGifs(customGifs.filter(g => g.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-[#ff9c00] selection:text-black font-sans">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#ff9c00 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="flex h-screen overflow-hidden relative">
        
        {/* Sidebar */}
        <aside className="w-80 border-r border-[#1a1a1a] bg-[#0c0c0c] flex flex-col p-6 overflow-y-auto z-10 shrink-0">
          <div className="mb-10">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 mb-2"
            >
              <Swords className="text-[#ff9c00] w-6 h-6" />
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white leading-none">
                <span className="text-[#ff9c00]">Ninja</span>ScrollsFortim
              </h1>
            </motion.div>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">Arquivo da Vila da Folha</p>
          </div>

          {/* User Auth Section */}
          <div className="mb-8 p-4 bg-[#1a1a1a]/50 rounded-xl border border-white/5">
            {authLoading ? (
              <div className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-[#2a2a2a]" />
                <div className="h-4 w-24 bg-[#2a2a2a] rounded" />
              </div>
            ) : user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={user.photoURL || ''} alt="Avatar" className="w-10 h-10 rounded-full border border-[#ff9c00]" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-[10px] font-bold text-white leading-none line-clamp-1">{user.displayName}</p>
                    <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">Ninja Elite</p>
                  </div>
                </div>
                <button onClick={logout} className="p-2 text-gray-500 hover:text-white transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-3 py-2.5 bg-white text-black rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-[#ff9c00] transition-all"
              >
                <LogIn className="w-4 h-4" /> Login via Google
              </button>
            )}
          </div>

          <nav className="space-y-2 mb-8">
            <button 
              onClick={() => setActiveTab('destaques')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'destaques' ? 'bg-[#ff9c00] text-black shadow-[0_0_15px_rgba(255,156,0,0.4)]' : 'text-gray-400 hover:bg-[#2a2a2a]'}`}
            >
              <Scroll className="w-4 h-4" /> Pergaminhos Lendários
            </button>
            <button 
              onClick={() => setActiveTab('explorar')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'explorar' ? 'bg-[#ff9c00] text-black shadow-[0_0_15px_rgba(255,156,0,0.4)]' : 'text-gray-400 hover:bg-[#2a2a2a]'}`}
            >
              <Search className="w-4 h-4" /> Invocação Giphy
            </button>
            <button 
              onClick={() => setActiveTab('personalizados')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'personalizados' ? 'bg-[#ff9c00] text-black shadow-[0_0_15px_rgba(255,156,0,0.4)]' : 'text-gray-400 hover:bg-[#2a2a2a]'}`}
            >
              <Plus className="w-4 h-4" /> Selar Novo Gif
            </button>
          </nav>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-gray-500" />
                <h2 className="text-[10px] uppercase tracking-widest font-bold text-gray-600">Personagens</h2>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {CHARACTERS.map((char) => (
                  <CharacterBadge 
                    key={char.name} 
                    character={char} 
                    isActive={activeTab === 'explorar' && searchQuery === char.query}
                    onClick={() => {
                      setSearchQuery(char.query);
                      setActiveTab('explorar');
                    }}
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="mt-auto pt-10">
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-2 border-[#ff9c00]">
              <p className="text-[10px] text-gray-400 leading-relaxed italic">
                "Trabalhe duro e você superará seus limites." — Rock Lee
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Header/Search Area */}
          <header className="p-8 border-b border-[#1a1a1a] bg-[#0c0c0c]/80 backdrop-blur-md z-10">
            <AnimatePresence mode="wait">
              {activeTab === 'explorar' ? (
                <motion.form 
                  key="explorar"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onSubmit={handleSearch} 
                  className="max-w-3xl flex gap-4"
                >
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Invoque GIFs por nome ou jutsu..."
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#ff9c00] transition-all font-medium placeholder:text-gray-600 text-sm text-white"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-[#ff9c00] text-black px-8 rounded-xl font-bold uppercase tracking-tight hover:brightness-110 active:scale-95 transition-all text-xs"
                  >
                    Buscar
                  </button>
                </motion.form>
              ) : activeTab === 'personalizados' ? (
                <motion.form 
                  key="personalizados"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onSubmit={addCustomGif} 
                  className="max-w-3xl space-y-4"
                >
                  <h3 className="text-xl font-bold uppercase italic tracking-tighter text-white">Selar Novo <span className="text-[#ff9c00]">GIF do Pergaminho</span></h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Cole a URL do GIF (ex: https://...)"
                      value={newGifUrl}
                      onChange={(e) => setNewGifUrl(e.target.value)}
                      className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff9c00] transition-all text-sm text-white"
                    />
                    <input
                      type="text"
                      placeholder="Nome do Jutsu"
                      value={newGifTitle}
                      onChange={(e) => setNewGifTitle(e.target.value)}
                      className="w-48 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff9c00] transition-all text-sm text-white"
                    />
                    <button 
                      type="submit"
                      className="bg-[#ff9c00] text-black px-6 rounded-xl font-bold uppercase tracking-tight hover:brightness-110 shadow-[0_0_15px_rgba(255,156,0,0.3)] transition-all text-xs flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Selar
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="destaques"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-2xl font-black tracking-tight uppercase italic text-white">Pergaminhos <span className="text-[#ff9c00]">Lendários</span></h2>
                  </div>
                  <Sparkles className="w-8 h-8 text-[#ff9c00] animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-[#ff9c00]" />
                <div>
                  <h2 className="text-sm font-bold tracking-tight uppercase italic text-gray-400">
                    {activeTab === 'explorar' ? `Resultados: ${searchQuery}` : activeTab === 'destaques' ? 'Coleção de Elite' : 'Sua Própria Coleção'}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase">
                <Wind className="w-3 h-3 animate-pulse" />
                Pergaminho Ativo
              </div>
            </div>
          </header>

          {/* Content Grid Area */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#080808]">
            <AnimatePresence mode="wait">
              {activeTab === 'destaques' && (
                <motion.div 
                  key="grid-destaques"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {FEATURED_GIFS.map((gif) => (
                    <GifCard key={gif.id} gif={gif} />
                  ))}
                </motion.div>
              )}

              {activeTab === 'explorar' && (
                <motion.div 
                  key="grid-explorar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {loading ? (
                    <div className="h-full py-20 flex flex-col items-center justify-center gap-4">
                      <Loader2 className="w-10 h-10 text-[#ff9c00] animate-spin" />
                    </div>
                  ) : error ? (
                    <div className="h-full py-20 flex flex-col items-center justify-center gap-4 text-red-500">
                      <AlertCircle className="w-10 h-10" />
                      <p className="font-bold uppercase tracking-tight">Falha na Invocação</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      <AnimatePresence>
                        {gifs.map((gif) => (
                          <GifCard key={gif.id} gif={gif} />
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'personalizados' && (
                <motion.div 
                  key="grid-personalizados"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {customGifs.length === 0 ? (
                    <div className="h-full py-20 flex flex-col items-center justify-center gap-6 text-gray-600">
                      <Ghost className="w-20 h-20 opacity-10" />
                      <p className="text-xs uppercase tracking-[0.3em] font-bold text-center max-w-xs leading-loose">Seu pergaminho está vazio.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      <AnimatePresence>
                        {customGifs.map((gif) => (
                          <GifCard key={gif.id} gif={gif} isCustom onDelete={deleteCustomGif} />
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2a2a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff9c00;
        }
      `}} />
    </div>
  );
}
