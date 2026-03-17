// src/algorithms/dsa/hashTable.ts
import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const HashTableModule: ModuleMetadata = {
  id: 'hash-table',
  title: 'Hash Table (Chaining)',
  category: 'Linear',
  subject: 'DSA',
  description: 'Visualizes hash collisions and how they are handled using Separate Chaining (Linked Lists at each bucket).',
  learningObjectives: [
    "Average case O(1) for search, insert, and delete.",
    "Hash function distributes keys across buckets.",
    "Chaining handles collisions by storing multiple elements in the same bucket."
  ],
  complexity: {
    time: 'O(1) Average',
    space: 'O(n)',
  },
  color: '#ff5722', // VisuAlgo Deep Orange
};

const JAVA_IMPLEMENTATION = `public class HashTable {
    LinkedList<Entry>[] buckets;
    int size = 8;

    public void put(String key, int value) {
        int index = Math.abs(key.hashCode()) % size;
        if (buckets[index] == null) {
            buckets[index] = new LinkedList<>();
        }
        buckets[index].add(new Entry(key, value));
    }
}`;

export function getHashTableSteps(entries: { key: string; val: number }[], bucketCount: number = 5): EngineStep[] {
  const steps: EngineStep[] = [];
  const buckets: { key: string; val: number }[][] = Array.from({ length: bucketCount }, () => []);

  const recordStep = (
    activeBucket: number | null,
    activeKey: string | null,
    narrative: string,
    line: number,
    highlights: number[]
  ) => {
    const elements: VisualElement[] = [];
    
    // Flatten buckets into visual elements
    for (let i = 0; i < bucketCount; i++) {
       // Bucket Label
       elements.push({
         id: `bucket-${i}`,
         value: -1,
         label: `INDEX ${i}`,
         type: 'block',
         colorState: i === activeBucket ? 'active' : 'default',
         subLabel: `Size: ${buckets[i].length}`
       });

       // Bucket Contents (Chaining)
       buckets[i].forEach((entry, ej) => {
         elements.push({
           id: `entry-${i}-${ej}`,
           value: entry.val,
           label: entry.key,
           type: 'block',
           colorState: entry.key === activeKey ? 'success' : 'default'
         });
       });
    }

    steps.push({
      elements,
      activeLine: line,
      narrative,
      javaCode: JAVA_IMPLEMENTATION,
      codeHighlight: highlights
    });
  };

  steps.push({
    elements: Array.from({ length: bucketCount }, (_, i) => ({
      id: `bucket-${i}`,
      value: -1,
      label: `INDEX ${i}`,
      type: 'block',
      colorState: 'default'
    })),
    activeLine: 0,
    narrative: "🚀 Initializing Hash Table with " + bucketCount + " buckets.",
    javaCode: JAVA_IMPLEMENTATION,
    codeHighlight: [1, 2, 3]
  });

  for (const entry of entries) {
    // Basic hash
    const hash = entry.key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % bucketCount;

    recordStep(index, entry.key, `🛰️ Hashing key "${entry.key}"... Result: index ${index}.`, 7, [7, 8]);
    
    buckets[index].push(entry);
    
    recordStep(index, entry.key, `📦 Appending "${entry.key}" to bucket ${index}.`, 11, [9, 10, 11, 12]);
  }

  return steps;
}
