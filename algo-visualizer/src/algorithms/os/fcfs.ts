// src/algorithms/os/fcfs.ts
import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const FCFSModule: ModuleMetadata = {
  id: 'fcfs-scheduling',
  title: 'FCFS Scheduling',
  category: 'System',
  subject: 'OS',
  description: 'First-Come, First-Served CPU scheduling algorithm. Processes are executed in the order they arrive.',
  complexity: {
    time: 'O(n)',
    space: 'O(n)',
  },
  color: '#ff9800', // VisuAlgo Orange
};

interface Process {
  id: string;
  arrival: number;
  burst: number;
}

export function getFCFSSteps(processes: Process[]): EngineStep[] {
  const steps: EngineStep[] = [];
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  
  let currentTime = 0;
  const completed: { id: string; start: number; end: number }[] = [];

  const recordStep = (activeId: string | null = null, narrative: string, line: number) => {
    const elements: VisualElement[] = sorted.map((p) => {
      const comp = completed.find(c => c.id === p.id);
      let colorState: VisualElement['colorState'] = 'default';
      let subLabel = `Arr: ${p.arrival}, Burst: ${p.burst}`;
      
      if (comp) {
        colorState = 'success';
        subLabel = `Start: ${comp.start}, End: ${comp.end}`;
      } else if (activeId === p.id) {
        colorState = 'active';
      }

      return {
        id: `process-${p.id}`,
        value: p.burst,
        label: p.id,
        subLabel,
        type: 'block',
        colorState,
      };
    });

    steps.push({
      elements,
      activeLine: line,
      narrative,
    });
  };

  recordStep(null, "🚀 Ready to schedule processes in FCFS order.", 0);

  for (const p of sorted) {
    if (currentTime < p.arrival) {
      recordStep(null, `Idle time: CPU is waiting for ${p.id} to arrive at T=${p.arrival}.`, 1);
      currentTime = p.arrival;
    }

    recordStep(p.id, `⚡ CPU is executing ${p.id} for ${p.burst} units.`, 2);
    
    const start = currentTime;
    currentTime += p.burst;
    completed.push({ id: p.id, start, end: currentTime });

    recordStep(null, `✅ ${p.id} completed at T=${currentTime}.`, 3);
  }

  recordStep(null, "🏁 All processes finished. FCFS scheduling complete.", 4);

  return steps;
}
