// src/algorithms/os/lru.ts
import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const LRUModule: ModuleMetadata = {
  id: 'lru-page-replacement',
  title: 'LRU Page Replacement',
  category: 'System',
  subject: 'OS',
  description: 'Least Recently Used (LRU) algorithm replaces the page that has not been used for the longest period of time.',

  learningObjectives: [
    "Identifies the page that was 'last used' furthest in the past.",
    "Efficiently reduces page faults by keeping frequently used pages in memory."
  ],
  complexity: {
    time: 'O(1) with HashMap + DLL',
    space: 'O(f) where f is number of frames',
  },
  color: '#ff9800', // VisuAlgo Orange
};

const JAVA_IMPLEMENTATION = `public class LRUCache {
    Set<Integer> cache;
    int capacity;

    public void refer(int page) {
        if (!cache.contains(page)) {
            if (cache.size() == capacity) {
                int firstKey = cache.iterator().next();
                cache.remove(firstKey);
            }
        } else {
            cache.remove(page);
        }
        cache.add(page);
    }
}`;

export function getLRUSteps(pageRequests: number[], frameCount: number): EngineStep[] {
  const steps: EngineStep[] = [];
  const frames: number[] = []; // Current pages in memory
  const usageHistory: number[] = []; // Tracks recency

  const recordStep = (
    activePage: number,
    isHit: boolean,
    evicted: number | null = null,
    activeLine: number = 0,
    narrative: string = '',
    highlights: number[] = []
  ) => {
    // Elements represent the frames
    const elements: VisualElement[] = Array.from({ length: frameCount }).map((_, idx) => {
      const pageValue = frames[idx];
      const isCurrentlyActive = pageValue === activePage;
      
      return {
        id: `frame-${idx}`,
        value: pageValue !== undefined ? pageValue : -1,
        label: pageValue !== undefined ? `P${pageValue}` : 'Empty',
        type: 'block',
        colorState: isHit && isCurrentlyActive ? 'success' : !isHit && isCurrentlyActive ? 'active' : 'default',
        subLabel: pageValue !== undefined ? `Age: ${usageHistory.indexOf(pageValue)}` : ''
      };
    });

    steps.push({
      elements,
      activeLine,
      narrative,
      javaCode: JAVA_IMPLEMENTATION,
      codeHighlight: highlights,
      metadata: { activePage, isHit, evicted, frames: [...frames] }
    });
  };

  steps.push({
    elements: Array.from({ length: frameCount }).map((_, idx) => ({
      id: `frame-${idx}`,
      value: -1,
      label: 'Empty',
      type: 'block',
      colorState: 'default'
    })),
    activeLine: 0,
    narrative: "🚀 Initializing empty frames. Page requests: " + pageRequests.join(', '),
    javaCode: JAVA_IMPLEMENTATION,
    codeHighlight: [2, 3]
  });

  for (const page of pageRequests) {
    const hitIndex = frames.indexOf(page);
    const isHit = hitIndex !== -1;

    if (isHit) {
      // Update history: remove then push to end
      const hIdx = usageHistory.indexOf(page);
      usageHistory.splice(hIdx, 1);
      usageHistory.push(page);
      recordStep(page, true, null, 14, `✅ Page ${page} is already in memory (HIT). Updated recency.`, [14, 15]);
    } else {
      let evicted: number | null = null;
      if (frames.length < frameCount) {
        frames.push(page);
        usageHistory.push(page);
        recordStep(page, false, null, 6, `❌ Page ${page} not in memory (FAULT). Filling empty frame.`, [6, 7]);
      } else {
        // Evict LRU (first in usageHistory)
        evicted = usageHistory.shift()!;
        const fIdx = frames.indexOf(evicted);
        frames[fIdx] = page;
        usageHistory.push(page);
        recordStep(page, false, evicted, 8, `⚠️ Page fault! Memory full. Evicting LRU Page ${evicted} to make room for ${page}.`, [8, 9, 10]);
      }
    }
  }

  return steps;
}
