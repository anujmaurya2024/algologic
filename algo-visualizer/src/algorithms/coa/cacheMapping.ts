// src/algorithms/coa/cacheMapping.ts
import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const CacheMappingModule: ModuleMetadata = {
  id: 'direct-cache-mapping',
  title: 'Direct Cache Mapping',
  category: 'System',
  subject: 'COA',
  description: 'Visualizes how Main Memory blocks map to specific Cache slots using (Block Address % Number of Cache Slots).',
  learningObjectives: [
    "Uses modular arithmetic for simple and fast address translation.",
    "Causes high contention (conflict misses) if multiple blocks map to the same slot."
  ],
  complexity: {
    time: 'O(n)',
    space: 'O(blocks)',
  },
  color: '#9c27b0', // VisuAlgo Purple
};

const JAVA_IMPLEMENTATION = `public class CacheSimulator {
    int[] cache;
    int cacheSize;

    public void access(int address) {
        int blockIndex = address / blockSize;
        int slot = blockIndex % cacheSize;
        
        System.out.println("Data from block " + blockIndex + 
                           " maps to cache slot " + slot);
        cache[slot] = blockIndex; // Direct Overwrite
    }
}`;

export function getCacheMappingSteps(addresses: number[], cacheSize: number): EngineStep[] {
  const steps: EngineStep[] = [];
  const cache: number[] = new Array(cacheSize).fill(-1);

  const recordStep = (
    activeAddr: number,
    slot: number,
    activeLine: number,
    narrative: string,
    highlights: number[]
  ) => {
    const elements: VisualElement[] = cache.map((value, idx) => ({
      id: `slot-${idx}`,
      value: value,
      label: `SLOT ${idx}`,
      type: 'block',
      colorState: idx === slot ? 'active' : 'default',
      subLabel: idx === slot ? `Mapped Address: ${activeAddr}` : ''
    }));

    steps.push({
      elements,
      activeLine,
      narrative,
      javaCode: JAVA_IMPLEMENTATION,
      codeHighlight: highlights,
      metadata: { activePage: activeAddr, isHit: false } // Reusing metadata for consistency
    });
  };

  steps.push({
    elements: cache.map((_, idx) => ({
      id: `slot-${idx}`,
      value: -1,
      label: `SLOT ${idx}`,
      type: 'block',
      colorState: 'default'
    })),
    activeLine: 0,
    narrative: "🚀 Initializing Cache Slots (All Empty). Memory Addresses: " + addresses.join(', '),
    javaCode: JAVA_IMPLEMENTATION,
    codeHighlight: [2, 3]
  });

  for (const addr of addresses) {
    const slot = addr % cacheSize;
    cache[slot] = addr;
    recordStep(
      addr, 
      slot, 
      8, 
      `🛰️ Mapping address ${addr} to Slot ${slot} (${addr} % ${cacheSize} = ${slot}).`, 
      [8, 9, 10, 11]
    );
  }

  return steps;
}
