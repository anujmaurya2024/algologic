import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import visualizationRoutes from './routes/visualizationRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/visualizations', visualizationRoutes);

async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/anti-gravity';
  
  try {
    console.log(`[Database] Attempting to connect to ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('✅ Connected to Local MongoDB');
  } catch (err) {
    console.warn('⚠️ MongoDB not available. Application will use in-memory storage for this session.');
    console.warn('   (Note: Data will be lost when the server restarts)');
    // In-memory fallback is handled by the route logic when mongoose is not connected
  }
}

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`📡 Server is running on port ${PORT}`);
    console.log(`🚀 AI Engine ready at http://localhost:${PORT}`);
  });
});

export default app;
