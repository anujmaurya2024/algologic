// src/algorithms/sorting/bubbleSort.ts
import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const BubbleSortModule: ModuleMetadata = {
  id: 'bubble-sort',
  title: 'Bubble Sort',
  category: 'Logic',
  subject: 'Logic',
  description: 'Simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  complexity: {
    time: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
  },
  color: '#4caf50', // VisuAlgo Green
};

export function getBubbleSortSteps(initialArray: number[]): EngineStep[] {
  const steps: EngineStep[] = [];
  const array = [...initialArray];
  const sortedIndices = new Set<number>();

  const recordStep = (
    comparing: number[] = [],
    swapping: number[] = [],
    activeLine: number = 0,
    narrative: string = ''
  ) => {
    const elements: VisualElement[] = array.map((value, idx) => {
      let colorState: VisualElement['colorState'] = 'default';
      if (sortedIndices.has(idx)) colorState = 'success';
      else if (swapping.includes(idx)) colorState = 'swapping';
      else if (comparing.includes(idx)) colorState = 'comparing';

      return {
        id: `bubble-${idx}-${value}`,
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

  const n = array.length;
  recordStep([], [], 0, "🚀 Starting Bubble Sort.");

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      recordStep([j, j + 1], [], 4, `🔍 Comparing ${array[j]} and ${array[j+1]}.`);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        recordStep([], [j, j + 1], 6, `🔄 ${array[j+1]} > ${array[j]}. Swapping them.`);
      }
    }
    sortedIndices.add(n - i - 1);
    recordStep([], [], 9, `✨ Element at index ${n-i-1} is now in its final sorted position.`);
  }

  recordStep([], [], 12, "🎉 Bubble Sort complete!");
  return steps;
}
