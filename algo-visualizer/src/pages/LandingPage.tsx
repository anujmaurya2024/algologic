import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, BookOpen, Cpu, Network, ChevronRight, History } from 'lucide-react';
import { ALL_TOPICS } from '../engine/registry';
import { motion, AnimatePresence } from 'framer-motion';
import type { SubjectCategory } from '../engine/types';

const CATEGORIES: SubjectCategory[] = ['Linear', 'Hierarchical', 'Networked', 'Logic', 'Optimization', 'System'];

export function LandingPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SubjectCategory | 'All'>('All');
  const [aiTopics, setAiTopics] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/visualizations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAiTopics(data);
        }
      })
      .catch(err => console.error('Error fetching AI topics:', err));
  }, []);

  const filteredOfficial = ALL_TOPICS.filter(t => {
    const matchesQuery = t.title.toLowerCase().includes(query.toLowerCase()) ||
                        t.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const filteredAI = aiTopics.filter(t => {
    const matchesQuery = t.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const totalResults = filteredOfficial.length + filteredAI.length;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-6 md:p-12 relative overflow-x-hidden pb-32">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.05),transparent_50%)] pointer-events-none" />

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full text-center mb-16 relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="text-white" size={20} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">AlgoLogic</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none text-center">
          Visualize. Understand. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Master Every Algorithm.
          </span>
        </h1>
        
        <div className="relative max-w-xl mx-auto mb-12">
          <div className="glass rounded-2xl border border-white/10 p-1 shadow-2xl focus-within:border-indigo-500/50 transition-all duration-500 bg-white/5 backdrop-blur-3xl group">
            <div className="flex items-center px-4 gap-3">
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400" />
              <input
                type="text"
                placeholder="Search algorithms, data structures..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none py-4 text-sm focus:outline-none placeholder:text-slate-600 text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                selectedCategory === cat 
                ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-white/5 border-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {query && (
        <div className="max-w-7xl w-full mb-8 px-4 relative z-10 text-slate-500 text-sm font-medium">
          Showing {totalResults} results for "{query}"
        </div>
      )}

      {/* Official Modules Section */}
      {filteredOfficial.length > 0 && (
        <div className="max-w-7xl w-full mb-12 relative z-10">
          <div className="flex items-center gap-3 mb-6 px-4">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-black uppercase tracking-widest text-slate-400">Official Library</h2>
            <div className="h-px flex-1 bg-white/5 ml-4" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredOfficial.map((topic, i) => (
                <TopicCard key={topic.id} topic={topic} i={i} onClick={() => navigate(`/visualize/${topic.id}`)} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* AI Gallery Section */}
      {filteredAI.length > 0 && (
        <div className="max-w-7xl w-full mb-12 relative z-10">
          <div className="flex items-center gap-3 mb-6 px-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-black uppercase tracking-widest text-slate-400">AI Magic Gallery</h2>
            <div className="h-px flex-1 bg-white/5 ml-4" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredAI.map((topic, i) => (
                <TopicCard 
                  key={topic.id} 
                  topic={topic} 
                  i={i} 
                  isAI={true}
                  onClick={() => navigate(`/visualize/${topic.id}`)} 
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {totalResults === 0 && (
        <div className="py-20 text-center space-y-8 max-w-md mx-auto relative z-10">
          <div className="space-y-4">
            <History className="w-12 h-12 text-slate-800 mx-auto" />
            <p className="text-slate-400 font-medium">No official or AI content found for "{query}"</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/visualize/ai-${query.toLowerCase().replace(/\s+/g, '-')}`)}
            className="w-full p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 border border-white/10 shadow-2xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">Generate with AI Magic</h4>
                <p className="text-[10px] text-white/60">Synthesis on-the-fly for "{query}"</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
          </motion.button>

          <button onClick={() => setQuery('')} className="text-indigo-400 text-sm hover:underline">Clear search</button>
        </div>
      )}
    </div>
  );
}

function TopicCard({ topic, i, onClick, isAI = false }: { topic: any, i: number, onClick: () => void, isAI?: boolean }) {
  const bgColor = topic.color || (isAI ? '#6366f1' : '#1e293b');
  
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: i * 0.02 }}
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
      className={`group relative flex flex-col p-6 text-left hover:brightness-110 transition-all duration-500 overflow-hidden rounded-2xl border border-white/10 shadow-xl`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity transform group-hover:scale-125 duration-700 text-white">
         {topic.category === 'System' ? <Cpu size={80} /> : topic.category === 'Logic' ? <Sparkles size={80} /> : <Network size={80} />}
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        {isAI && (
          <span className="bg-white/20 text-white px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-widest border border-white/20">
            AI Generated
          </span>
        )}
        <span className="bg-black/20 text-white/80 px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-widest border border-white/10">
          {topic.subject}
        </span>
        <span className="text-[10px] text-white/50 font-bold">• {topic.category}</span>
      </div>

      <h3 className="text-lg font-bold text-white mb-2">
        {topic.title}
      </h3>
      <p className="text-xs text-white/60 leading-relaxed mb-6 line-clamp-2">
        {topic.description}
      </p>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex gap-2">
          <span className="text-[9px] font-mono text-white/40">T: {topic.complexity?.time || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
          {isAI ? 'REPLAY' : 'CLICK TO VIEW'} <ChevronRight size={12} />
        </div>
      </div>
    </motion.button>
  );
}

