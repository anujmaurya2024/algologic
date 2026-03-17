import { Router } from 'express';
import { generateVisuals } from '../services/geminiService.js';
import Visualization from '../models/Visualization.js';
import mongoose from 'mongoose';

const router = Router();

// In-memory fallback storage
const memoryStore: any[] = [];

// List all visualizations
router.get('/', async (req, res) => {
  try {
    let visualizations = [];
    if (mongoose.connection.readyState === 1) {
      visualizations = await Visualization.find().sort({ createdAt: -1 });
    } else {
      visualizations = [...memoryStore].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    res.json(visualizations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visualizations' });
  }
});

// Generate a new visualization
router.post('/generate', async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  const id = `ai-${topic.toLowerCase().replace(/\s+/g, '-')}`;

  try {
    // Check if it already exists (DB or Memory)
    let existing = null;
    if (mongoose.connection.readyState === 1) {
      existing = await Visualization.findOne({ id });
    } else {
      existing = memoryStore.find(v => v.id === id);
    }

    if (existing) return res.json(existing);

    console.log(`[AI] Generating new visuals for ${topic}...`);
    const result = await generateVisuals(topic);
    
    const vizData = {
      id,
      ...result.metadata,
      steps: result.steps,
      createdAt: new Date()
    };

    // Save to database if connected, else save to memory
    if (mongoose.connection.readyState === 1) {
      const newViz = new Visualization(vizData);
      await newViz.save();
      res.json(newViz);
    } else {
      memoryStore.push(vizData);
      res.json(vizData);
    }
  } catch (error) {
    console.error('Error in /generate:', error);
    res.status(500).json({ error: 'Failed to generate visualization' });
  }
});

// Get a visualization by ID
router.get('/:id', async (req, res) => {
  try {
    let viz = null;
    if (mongoose.connection.readyState === 1) {
      viz = await Visualization.findOne({ id: req.params.id });
    } else {
      viz = memoryStore.find(v => v.id === req.params.id);
    }

    if (!viz) return res.status(404).json({ error: 'Visualization not found' });
    res.json(viz);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
