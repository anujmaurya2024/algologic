// src/algorithms/searching/linearSearch.ts
import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const LinearSearchModule: ModuleMetadata = {
  id: 'linear-search',
  title: 'Linear Search',
  category: 'Logic',
  subject: 'Logic',
  description: 'Simplest search algorithm that checks every element in the list sequentially. until the target value is found or the list ends.',
  complexity: {
    time: 'O(n)',
    space: 'O(1)',
  },
  color: '#795548', // VisuAlgo Brown
};

export function getLinearSearchSteps(initialArray: number[], target: number): EngineStep[] {
  const steps: EngineStep[] = [];
  const array = [...initialArray];

  const recordStep = (
    comparing: number | null = null,
    found: number | null = null,
    activeLine: number = 0,
    narrative: string = ''
  ) => {
    const elements: VisualElement[] = array.map((value, idx) => ({
      id: `linear-${idx}-${value}`,
      value,
      type: 'bar',
      colorState: found === idx ? 'success' : comparing === idx ? 'comparing' : 'default',
    }));

    steps.push({
      elements,
      activeLine,
      narrative,
    });
  };

  recordStep(null, null, 0, `🚀 Starting Linear Search for target: ${target}`);

  let foundIndex = -1;
  for (let i = 0; i < array.length; i++) {
    recordStep(i, null, 2, `🔍 Comparing index ${i} (value: ${array[i]}) with target ${target}.`);
    if (array[i] === target) {
      foundIndex = i;
      recordStep(null, i, 4, `✅ Found target ${target} at index ${i}!`);
      break;
    }
  }

  if (foundIndex === -1) {
    recordStep(null, null, 6, `❌ Target ${target} not found in the array.`);
  }

  return steps;
}
