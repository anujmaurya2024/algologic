// src/algorithms/dsa/linkedList.ts
import type { EngineStep, VisualElement, Connection, ModuleMetadata } from '../../engine/types';

export const LinkedListModule: ModuleMetadata = {
  id: 'linked-list',
  title: 'Singly Linked List',
  category: 'Linear',
  subject: 'DSA',
  description: 'Visualizes a sequence of nodes where each node points to the next, demonstrating head, tail, and pointer traversal.',
  learningObjectives: [
    "Efficient insertion/deletion at the head (O(1)).",
    "Linear time lookup and access (O(n)).",
    "Dynamic memory usage compared to fixed-size arrays."
  ],
  complexity: {
    time: 'O(n) for search, O(1) for head insertion',
    space: 'O(n)',
  },
  color: '#2196f3', // VisuAlgo Blue
};

const JAVA_IMPLEMENTATION = `public class LinkedList<T> {
    Node head;

    public void insert(T data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }
}`;

export function getLinkedListSteps(values: number[]): EngineStep[] {
  const steps: EngineStep[] = [];
  const nodes: { id: string; val: number }[] = [];

  const recordStep = (
    activeId: string | null, 
    activeLine: number, 
    narrative: string, 
    highlights: number[]
  ) => {
    const elements: VisualElement[] = nodes.map(n => ({
      id: n.id,
      value: n.val,
      label: nodes[0].id === n.id ? 'HEAD' : nodes[nodes.length-1].id === n.id ? 'TAIL' : '',
      type: 'block',
      colorState: n.id === activeId ? 'active' : 'default'
    }));

    const connections: Connection[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      connections.push({
        fromId: nodes[i].id,
        toId: nodes[i+1].id,
        type: 'pointer',
        colorState: nodes[i].id === activeId ? 'active' : 'default'
      });
    }

    steps.push({
      elements,
      connections,
      activeLine,
      narrative,
      javaCode: JAVA_IMPLEMENTATION,
      codeHighlight: highlights
    });
  };

  // Initial step
  steps.push({
    elements: [],
    connections: [],
    activeLine: 0,
    narrative: "🚀 Creating an empty Linked List.",
    javaCode: JAVA_IMPLEMENTATION,
    codeHighlight: [1, 2]
  });

  for (const val of values) {
    const newId = `node-${nodes.length}`;
    nodes.push({ id: newId, val });
    
    // Step: New Node Created
    recordStep(newId, 5, `✨ Created new node with value ${val}.`, [5, 6]);

    if (nodes.length > 1) {
       // Step: Traversal (simulated)
       for (let i = 0; i < nodes.length - 1; i++) {
         recordStep(nodes[i].id, 11, `🔍 Traversing to find the end of the list... (Current: ${nodes[i].val})`, [11, 12, 13]);
       }
       // Step: Pointer Update
       recordStep(nodes[nodes.length-2].id, 15, `🔗 Hooking up the new node to the tail.`, [15]);
    } else {
       // Step: First node as head
       recordStep(newId, 7, `👑 First node created! Setting head to ${val}.`, [7, 8, 9]);
    }
  }

  return steps;
}
