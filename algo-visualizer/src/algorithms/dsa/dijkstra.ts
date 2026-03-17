import type { EngineStep, VisualElement, Connection, ModuleMetadata } from '../../engine/types';

export const DijkstraModule: ModuleMetadata = {
  id: 'dijkstra-algorithm',
  title: 'Dijkstra Algorithm',
  category: 'Networked',
  subject: 'DSA',
  description: 'Find the shortest path in a weighted graph.',
  learningObjectives: ['Understand edge relaxation.', 'Path discovery flow.'],
  complexity: {
    time: 'O((V+E) log V)',
    space: 'O(V)',
  },
  color: '#00bcd4', // VisuAlgo Cyan
};

export function getDijkstraSteps(): EngineStep[] {
  const steps: EngineStep[] = [];
  
  // Static Graph Definition for demo
  // Nodes: A(0), B(1), C(2), D(3), E(4)
  const elements: VisualElement[] = [
    { id: 'A', value: 0, type: 'node', colorState: 'default', label: 'Dist: 0' },
    { id: 'B', value: 0, type: 'node', colorState: 'default', label: 'Dist: ∞' },
    { id: 'C', value: 0, type: 'node', colorState: 'default', label: 'Dist: ∞' },
    { id: 'D', value: 0, type: 'node', colorState: 'default', label: 'Dist: ∞' },
    { id: 'E', value: 0, type: 'node', colorState: 'default', label: 'Dist: ∞' },
  ];

  const connections: Connection[] = [
    { fromId: 'A', toId: 'B', label: '4', type: 'edge' },
    { fromId: 'A', toId: 'C', label: '2', type: 'edge' },
    { fromId: 'B', toId: 'C', label: '5', type: 'edge' },
    { fromId: 'B', toId: 'D', label: '10', type: 'edge' },
    { fromId: 'C', toId: 'E', label: '3', type: 'edge' },
    { fromId: 'E', toId: 'D', label: '4', type: 'edge' },
  ];

  steps.push({
    elements: JSON.parse(JSON.stringify(elements)),
    connections: JSON.parse(JSON.stringify(connections)),
    activeLine: 0,
    narrative: "Setting up the graph. A is the source node with Distance 0, others are ∞.",
    javaCode: "PriorityQueue<Node> pq = new PriorityQueue<>();\npq.add(source);",
    codeHighlight: [0, 1]
  });

  // Step 1: Visit A
  elements[0].colorState = 'active';
  steps.push({
    elements: JSON.parse(JSON.stringify(elements)),
    connections: JSON.parse(JSON.stringify(connections)),
    activeLine: 1,
    narrative: "Visiting node A. Exploring neighbors B (4) and C (2).",
    javaCode: "Node curr = pq.poll();\nfor(Edge e : curr.edges) { ... }",
    codeHighlight: [2]
  });

  // Step 2: Relax A->C
  elements[2].label = 'Dist: 2';
  elements[2].colorState = 'active';
  connections[1].colorState = 'active';
  steps.push({
    elements: JSON.parse(JSON.stringify(elements)),
    connections: JSON.parse(JSON.stringify(connections)),
    activeLine: 2,
    narrative: "Found shorter path to C via A (Distance: 2). Updating C.",
    javaCode: "if(dist[v] > dist[u] + weight) {\n  dist[v] = dist[u] + weight;\n}",
    codeHighlight: [3]
  });

  // Step 3: Relax C->E
  elements[4].label = 'Dist: 5';
  elements[4].colorState = 'active';
  connections[4].colorState = 'active';
  steps.push({
    elements: JSON.parse(JSON.stringify(elements)),
    connections: JSON.parse(JSON.stringify(connections)),
    activeLine: 2,
    narrative: "Exploring from C. Found path to E via C (2+3 = 5).",
    javaCode: "dist[E] = dist[C] + 3;",
    codeHighlight: [3]
  });

  // Step 4: Visit E->D
  elements[3].label = 'Dist: 9';
  elements[3].colorState = 'active';
  connections[5].colorState = 'active';
  steps.push({
    elements: JSON.parse(JSON.stringify(elements)),
    connections: JSON.parse(JSON.stringify(connections)),
    activeLine: 2,
    narrative: "Exploring from E. Found path to D via E (5+4 = 9). Path: A->C->E->D.",
    javaCode: "dist[D] = dist[E] + 4;",
    codeHighlight: [3]
  });

  elements.forEach(e => e.colorState = 'success');
  steps.push({
    elements: JSON.parse(JSON.stringify(elements)),
    connections: JSON.parse(JSON.stringify(connections)),
    activeLine: 3,
    narrative: "Shortest paths from Source A have been calculated for all nodes.",
    javaCode: "return shortestPaths;",
    codeHighlight: [4]
  });

  return steps;
}
