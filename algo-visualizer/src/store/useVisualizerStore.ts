// src/store/useVisualizerStore.ts
import { create } from 'zustand';
import type { EngineStep, ModuleMetadata } from '../engine/types';

interface VisualizerState {
  steps: EngineStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number;
  activeModule: ModuleMetadata | null;

  // Actions
  initializeModule: (module: ModuleMetadata, steps: EngineStep[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  setPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
  goToStep: (index: number) => void;

  // Derived
  getCurrentStep: () => EngineStep | null;
  isAtStart: () => boolean;
  isAtEnd: () => boolean;
}

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 600,
  activeModule: null,

  initializeModule: (module, steps) =>
    set({ activeModule: module, steps, currentStepIndex: 0, isPlaying: false }),

  nextStep: () =>
    set((state) => ({
      currentStepIndex: Math.min(state.currentStepIndex + 1, state.steps.length - 1),
    })),

  prevStep: () =>
    set((state) => ({
      currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
    })),

  setPlaying: (isPlaying) => set({ isPlaying }),

  setSpeed: (speed) => set({ playbackSpeed: speed }),

  reset: () => set({ currentStepIndex: 0, isPlaying: false }),

  goToStep: (index) =>
    set((state) => ({
      currentStepIndex: Math.max(0, Math.min(index, state.steps.length - 1)),
    })),

  getCurrentStep: () => {
    const { steps, currentStepIndex } = get();
    return steps[currentStepIndex] ?? null;
  },

  isAtStart: () => get().currentStepIndex === 0,

  isAtEnd: () => {
    const { steps, currentStepIndex } = get();
    return currentStepIndex >= steps.length - 1;
  },
}));

