import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const StackModule: ModuleMetadata = {
  id: 'stack-operations',
  title: 'Stack Operations',
  category: 'Linear',
  subject: 'DSA',
  description: 'Visualize LIFO (Last-In-First-Out) operations of a Stack.',
  learningObjectives: ['Understand Push and Pop logic.', 'Visualize the TOP element.'],
  complexity: { time: 'O(1)', space: 'O(n)' },
  color: '#2196f3', // VisuAlgo Blue
};

export const QueueModule: ModuleMetadata = {
  id: 'queue-operations',
  title: 'Queue',
  category: 'Linear',
  subject: 'DSA',
  description: 'First-In-First-Out (FIFO) data structure operations.',
  complexity: {
    time: 'O(1)',
    space: 'O(n)',
  },
  color: '#2196f3', // VisuAlgo Blue
};

export function getStackSteps(initialData: number[]): EngineStep[] {
  const steps: EngineStep[] = [];
  const stack: number[] = [];

  // Initial Step
  steps.push({
    elements: [],
    activeLine: 0,
    narrative: "Initializing an empty Stack (LIFO).",
    javaCode: "Stack<Integer> stack = new Stack<>();",
    codeHighlight: [0]
  });

  // Pushing elements
  initialData.forEach((val) => {
    stack.push(val);
    const elements: VisualElement[] = stack.map((v, i) => ({
      id: `stack-${i}`,
      value: v,
      type: 'block',
      colorState: i === stack.length - 1 ? 'active' : 'default',
      label: i === stack.length - 1 ? 'TOP' : undefined
    }));

    steps.push({
      elements,
      activeLine: 1,
      narrative: `Pushing ${val} onto the stack. It becomes the new TOP.`,
      javaCode: `stack.push(${val});`,
      codeHighlight: [1]
    });
  });

  // Popping an element
  if (stack.length > 0) {
    const popped = stack.pop();
    const elements: VisualElement[] = stack.map((v, i) => ({
      id: `stack-${i}`,
      value: v,
      type: 'block',
      colorState: i === stack.length - 1 ? 'warning' : 'default',
      label: i === stack.length - 1 ? 'TOP' : undefined
    }));

    steps.push({
      elements,
      activeLine: 2,
      narrative: `Popping from stack. ${popped} is removed from the TOP.`,
      javaCode: "int value = stack.pop();",
      codeHighlight: [2]
    });
  }

  return steps;
}

export function getQueueSteps(initialData: number[]): EngineStep[] {
  const steps: EngineStep[] = [];
  const queue: number[] = [];

  // Initial Step
  steps.push({
    elements: [],
    activeLine: 0,
    narrative: "Initializing an empty Queue (FIFO).",
    javaCode: "Queue<Integer> queue = new LinkedList<>();",
    codeHighlight: [0]
  });

  // Enqueueing elements
  initialData.forEach((val) => {
    queue.push(val);
    const elements: VisualElement[] = queue.map((v, i) => ({
      id: `queue-${i}`,
      value: v,
      type: 'block',
      colorState: i === 0 ? 'active' : i === queue.length - 1 ? 'active' : 'default',
      label: i === 0 ? 'FRONT' : i === queue.length - 1 ? 'REAR' : undefined
    }));

    steps.push({
      elements,
      activeLine: 1,
      narrative: `Enqueueing ${val}. It enters at the REAR.`,
      javaCode: `queue.add(${val});`,
      codeHighlight: [1]
    });
  });

  // Dequeueing
  if (queue.length > 0) {
    const dequeued = queue.shift();
    const elements: VisualElement[] = queue.map((v, i) => ({
      id: `queue-${i + 1}`, // Keep IDs stable for animation if possible
      value: v,
      type: 'block',
      colorState: i === 0 ? 'warning' : 'default',
      label: i === 0 ? 'FRONT' : i === queue.length - 1 ? 'REAR' : undefined
    }));

    steps.push({
      elements,
      activeLine: 2,
      narrative: `Dequeueing from queue. ${dequeued} is removed from the FRONT.`,
      javaCode: "int value = queue.poll();",
      codeHighlight: [2]
    });
  }

  return steps;
}
