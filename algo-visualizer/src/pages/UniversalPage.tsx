import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useVisualizerStore } from '../store/useVisualizerStore';
import { ALL_TOPICS } from '../engine/registry';
import { getQuickSortSteps, generateRandomArray } from '../algorithms/sorting/quickSort';
import { getFCFSSteps } from '../algorithms/os/fcfs';
import { getBubbleSortSteps } from '../algorithms/sorting/bubbleSort';
import { getLinearSearchSteps } from '../algorithms/searching/linearSearch';
import { getBinarySearchSteps } from '../algorithms/searching/binarySearch';
import { getLRUSteps } from '../algorithms/os/lru';
import { getCacheMappingSteps } from '../algorithms/coa/cacheMapping';
import { getLinkedListSteps } from '../algorithms/dsa/linkedList';
import { getBSTSteps } from '../algorithms/dsa/bst';
import { getHashTableSteps } from '../algorithms/dsa/hashTable';
import { getStackSteps, getQueueSteps } from '../algorithms/dsa/stackQueue';
import { getAVLSteps } from '../algorithms/dsa/avlTree';
import { getDijkstraSteps } from '../algorithms/dsa/dijkstra';
import { getHeapSteps } from '../algorithms/dsa/heap';
import { getTCPHandshakeSteps } from '../algorithms/networking/tcpHandshake';
import { getRoundRobinSteps } from '../algorithms/os/roundRobin';
import { generateAlgorithmVisuals } from '../engine/aiService';
import { UniversalOven } from '../components/visualizer/UniversalOven';

import { PseudoCode } from '../components/codeView/PseudoCode';
import { StreamingExplanation } from '../components/explanation/StreamingExplanation';

import { PlaybackControls } from '../components/controls/PlaybackControls';
import type { SubjectCategory, EngineStep } from '../engine/types';
import { Search, ChevronLeft, Layout, Cpu, Box } from 'lucide-react';

const CATEGORIES: SubjectCategory[] = ['Linear', 'Hierarchical', 'Networked', 'Logic', 'Optimization', 'System'];

export function UniversalPage() {

  const { topicId } = useParams();
  const navigate = useNavigate();
  const { activeModule, initializeModule, getCurrentStep } = useVisualizerStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [codeMode, setCodeMode] = useState<'pseudo' | 'java'>('pseudo');

  const filteredModules = ALL_TOPICS.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedModules = CATEGORIES.reduce((acc, cat) => {
    const mods = filteredModules.filter(m => m.category === cat);
    if (mods.length > 0) acc[cat] = mods;
    return acc;
  }, {} as Record<SubjectCategory, typeof ALL_TOPICS>);

  const switchModule = async (moduleId: string, customTopic?: string) => {
    setSearchQuery('');
    
    let meta = ALL_TOPICS.find(m => m.id === moduleId);
    
    // AI Generation Path
    if (!meta && moduleId.startsWith('ai-')) {
      const topicName = customTopic || moduleId.replace('ai-', '').replace(/-/g, ' ');
      const aiContent = await generateAlgorithmVisuals(topicName);
      initializeModule(aiContent.metadata, aiContent.steps);
      if (topicId !== moduleId) {
        navigate(`/visualize/${moduleId}`);
      }
      return;
    }

    if (!meta) return;

    let steps: EngineStep[] = [];

    if (moduleId === 'quick-sort') {
      const arr = generateRandomArray(10);
      steps = getQuickSortSteps(arr);
    } else if (moduleId === 'bubble-sort') {
      const arr = generateRandomArray(10);
      steps = getBubbleSortSteps(arr);
    } else if (moduleId === 'linear-search') {
      const arr = generateRandomArray(10);
      steps = getLinearSearchSteps(arr, arr[Math.floor(Math.random() * arr.length)]);
    } else if (moduleId === 'binary-search') {
      const arr = generateRandomArray(10);
      const sorted = [...arr].sort((a, b) => a - b); // Reverted to original correct line
      steps = getBinarySearchSteps(sorted, sorted[Math.floor(Math.random() * sorted.length)]);
    } else if (moduleId === 'fcfs-scheduling') {
      const processes = [
        { id: 'P1', arrival: 0, burst: 5 },
        { id: 'P2', arrival: 2, burst: 3 },
        { id: 'P3', arrival: 4, burst: 1 },
      ];
      steps = getFCFSSteps(processes);
    } else if (moduleId === 'lru-page-replacement') {
      const requests = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3];
      steps = getLRUSteps(requests, 3);
      setCodeMode('java');
    } else if (moduleId === 'direct-cache-mapping') {
      const addresses = [10, 22, 10, 40, 52, 10];
      steps = getCacheMappingSteps(addresses, 8);
      setCodeMode('java');
    } else if (moduleId === 'linked-list') {
      steps = getLinkedListSteps([10, 20, 30, 40]);
      setCodeMode('java');
    } else if (moduleId === 'binary-search-tree') {
      steps = getBSTSteps([50, 30, 20, 40, 70, 60, 80]);
      setCodeMode('java');
    } else if (moduleId === 'hash-table') {
      const entries = [
        { key: 'Alice', val: 25 },
        { key: 'Bob', val: 30 },
        { key: 'Charlie', val: 35 },
        { key: 'David', val: 40 },
        { key: 'Eve', val: 45 }
      ];
      steps = getHashTableSteps(entries, 5);
      setCodeMode('java');
    } else if (moduleId === 'stack-operations') {
      steps = getStackSteps([10, 20, 30]);
      setCodeMode('java');
    } else if (moduleId === 'queue-operations') {
      steps = getQueueSteps([10, 20, 30]);
      setCodeMode('java');
    } else if (moduleId === 'avl-tree') {
      steps = getAVLSteps([30, 20, 10, 40, 50]);
      setCodeMode('java');
    } else if (moduleId === 'binary-heap') {
      steps = getHeapSteps([10, 20, 15, 30, 40]);
      setCodeMode('java');
    } else if (moduleId === 'dijkstra-algorithm') {
      steps = getDijkstraSteps();
      setCodeMode('java');
    } else if (moduleId === 'tcp-handshake') {
      steps = getTCPHandshakeSteps();
      setCodeMode('java');
    } else if (moduleId === 'round-robin-scheduling') {
      const processes = [
        { id: 'P1', burst: 5 },
        { id: 'P2', burst: 3 },
        { id: 'P3', burst: 8 },
      ];
      steps = getRoundRobinSteps(processes, 3);
      setCodeMode('java');
    } else {


      steps = [{
        elements: [],
        activeLine: -1,
        narrative: `🚧 The "${meta.title}" visualization is currently in development. Team Stratovators is working on the state machine for this engine module. Stay tuned!`
      }];
    }

    initializeModule(meta, steps);
    if (topicId !== moduleId) {
      navigate(`/visualize/${moduleId}`);
    }
  };

  useEffect(() => {
    if (topicId) {
      switchModule(topicId);
    } else if (!activeModule) {
      // Default to quick-sort if no topic
      switchModule('quick-sort');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  const currentStep = getCurrentStep();


  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* ─── Sidebar ────────────────────────────────────────── */}
      <aside className={`glass border-r border-white/5 h-screen transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
              {sidebarOpen ? 'Al' : <ChevronLeft size={16} />}
            </div>
            {sidebarOpen && <span className="font-bold tracking-tight">AlgoLogic</span>}
          </button>
        </div>

        {sidebarOpen && (
          <div className="px-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Find a module..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-600" />
            </div>
          </div>
        )}

        <nav className="flex-1 px-4 space-y-6 overflow-y-auto scrollbar-hide pb-10">
          {Object.entries(groupedModules).map(([category, mods]) => (
            <div key={category} className="space-y-2">
              <p className={`text-[10px] uppercase tracking-widest text-slate-500 font-bold px-2 flex items-center justify-between ${!sidebarOpen && 'scale-0 px-0 h-0 overflow-hidden'}`}>
                {category}
                <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md leading-none">{mods.length}</span>
              </p>
              <div className="space-y-1">
                {mods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => switchModule(m.id)}
                    title={m.title}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                      activeModule?.id === m.id 
                        ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className={`w-2 h-2 flex-shrink-0 rounded-full ${activeModule?.id === m.id ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'bg-slate-600 group-hover:bg-slate-400'}`} />
                    {sidebarOpen && <span className="text-sm font-medium truncate">{m.title}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-6 text-slate-600 hover:text-slate-400 text-xs font-mono uppercase tracking-widest text-left"
        >
          {sidebarOpen ? '← Collapse' : 'Expand →'}
        </button>
      </aside>

      {/* ─── Main Content ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-slate-950/40 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-50">{activeModule?.title || 'Loading...'}</h1>
                <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[9px] font-bold border border-indigo-500/20">
                  {activeModule?.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{activeModule?.description}</p>
            </div>
            <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/5 h-fit self-center">
              <button 
                onClick={() => setCodeMode('pseudo')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${codeMode === 'pseudo' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                PSEUDO
              </button>
              <button 
                onClick={() => setCodeMode('java')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${codeMode === 'java' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                JAVA
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="badge bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <span className="opacity-60 mr-1 font-mono">TIME:</span> {activeModule?.complexity.time}
            </div>
            <div className="badge bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <span className="opacity-60 mr-1 font-mono">SPACE:</span> {activeModule?.complexity.space}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 h-full min-h-0">
            <section className="col-span-12 lg:col-span-8 flex flex-col gap-6">
              <div className="glass-card flex-1 min-h-[400px] flex flex-col relative overflow-hidden bg-slate-900/10">
                {/* Mode Indicator */}
                <div className="absolute top-6 left-6 flex items-center gap-2 opacity-40">
                  {activeModule?.category === 'System' ? <Cpu size={14} /> : activeModule?.category === 'Logic' ? <Box size={14} /> : <Layout size={14} />}
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{activeModule?.category} MODE</span>
                </div>

                {/* Status Indicator for Memory algorithms */}
                {currentStep?.metadata?.activePage !== undefined && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
                    <div className="glass px-6 py-2.5 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl backdrop-blur-2xl">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">REQ:</span>
                      <span className="text-xl font-bold text-white leading-none">{currentStep.metadata.activePage}</span>
                      <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${currentStep.metadata.isHit ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                        {currentStep.metadata.isHit ? 'HIT' : 'FAULT'}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex-1 flex items-center justify-center p-4">
                  <UniversalOven />
                </div>
                <div className="border-t border-white/5 bg-slate-900/20">
                  <PlaybackControls />
                </div>
              </div>

              {/* Learning Objectives Insight */}
              {activeModule?.learningObjectives && (
                <div className="grid grid-cols-2 gap-4">
                  {activeModule.learningObjectives.map((obj, i) => (
                    <div key={i} className="glass p-5 rounded-3xl border border-white/5 bg-indigo-500/[0.02] flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex-shrink-0 flex items-center justify-center text-xs font-bold text-indigo-400">
                        {i + 1}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Professor's Insight</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">{obj}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="glass p-6 rounded-3xl border border-white/5">
                <StreamingExplanation 
                  key={`${activeModule?.id}-${currentStep?.narrative}`} 
                  text={currentStep?.narrative || ''} 
                />
              </div>
            </section>
 
            <aside className="col-span-12 lg:col-span-4 h-full flex flex-col min-h-0">
              <div className="glass-card p-6 flex-1 sticky top-0 flex flex-col min-h-0" style={{ maxHeight: 'calc(100vh - 160px)' }}>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-4 flex items-center justify-between">
                  <span>{codeMode.toUpperCase()} Implementation</span>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                  </div>
                </h3>
                
                <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
                  {codeMode === 'pseudo' ? (
                    <PseudoCode activeLine={currentStep?.activeLine} />
                  ) : (
                    <div className="glass rounded-2xl overflow-hidden border border-white/5 bg-slate-950/30 font-mono text-[11px] leading-relaxed">
                      <div className="p-5 overflow-x-auto whitespace-pre">
                        {(currentStep?.javaCode || "No Java implementation available.").split('\n').map((line, i) => {
                          const isHighlighted = currentStep?.codeHighlight?.includes(i);
                          return (
                            <div 
                              key={i} 
                              className={`flex gap-4 px-3 py-1 transition-all duration-500 ${isHighlighted ? 'bg-indigo-500/20 text-indigo-300 border-l-2 border-indigo-500' : 'text-slate-400/50'}`}
                            >
                              <span className="w-4 text-slate-800 text-right select-none text-[9px]">{i + 1}</span>
                              <span className="truncate">{line}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
