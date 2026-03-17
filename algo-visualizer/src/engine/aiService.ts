// src/engine/aiService.ts
import type { EngineStep, ModuleMetadata } from './types';


export interface AIGeneratedContent {
  metadata: ModuleMetadata;
  steps: EngineStep[];
}

const API_URL = 'http://localhost:5000/api/visualizations';

/**
 * Calls the backend API to generate or retrieve algorithm visualization steps.
 */
export async function generateAlgorithmVisuals(topic: string): Promise<AIGeneratedContent> {
  console.log(`[AI Engine] Requesting visuals for: ${topic}`);

  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });

    if (!response.ok) {
      throw new Error(`Failed to generate visuals: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      metadata: {
        id: data.id,
        title: data.title,
        category: data.category,
        subject: data.subject,
        description: data.description,
        learningObjectives: data.learningObjectives,
        complexity: data.complexity
      },
      steps: data.steps
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}
