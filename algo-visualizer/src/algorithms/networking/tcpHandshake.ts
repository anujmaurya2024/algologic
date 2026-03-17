import type { EngineStep, VisualElement, ModuleMetadata } from '../../engine/types';

export const TCPHandshakeModule: ModuleMetadata = {
  id: 'tcp-handshake',
  title: 'TCP 3-Way Handshake',
  category: 'Networked',
  subject: 'NET',
  description: 'Visualize the connection establishment process of TCP using SYN, SYN-ACK, and ACK packets.',
  learningObjectives: [
    'Understand the sequence of packet exchange.',
    'Visualize sequence and acknowledgement numbers.',
    'Identify the state changes in client and server.'
  ],
  complexity: { time: 'O(1)', space: 'O(1)' },
  color: '#2196f3', // VisuAlgo Blue
};

export function getTCPHandshakeSteps(): EngineStep[] {
  const steps: EngineStep[] = [];
  
  const client: VisualElement = { id: 'client', value: 0, type: 'node', label: 'Client (CLOSED)', colorState: 'default' };
  const server: VisualElement = { id: 'server', value: 0, type: 'node', label: 'Server (LISTEN)', colorState: 'default' };

  // Step 0: Initial State
  steps.push({
    elements: [client, server],
    activeLine: 0,
    narrative: "Initial state: Client is CLOSED, Server is in LISTEN state, waiting for connections.",
    javaCode: "// TCP Handshake start\nSocket socket = new Socket(\"server_ip\", 80);",
    codeHighlight: [0]
  });

  // Step 1: Client sends SYN
  const synPacket: VisualElement = { id: 'syn', value: 0, type: 'block', label: 'SYN (Seq=x)', colorState: 'active' };
  steps.push({
    elements: [{ ...client, label: 'Client (SYN_SENT)' }, server, synPacket],
    connections: [{ fromId: 'client', toId: 'syn', type: 'edge', label: 'Sending SYN' }],
    activeLine: 1,
    narrative: "Client sends a SYN packet to the server with a random sequence number 'x'. Client enters SYN_SENT state.",
    javaCode: "Client: send(SYN, seq=x);",
    codeHighlight: [1]
  });

  // Step 2: Server receives SYN, sends SYN-ACK
  const synAckPacket: VisualElement = { id: 'syn-ack', value: 0, type: 'block', label: 'SYN-ACK (Seq=y, Ack=x+1)', colorState: 'active' };
  steps.push({
    elements: [{ ...client, label: 'Client (SYN_SENT)' }, { ...server, label: 'Server (SYN_RCVD)' }, synAckPacket],
    connections: [{ fromId: 'server', toId: 'syn-ack', type: 'edge', label: 'Sending SYN-ACK' }],
    activeLine: 2,
    narrative: "Server receives SYN, allocates buffers/vars, and sends SYN-ACK. Sequence is 'y', Ack is 'x+1'. Server enters SYN_RCVD state.",
    javaCode: "Server: receive(SYN);\nServer: send(SYN-ACK, seq=y, ack=x+1);",
    codeHighlight: [2, 3]
  });

  // Step 3: Client receives SYN-ACK, sends ACK
  const ackPacket: VisualElement = { id: 'ack', value: 0, type: 'block', label: 'ACK (Seq=x+1, Ack=y+1)', colorState: 'active' };
  steps.push({
    elements: [{ ...client, label: 'Client (ESTABLISHED)' }, { ...server, label: 'Server (SYN_RCVD)' }, ackPacket],
    connections: [{ fromId: 'client', toId: 'ack', type: 'edge', label: 'Sending ACK' }],
    activeLine: 4,
    narrative: "Client receives SYN-ACK, enters ESTABLISHED state, and sends an ACK packet with sequence 'x+1' and Ack 'y+1'.",
    javaCode: "Client: receive(SYN-ACK);\nClient: send(ACK, seq=x+1, ack=y+1);",
    codeHighlight: [4, 5]
  });

  // Step 4: Connection Established
  steps.push({
    elements: [{ ...client, label: 'Client (ESTABLISHED)', colorState: 'success' }, { ...server, label: 'Server (ESTABLISHED)', colorState: 'success' }],
    activeLine: 6,
    narrative: "Server receives ACK. Both sides are now in the ESTABLISHED state. Data transfer can begin!",
    javaCode: "Server: receive(ACK);\n// Connection Established",
    codeHighlight: [6]
  });

  return steps;
}
