// src/algorithms/searching/binarySearch.ts
import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const BinarySearchModule: ModuleMetadata = {
  id: 'binary-search',
  title: 'Binary Search',
  category: 'Logic',
  subject: 'Logic',
  description: 'Efficient search algorithm that finds the position of a target value within a sorted array.',
  complexity: {
    time: 'O(log n)',
    space: 'O(1)',
  },
  color: '#795548', // VisuAlgo Brown
};

export function getBinarySearchSteps(initialArray: number[], target: number): EngineStep[] {
  const steps: EngineStep[] = [];
  const array = [...initialArray].sort((a, b) => a - b); // Must be sorted

  const recordStep = (
    low: number,
    high: number,
    mid: number | null,
    found: number | null = null,
    activeLine: number = 0,
    narrative: string = ''
  ) => {
    const elements: VisualElement[] = array.map((value, idx) => {
      let colorState: VisualElement['colorState'] = 'default';
      if (found === idx) colorState = 'success';
      else if (mid === idx) colorState = 'active';
      else if (idx < low || idx > high) colorState = 'default'; // Inactive range
      else colorState = 'comparing';

      return {
        id: `binary-${idx}-${value}`,
        value,
        type: 'bar',
        colorState,
        subLabel: idx === low ? 'L' : idx === high ? 'H' : idx === mid ? 'M' : '',
      };
    });

    steps.push({
      elements,
      activeLine,
      narrative,
    });
  };

  recordStep(0, array.length - 1, null, null, 0, `🚀 Starting Binary Search on sorted array for target: ${target}`);

  let low = 0;
  let high = array.length - 1;
  let foundIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    recordStep(low, high, mid, null, 2, `📍 Middle index is ${mid} (value: ${array[mid]}).`);

    if (array[mid] === target) {
      foundIndex = mid;
      recordStep(low, high, mid, mid, 4, `✅ Found target ${target} at index ${mid}!`);
      break;
    }

    if (array[mid] < target) {
      recordStep(low, high, mid, null, 6, `📈 ${array[mid]} < ${target}. Target must be in the right half.`);
      low = mid + 1;
    } else {
      recordStep(low, high, mid, null, 8, `📉 ${array[mid]} > ${target}. Target must be in the left half.`);
      high = mid - 1;
    }
  }

  if (foundIndex === -1) {
    recordStep(low, high, null, null, 10, `❌ Target ${target} not found in the array.`);
  }

  return steps;
}
