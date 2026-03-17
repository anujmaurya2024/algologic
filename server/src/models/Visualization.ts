import mongoose, { Schema, Document } from 'mongoose';

export interface IVisualization extends Document {
  id: string;
  title: string;
  category: string;
  subject: string;
  description: string;
  learningObjectives: string[];
  complexity: {
    time: string;
    space: string;
  };
  steps: any[];
  createdAt: Date;
}

const VisualizationSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  learningObjectives: { type: [String], default: [] },
  complexity: {
    time: { type: String, required: true },
    space: { type: String, required: true },
  },
  steps: { type: [Schema.Types.Mixed], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVisualization>('Visualization', VisualizationSchema);
