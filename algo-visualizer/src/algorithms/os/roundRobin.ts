import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const RoundRobinModule: ModuleMetadata = {
  id: 'round-robin-scheduling',
  title: 'Round Robin Scheduling',
  category: 'System',
  subject: 'OS',
  description: 'Visualize how processes are scheduled using a fixed time quantum, ensuring fairness.',
  learningObjectives: [
    'Understand time quantum and context switching.',
    'Visualize the Ready Queue (FIFO).',
    'Understand Preemption in OS scheduling.'
  ],
  complexity: { time: 'O(n)', space: 'O(n)' },
  color: '#ff9800', // VisuAlgo Orange
};

interface Process {
  id: string;
  burst: number;
  remaining: number;
  completion?: number;
}

export function getRoundRobinSteps(initialProcesses: { id: string, burst: number }[], quantum: number): EngineStep[] {
  const steps: EngineStep[] = [];
  const processes: Process[] = initialProcesses.map(p => ({ ...p, remaining: p.burst }));
  const readyQueue: Process[] = [...processes];
  const completed: Process[] = [];
  let currentTime = 0;

  function recordStep(narrative: string, activeId?: string) {
    const elements: VisualElement[] = [
      // Ready Queue
      ...readyQueue.map((p) => ({
        id: `queue-${p.id}`,
        value: p.remaining,
        type: 'block' as const,
        label: `${p.id} (${p.remaining})`,
        colorState: (p.id === activeId ? 'active' : 'default') as any
      })),
      // CPU
      ...(activeId ? [{
        id: 'cpu',
        value: 0,
        type: 'node' as const,
        label: `CPU: ${activeId}`,
        colorState: 'active' as any
      }] : []),
      // Completed
      ...completed.map((p) => ({
        id: `done-${p.id}`,
        value: p.burst,
        type: 'block' as const,
        label: `${p.id} (DONE)`,
        colorState: 'success' as any
      }))
    ];

    steps.push({
      elements,
      activeLine: activeId ? 2 : 1,
      narrative: `Time ${currentTime}: ${narrative}`,
      javaCode: `// Round Robin (Quantum=${quantum})\nwhile(!queue.isEmpty()) {\n  Process p = queue.poll();\n  execute(p, quantum);\n}`,
      codeHighlight: activeId ? [2, 3] : [1]
    });
  }

  recordStep("Initial state: Processes are in the Ready Queue.");

  while (readyQueue.length > 0) {
    const current = readyQueue.shift()!;
    const executionTime = Math.min(current.remaining, quantum);
    
    current.remaining -= executionTime;
    currentTime += executionTime;

    recordStep(`Running ${current.id} for ${executionTime} units.`, current.id);

    if (current.remaining > 0) {
      readyQueue.push(current);
      recordStep(`${current.id} preempted. Re-entering Ready Queue.`, current.id);
    } else {
      current.completion = currentTime;
      completed.push(current);
      recordStep(`${current.id} finished execution.`, current.id);
    }
  }

  recordStep("All processes have completed their execution.");

  return steps;
}
