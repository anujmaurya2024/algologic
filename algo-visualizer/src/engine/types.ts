// src/engine/types.ts

export type ElementType = 'bar' | 'block' | 'node';
export type SubjectCategory = 'Linear' | 'Hierarchical' | 'Networked' | 'Logic' | 'Optimization' | 'System';

export interface VisualElement {
  id: string | number;
  value: number;
  label?: string;
  subLabel?: string;
  type: ElementType;
  colorState: 'default' | 'active' | 'success' | 'warning' | 'error' | 'pivot' | 'comparing' | 'swapping';
}

export interface Connection {
  fromId: string;
  toId: string;
  label?: string;
  type: 'pointer' | 'edge';
  colorState?: 'active' | 'default' | 'error';
}

export interface EngineStep {
  elements: VisualElement[];
  connections?: Connection[];
  layout?: 'list' | 'table' | 'tree' | 'graph';
  grid?: { rows: number; cols: number };
  activeLine: number;
  narrative: string;
  javaCode?: string;      // Java implementation snippet
  codeHighlight?: number[]; // Specific lines to highlight in the snippet
  metadata?: {
    activePage?: number;
    isHit?: boolean;
    [key: string]: any;
  };
}

export interface ModuleMetadata {
  id: string;
  title: string;
  category: SubjectCategory;
  subject: 'DSA' | 'OS' | 'COA' | 'Logic' | 'NET';
  description: string;
  learningObjectives?: string[]; // Flexible list of educational goals

  complexity: {
    time: string;
    space: string;
    worst?: string;
  };
  color?: string; // Hex color for the module theme
}



