// src/components/explanation/NarrativeBox.tsx

interface Props {
  narrative?: string;
}

export function NarrativeBox({ narrative }: Props) {
  return (
    <div className="glass-card p-5 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-xl">
          🧠
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-widest text-indigo-400 font-semibold mb-1">
            Algorithm Insight
          </p>
          <p className="text-slate-200 text-sm leading-relaxed font-light">
            {narrative || 'Click ▶ Play to begin the step-by-step walkthrough of Quick Sort.'}
          </p>
        </div>
      </div>
    </div>
  );
}
