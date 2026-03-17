import type { ModuleMetadata } from './types';
import { QuickSortModule } from '../algorithms/sorting/quickSort';
import { BubbleSortModule } from '../algorithms/sorting/bubbleSort';
import { LinearSearchModule } from '../algorithms/searching/linearSearch';
import { BinarySearchModule } from '../algorithms/searching/binarySearch';
import { FCFSModule } from '../algorithms/os/fcfs';
import { LRUModule } from '../algorithms/os/lru';
import { CacheMappingModule } from '../algorithms/coa/cacheMapping';
import { LinkedListModule } from '../algorithms/dsa/linkedList';
import { BSTModule } from '../algorithms/dsa/bst';
import { HashTableModule } from '../algorithms/dsa/hashTable';
import { StackModule, QueueModule } from '../algorithms/dsa/stackQueue';
import { AVLModule } from '../algorithms/dsa/avlTree';
import { DijkstraModule } from '../algorithms/dsa/dijkstra';
import { HeapModule } from '../algorithms/dsa/heap';
import { TCPHandshakeModule } from '../algorithms/networking/tcpHandshake';
import { RoundRobinModule } from '../algorithms/os/roundRobin';

export const ALL_TOPICS: ModuleMetadata[] = [
  // Linear
  LinkedListModule,
  HashTableModule,
  StackModule,
  QueueModule,

  // Hierarchical
  BSTModule,
  AVLModule,
  HeapModule,

  // Networked
  DijkstraModule,
  TCPHandshakeModule,

  // Logic (Sorting & Searching)
  QuickSortModule,
  BubbleSortModule,
  LinearSearchModule,
  BinarySearchModule,
  { 
    id: 'kmp-matching',
    title: 'KMP Algorithm', 
    category: 'Optimization', 
    subject: 'Logic', 
    description: 'Efficient string matching using prefix tables.', 
    complexity: { time: 'O(n+m)', space: 'O(m)' } 
  },

  // --- System ---
  FCFSModule,
  LRUModule,
  CacheMappingModule,
  RoundRobinModule,
];

