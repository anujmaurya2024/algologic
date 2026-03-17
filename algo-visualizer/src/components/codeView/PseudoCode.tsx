// src/components/codeView/PseudoCode.tsx

interface Props {
  activeLine?: number;
}

const PSEUDOCODE_LINES = [
  { n: 0,  indent: 0, text: 'function quickSort(arr, low, high):' },
  { n: 1,  indent: 1, text: 'if low < high:' },
  { n: 2,  indent: 2, text: 'pivot ← arr[high]' },
  { n: 3,  indent: 2, text: 'i ← low − 1' },
  { n: 4,  indent: 2, text: 'for j = low to high − 1:' },
  { n: 5,  indent: 3, text: 'if arr[j] < pivot:  // no swap' },
  { n: 6,  indent: 3, text: '  swap arr[i+1] ↔ arr[j]  // yes swap' },
  { n: 7,  indent: 3, text: '  i ← i + 1' },
  { n: 8,  indent: 2, text: 'swap arr[i+1] ↔ arr[high]  // pivot to final' },
  { n: 9,  indent: 2, text: 'return i + 1  // pivot is sorted ✓' },
  { n: 10, indent: 2, text: '' },
  { n: 11, indent: 2, text: 'pi ← partition(arr, low, high)' },
  { n: 11, indent: 2, text: 'quickSort(arr, low, pi − 1)' },
  { n: 11, indent: 2, text: 'quickSort(arr, pi + 1, high)' },
  { n: 12, indent: 0, text: '// ✅ Array is fully sorted!' },
];

export function PseudoCode({ activeLine }: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-rose-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
        <span className="text-slate-400 text-xs ml-2 font-mono">quickSort.pseudo</span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-0.5">
        {PSEUDOCODE_LINES.map((line, i) => {
          const isActive = activeLine === line.n && line.text.trim() !== '';
          return (
            <div
              key={i}
              className={`code-line ${isActive ? 'active' : ''}`}
              style={{ paddingLeft: `${line.indent * 16 + 16}px` }}
            >
              <span className="line-num">{(i + 1).toString().padStart(2, ' ')}</span>
              <span>{line.text || ' '}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Color Legend</p>
        {[
          { color: 'bg-rose-500', label: 'Comparing' },
          { color: 'bg-amber-400', label: 'Pivot' },
          { color: 'bg-violet-500', label: 'Swapping' },
          { color: 'bg-emerald-500', label: 'Sorted' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-sm ${item.color} flex-shrink-0`} />
            <span className="text-slate-400 text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
