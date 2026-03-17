import type { EngineStep, VisualElement, Connection, ModuleMetadata } from '../../engine/types';

export const HeapModule: ModuleMetadata = {
  id: 'binary-heap',
  title: 'Binary Heap',
  category: 'Hierarchical',
  subject: 'DSA',
  description: 'Max-Heapify logic and tree-to-array mapping.',
  learningObjectives: ['Understand Heapify process.', 'Parent-child index mapping.'],
  complexity: {
    time: 'O(log n)',
    space: 'O(n)',
  },
  color: '#e91e63', // VisuAlgo Pink
};

export function getHeapSteps(initialData: number[]): EngineStep[] {
  const steps: EngineStep[] = [];
  const heap = [...initialData];

  function recordStep(narrative: string, activeIdxs: number[] = [], swapping: number[] = []) {
    const elements: VisualElement[] = heap.map((v, i) => ({
      id: `heap-${i}`,
      value: v,
      type: 'block',
      colorState: swapping.includes(i) ? 'swapping' : activeIdxs.includes(i) ? 'active' : 'default',
      label: i === 0 ? 'ROOT' : undefined
    }));

    const connections: Connection[] = [];
    for (let i = 0; i < heap.length; i++) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < heap.length) {
            connections.push({ fromId: `heap-${i}`, toId: `heap-${left}`, type: 'edge' });
        }
        if (right < heap.length) {
            connections.push({ fromId: `heap-${i}`, toId: `heap-${right}`, type: 'edge' });
        }
    }

    steps.push({ elements, connections, activeLine: 1, narrative });
  }

  recordStep("Initial array before Maxwell-Heapification.", [], []);

  // Simple Max-Heapify (one pass for demo)
  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      recordStep(`Checking subtree at index ${i} (value ${heap[i]})`, [i, left, right].filter(idx => idx < heap.length));

      if (left < heap.length && heap[left] > heap[largest]) largest = left;
      if (right < heap.length && heap[right] > heap[largest]) largest = right;

      if (largest !== i) {
          recordStep(`Imbalance: ${heap[largest]} > ${heap[i]}. Swapping.`, [i, largest], [i, largest]);
          [heap[i], heap[largest]] = [heap[largest], heap[i]];
          recordStep(`Swapped ${heap[i]} and ${heap[largest]}.`, [i, largest]);
      }
  }

  recordStep("Heap property satisfied! This is now a Max-Heap.", [0]);

  return steps;
}
