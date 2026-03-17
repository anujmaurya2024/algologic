// src/algorithms/dsa/bst.ts
import type { EngineStep, VisualElement, Connection, ModuleMetadata } from '../../engine/types';

export const BSTModule: ModuleMetadata = {
  id: 'binary-search-tree',
  title: 'Binary Search Tree',
  category: 'Hierarchical',
  subject: 'DSA',
  description: 'A tree where the left child is smaller and the right child is larger than the parent. Visualizes the recursive insertion process.',
  learningObjectives: [
    "Efficiently maintains sorted data (average O(log n)).",
    "Recursive structure used for searching and sorting.",
    "Fundamental for balanced trees like AVL and Red-Black."
  ],
  complexity: {
    time: 'Average O(log n), Worst O(n)',
    space: 'O(n)',
  },
  color: '#e91e63', // VisuAlgo Pink
};

const JAVA_IMPLEMENTATION = `public class BST {
    Node root;

    public void insert(int val) {
        root = insertRec(root, val);
    }

    private Node insertRec(Node root, int val) {
        if (root == null) return new Node(val);
        if (val < root.val) 
            root.left = insertRec(root.left, val);
        else 
            root.right = insertRec(root.right, val);
        return root;
    }
}`;

interface TreeNode {
  id: string;
  val: number;
  left?: TreeNode;
  right?: TreeNode;
  x?: number; // Layout help
  y?: number;
}

export function getBSTSteps(values: number[]): EngineStep[] {
  const steps: EngineStep[] = [];
  let root: TreeNode | null = null;

  const getVisualElements = (node: TreeNode | null, currentActiveId: string | null): VisualElement[] => {
    if (!node) return [];
    return [
      {
        id: node.id,
        value: node.val,
        type: 'block',
        colorState: node.id === currentActiveId ? 'active' : 'default'
      },
      ...getVisualElements(node.left || null, currentActiveId),
      ...getVisualElements(node.right || null, currentActiveId)
    ];
  };

  const getConnections = (node: TreeNode | null): Connection[] => {
    if (!node) return [];
    const conns: Connection[] = [];
    if (node.left) {
      conns.push({ fromId: node.id, toId: node.left.id, type: 'edge' });
      conns.push(...getConnections(node.left));
    }
    if (node.right) {
      conns.push({ fromId: node.id, toId: node.right.id, type: 'edge' });
      conns.push(...getConnections(node.right));
    }
    return conns;
  };

  const recordStep = (activeId: string | null, narrative: string, line: number, highlights: number[]) => {
    steps.push({
      elements: getVisualElements(root, activeId),
      connections: getConnections(root),
      activeLine: line,
      narrative,
      javaCode: JAVA_IMPLEMENTATION,
      codeHighlight: highlights
    });
  };

  steps.push({
    elements: [],
    connections: [],
    activeLine: 0,
    narrative: "🚀 Initializing empty Binary Search Tree.",
    javaCode: JAVA_IMPLEMENTATION,
    codeHighlight: [1, 2]
  });

  for (const val of values) {
    const insert = (node: TreeNode | null, v: number): TreeNode => {
      const id = `node-${Math.random().toString(36).substr(2, 9)}`;
      if (!node) {
        const newNode = { id, val: v };
        recordStep(id, `✨ Inserted ${v} as a new leaf node.`, 10, [10]);
        return newNode;
      }

      recordStep(node.id, `🔍 Comparing ${v} with current node ${node.val}...`, 11, [11]);
      
      if (v < node.val) {
        recordStep(node.id, `⬅️ ${v} < ${node.val}, moving to left subtree.`, 12, [12, 13]);
        node.left = insert(node.left || null, v);
      } else {
        recordStep(node.id, `➡️ ${v} >= ${node.val}, moving to right subtree.`, 14, [14, 15]);
        node.right = insert(node.right || null, v);
      }
      return node;
    };

    root = insert(root, val);
  }

  return steps;
}
