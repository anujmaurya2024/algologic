import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import type { VisualElement, Connection } from '../../engine/types';


export function UniversalOven() {
  const { getCurrentStep, activeModule } = useVisualizerStore();
  const currentStep = getCurrentStep();

  if (!currentStep) return (
    <div className="flex flex-col items-center gap-4 text-slate-700">
      <div className="w-12 h-12 rounded-full border-2 border-slate-800 border-t-indigo-500 animate-spin" />
      <span className="text-xs font-mono uppercase tracking-widest">Warming up the engine...</span>
    </div>
  );

  const renderBars = (elements: VisualElement[]) => (
    <div className="flex items-end justify-center gap-1 p-8 h-64 w-full max-w-4xl">
      <AnimatePresence mode="popLayout">
        {elements.map((el, i) => (
          <motion.div
            key={el.id || i}
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${(el.value as number) * 2}px`, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`
              flex-1 min-w-[4px] rounded-t-sm transition-all duration-300
              ${el.colorState === 'active' || el.colorState === 'swapping' || el.colorState === 'pivot' 
                ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)]' : 'bg-white/40'}
            `}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  const renderDSA = (elements: VisualElement[]) => (
    <div className="flex flex-wrap justify-center gap-4 p-8">
      <AnimatePresence mode="popLayout">
        {elements.map((el, idx) => (
          <motion.div
            key={el.id || idx}
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={`
              relative min-w-[64px] h-16 rounded-xl flex items-center justify-center font-black text-xl
              transition-all duration-500 border-2 shadow-xl
              ${el.colorState === 'active' ? 'bg-white text-slate-900 border-white shadow-white/20' :
                el.colorState === 'success' ? 'bg-emerald-400 text-slate-900 border-emerald-400' :
                el.colorState === 'error' ? 'bg-rose-400 text-slate-900 border-rose-400' :
                'bg-transparent border-white/40 text-white'}
            `}
          >
            {el.value !== -1 && el.value}
            {el.label && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black whitespace-nowrap opacity-70 uppercase tracking-widest text-white">
                {el.label}
              </span>
            )}
            {el.subLabel && (
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white/50 whitespace-nowrap italic">
                {el.subLabel}
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  const renderOS = (elements: VisualElement[]) => (
    <div className="w-full max-w-4xl space-y-8 p-8">
      <div className="flex h-16 w-full rounded-2xl border border-white/20 bg-black/40 overflow-hidden shadow-2xl">
        {elements.filter(el => el.type === 'block').map((el, idx) => (
          <motion.div
            key={el.id || idx}
            initial={{ width: 0 }}
            animate={{ width: `${(el.value as number) * 5}%` }}
            className={`
              h-full flex items-center justify-center border-r border-white/10 relative group
              ${el.colorState === 'active' ? 'bg-white/40' : 'bg-white/5'}
            `}
          >
            <span className="text-xs font-black text-white">{el.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {elements.slice(0, 8).map((el, idx) => (
          <div key={el.id || idx} className={`p-4 rounded-xl border-2 ${el.colorState === 'active' ? 'border-white bg-white/20' : 'border-white/10 bg-black/20'}`}>
            <p className="text-[10px] font-black text-white/50 uppercase mb-1">{el.label}</p>
            <p className="text-xl font-black text-white">{el.value === -1 ? '-' : el.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCOA = (elements: VisualElement[]) => (
    <div className="relative w-full max-w-4xl p-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {elements.map((el, idx) => (
          <motion.div
            key={el.id || idx}
            whileHover={{ scale: 1.05 }}
            className={`
              relative h-24 rounded-2xl border-2 transition-all duration-500
              flex flex-col items-center justify-center shadow-xl
              ${el.colorState === 'active' ? 'bg-white/30 border-white' : 'bg-black/20 border-white/10'}
            `}
          >
            <div className="absolute -top-3 left-4 px-2 bg-slate-900 text-[9px] font-black text-white border border-white/20 rounded uppercase">
              {el.label}
            </div>
            <div className={`text-2xl font-black ${el.colorState === 'active' ? 'text-white' : 'text-white/60'}`}>
              {el.value === -1 ? '0x0000' : `0x${(el.value as number).toString(16).padStart(4, '0').toUpperCase()}`}
            </div>
            {el.subLabel && <div className="mt-2 text-[10px] text-white/40 font-bold italic">{el.subLabel}</div>}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderGraph = (elements: VisualElement[], connections: Connection[] = []) => (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
        <defs>
          <marker id="arrowhead-white" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="white" />
          </marker>
        </defs>
        {connections.map((conn) => {
          const fromIdx = elements.findIndex(el => el.id === conn.fromId);
          const toIdx = elements.findIndex(el => el.id === conn.toId);
          if (fromIdx === -1 || toIdx === -1) return null;
          
          return null;
        })}
      </svg>

      <div className="flex flex-wrap justify-center gap-12 p-12 z-10 w-full relative max-w-4xl">
        <AnimatePresence mode="popLayout">
          {elements.map((el, idx) => (
            <motion.div
              key={el.id || idx}
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`
                relative w-16 h-16 rounded-full flex items-center justify-center font-black text-xl
                transition-all duration-500 border-2 shadow-2xl
                ${el.colorState === 'active' ? 'bg-white text-slate-900 border-white' :
                  el.colorState === 'success' ? 'bg-emerald-400 text-slate-900 border-emerald-400' :
                  'bg-transparent border-white/40 text-white'}
              `}
            >
              {el.value !== -1 && el.value}
              {el.label && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black whitespace-nowrap text-white uppercase tracking-widest leading-none">
                  {el.label}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Dynamic pointers using lines */}
        <div className="absolute inset-0 pointer-events-none">
           {connections.map((conn, idx) => (
             <motion.div 
               key={idx}
               className={`absolute bg-white/20 h-0.5 origin-left ${conn.colorState === 'active' ? 'bg-white h-1' : ''}`}
             />
           ))}
        </div>
      </div>
    </div>
  );

  const renderTable = (elements: VisualElement[], grid?: { rows: number, cols: number }) => {
    const rows = grid?.rows || 1;
    const cols = grid?.cols || elements.length;
    
    return (
      <div 
        className="grid gap-2 p-8" 
        style={{ 
          gridTemplateColumns: `repeat(${cols}, minmax(60px, 1fr))`,
          gridTemplateRows: `repeat(${rows}, auto)`
        }}
      >
        <AnimatePresence>
          {elements.map((el, i) => (
            <motion.div
              key={el.id || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                h-14 border rounded-lg flex items-center justify-center font-mono text-sm relative
                ${el.colorState === 'active' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-lg' : 'bg-slate-900/40 border-white/10 text-slate-500'}
              `}
            >
              {el.value !== -1 && el.value}
              {el.label && <span className="absolute -top-4 left-1 text-[8px] uppercase text-slate-600 font-bold">{el.label}</span>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  const renderTree = (elements: VisualElement[], connections: Connection[] = []) => {
    return (
      <div className="relative w-full h-full flex flex-col items-center gap-16 p-12">
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          {connections.map((conn) => {
             const from = elements.find(el => el.id === conn.fromId);
             const to = elements.find(el => el.id === conn.toId);
             if (!from || !to) return null;
             return null; // Simplified for now
          })}
        </svg>

        <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
           <AnimatePresence>
             {elements.map((el) => (
               <motion.div
                 key={el.id}
                 initial={{ scale: 0, y: 20 }}
                 animate={{ scale: 1, y: 0 }}
                 className={`
                   w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold relative shadow-lg
                   ${el.colorState === 'active' ? 'bg-indigo-500/40 border-indigo-400 text-white shadow-indigo-500/20' : 
                     el.colorState === 'success' ? 'bg-emerald-500/30 border-emerald-400 text-white' :
                     'bg-slate-900/60 border-white/10 text-slate-400'}
                 `}
               >
                 {el.value}
                 {el.label && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-slate-500 uppercase font-black tracking-widest">{el.label}</span>}
                 
                 {/* Decorative Branch Points */}
                 <div className="absolute -bottom-1 left-1/4 w-1.5 h-1.5 bg-white/10 rounded-full" />
                 <div className="absolute -bottom-1 right-1/4 w-1.5 h-1.5 bg-white/10 rounded-full" />
               </motion.div>
             ))}
           </AnimatePresence>
        </div>
      </div>
    );
  };

  const layout = currentStep.layout || (activeModule?.category === 'Hierarchical' ? 'tree' : activeModule?.category === 'Networked' ? 'graph' : 'list');
  const subject = activeModule?.subject || 'DSA';
  const themeColor = activeModule?.color || '#1e293b';

  return (
    <div 
      className="w-full h-full flex items-center justify-center p-4 transition-colors duration-700"
      style={{ backgroundColor: themeColor + '20' }} // Light version of theme color as background
    >
      <div className="w-full h-full max-w-6xl flex items-center justify-center bg-slate-950/40 backdrop-blur-3xl rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative group">
        {/* Dynamic Background Glow */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-1000 group-hover:opacity-30"
          style={{ 
            background: `radial-gradient(circle at center, ${themeColor}, transparent 70%)` 
          }}
        />

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {subject === 'OS' && renderOS(currentStep.elements)}
          {subject === 'COA' && renderCOA(currentStep.elements)}
          {(subject === 'DSA' || subject === 'Logic' || subject === 'NET') && (
            <>
              {layout === 'table' && renderTable(currentStep.elements, currentStep.grid)}
              {layout === 'tree' && renderTree(currentStep.elements, currentStep.connections)}
              {layout === 'graph' && renderGraph(currentStep.elements, currentStep.connections)}
              {(layout === 'list' || !layout) && (
                activeModule?.category === 'Logic' && activeModule.id.includes('sort')
                  ? renderBars(currentStep.elements)
                  : renderDSA(currentStep.elements)
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

