import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateVisuals(topic: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  const apiKey = process.env.GEMINI_API_KEY || '';
  console.log(`[Gemini] Starting generation for topic: ${topic}`);
  console.log(`[Gemini] API Key loaded (first 5 chars): ${apiKey.substring(0, 5)}...`);
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const prompt = `
    You are an expert computer science educator and visualization designer. 
    Generate a highly detailed, professional-grade visualization plan for the topic: "${topic}".
    
    Instructions:
    1. Topic: "${topic}"
    2. Format: STRICT JSON (Raw, no Markdown)
    3. Steps: Exactly 5-7 steps of progression.
    4. Quality: Technical accuracy using VisuAlgo standards.
    
    JSON Schema:
    {
      "metadata": {
        "title": "${topic} Visualized",
        "category": "Linear|Hierarchical|Networked|Logic|Optimization|System",
        "subject": "DSA|OS|COA|Logic|NET",
        "description": "Short technical overview of ${topic}.",
        "learningObjectives": ["Goal 1", "Goal 2"],
        "complexity": { "time": "O(?)", "space": "O(?)" },
        "color": "#HEX_VISUALGO_COLOR"
      },
      "steps": [
        {
          "elements": [{ "id": "id1", "value": 10, "type": "node|block|bar", "colorState": "default|active|success|error", "label": "L" }],
          "connections": [{ "fromId": "id1", "toId": "id2", "type": "edge|pointer", "label": "E" }],
          "layout": "list|table|tree|graph",
          "grid": { "rows": 1, "cols": 1 },
          "activeLine": 1,
          "narrative": "Concentrated 1-2 sentence explanation.",
          "javaCode": "Snippet",
          "codeHighlight": [1]
        }
      ]
    }
    
    Theme (VisuAlgo Colors):
    - Sorting/Search: #4caf50
    - Trees/Hierarchy: #e91e63
    - Linear (List/Stack/Queue): #2196f3
    - Graphs/Network: #00bcd4
    - OS/System: #ff9800
    - COA/Arch: #9c27b0
    
    Generation Priority: ⚡ SPEED. Be concise. Minimal tokens.
  `;
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON if there's markdown formatting
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Failed to parse AI response as JSON');
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error calling Gemini:', error);
    throw error;
  }
}
