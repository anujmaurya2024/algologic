// src/algorithms/sorting/quickSort.ts
import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const QuickSortModule: ModuleMetadata = {
  id: 'quick-sort',
  title: 'Quick Sort',
  category: 'Logic',
  subject: 'Logic',
  description: 'Efficient, in-place sorting algorithm using divide and conquer.',
  complexity: {
    time: 'O(n log n)',
    space: 'O(log n)',
    worst: 'O(n²)',
  },
  color: '#4caf50', // VisuAlgo Green
};

export function getQuickSortSteps(initialArray: number[]): EngineStep[] {
  const steps: EngineStep[] = [];
  const array = [...initialArray];
  const sortedIndices = new Set<number>();

  const recordStep = (
    comparing: number[] = [],
    swapping: number[] = [],
    pivot: number | null = null,
    activeLine: number = 0,
    narrative: string = ''
  ) => {
    const elements: VisualElement[] = array.map((value, idx) => {
      let colorState: VisualElement['colorState'] = 'default';
      if (sortedIndices.has(idx)) colorState = 'success';
      else if (pivot === idx) colorState = 'pivot';
      else if (swapping.includes(idx)) colorState = 'swapping';
      else if (comparing.includes(idx)) colorState = 'comparing';

      return {
        id: `bar-${idx}-${value}`, // Keep ID stable for layout animations
        value,
        type: 'bar',
        colorState,
      };
    });

    steps.push({
      elements,
      activeLine,
      narrative,
    });
  };

  const partition = (low: number, high: number): number => {
    const pivotValue = array[high];
    let i = low - 1;

    recordStep([], [], high, 2, `🎯 Chose ${pivotValue} as the pivot.`);

    for (let j = low; j < high; j++) {
      recordStep([j, high], [], high, 4, `🔍 Comparing ${array[j]} with pivot ${pivotValue}.`);

      if (array[j] < pivotValue) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        recordStep([], [i, j], high, 6, `✅ ${array[j]} < ${pivotValue}. Swapping.`);
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    recordStep([], [i + 1, high], i + 1, 8, `📌 Placing pivot ${array[i + 1]} in final position.`);

    sortedIndices.add(i + 1);
    recordStep([], [], null, 9, `✨ Pivot ${array[i + 1]} sorted.`);

    return i + 1;
  };

  const quickSort = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    } else if (low === high) {
      sortedIndices.add(low);
    }
  };

  recordStep([], [], null, 0, '🚀 Starting Quick Sort.');
  quickSort(0, array.length - 1);
  
  for (let k = 0; k < array.length; k++) sortedIndices.add(k);
  recordStep([], [], null, 12, '🎉 Fully sorted!');

  return steps;
}

export function generateRandomArray(size: number, min = 10, max = 95): number[] {
  const arr: number[] = [];
  const usedValues = new Set<number>();
  while (arr.length < size) {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!usedValues.has(val)) {
      usedValues.add(val);
      arr.push(val);
    }
  }
  return arr;
}

