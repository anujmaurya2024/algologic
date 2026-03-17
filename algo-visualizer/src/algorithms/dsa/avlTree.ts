import type { EngineStep, VisualElement, Connection, ModuleMetadata } from '../../engine/types';

export const AVLModule: ModuleMetadata = {
  id: 'avl-tree',
  title: 'AVL Tree (Rotations)',
  category: 'Hierarchical',
  subject: 'DSA',
  description: 'Self-balancing binary search trees with animated rotations.',
  learningObjectives: ['Visualize Right and Left rotations.', 'Understand height rebalancing.'],
  complexity: {
    time: 'O(log n)',
    space: 'O(n)',
  },
  color: '#e91e63', // VisuAlgo Pink
};

interface AVLNode {
  val: number;
  height: number;
  left: AVLNode | null;
  right: AVLNode | null;
  x: number;
  y: number;
}

export function getAVLSteps(values: number[]): EngineStep[] {
  const steps: EngineStep[] = [];
  let root: AVLNode | null = null;

  function getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  function getBalance(node: AVLNode | null): number {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
  }

  function recordStep(narrative: string, activeVal?: number) {
    const elements: VisualElement[] = [];
    const connections: Connection[] = [];

    function traverse(node: AVLNode, px: number, py: number, level: number) {
      const id = `node-${node.val}`;
      elements.push({
        id,
        value: node.val,
        type: 'node',
        colorState: node.val === activeVal ? 'active' : 'default',
        label: `H:${node.height}`
      });

      if (node.left) {
        connections.push({
          fromId: id,
          toId: `node-${node.left.val}`,
          type: 'edge'
        });
        traverse(node.left, px - 100 / (level + 1), py + 80, level + 1);
      }
      if (node.right) {
        connections.push({
          fromId: id,
          toId: `node-${node.right.val}`,
          type: 'edge'
        });
        traverse(node.right, px + 100 / (level + 1), py + 80, level + 1);
      }
    }

    if (root) traverse(root, 400, 50, 0);
    steps.push({ elements, connections, activeLine: 1, narrative });
  }

  function rotateRight(y: AVLNode): AVLNode {
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    return x;
  }

  function rotateLeft(x: AVLNode): AVLNode {
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    return y;
  }

  function insert(node: AVLNode | null, val: number): AVLNode {
    if (!node) {
      return { val, height: 1, left: null, right: null, x: 0, y: 0 };
    }

    if (val < node.val) node.left = insert(node.left, val);
    else if (val > node.val) node.right = insert(node.right, val);
    else return node;

    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    const balance = getBalance(node);

    // Left Left case
    if (balance > 1 && val < node.left!.val) {
      recordStep(`Imbalance detected at ${node.val}. Performing Right Rotation.`, node.val);
      return rotateRight(node);
    }
    // Right Right case
    if (balance < -1 && val > node.right!.val) {
      recordStep(`Imbalance detected at ${node.val}. Performing Left Rotation.`, node.val);
      return rotateLeft(node);
    }
    // Left Right case
    if (balance > 1 && val > node.left!.val) {
      node.left = rotateLeft(node.left!);
      recordStep(`Double rotation needed at ${node.val}. Step 1: Left Rotate child.`, node.val);
      return rotateRight(node);
    }
    // Right Left case
    if (balance < -1 && val < node.right!.val) {
      node.right = rotateRight(node.right!);
      recordStep(`Double rotation needed at ${node.val}. Step 1: Right Rotate child.`, node.val);
      return rotateLeft(node);
    }

    return node;
  }

  values.forEach(v => {
    root = insert(root, v);
    recordStep(`Inserted ${v} into the AVL Tree and rebalanced.`);
  });

  return steps;
}
