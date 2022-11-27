import { model, Schema } from 'mongoose';
import { IProject } from '../interfaces/models/Project';

export interface IProjectModel extends IProject, Document {}

export const ProjectSchema = new Schema<IProjectModel>({
  image: { type: String },
  number: { type: Number, required: true },
  name: { type: String, required: true },
  company: { type: String },
  introduce: { type: String },
  description: { type: String },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tag',
    },
  ],
  featured: { type: Boolean, required: true },
  url: { type: String },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: [{ type: Date }],
});

const Project = model<IProjectModel>('project', ProjectSchema);

export default Project;
