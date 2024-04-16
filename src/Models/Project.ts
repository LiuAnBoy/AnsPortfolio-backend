import { model, Schema, Types } from 'mongoose';

export interface IProjectModel extends IProject, Document {}

export const ProjectSchema = new Schema<IProjectModel>({
  image: { type: Schema.Types.ObjectId, ref: 'image' },
  name: { type: String, required: true },
  company: { type: String, default: '' },
  introduce: { type: String, default: '' },
  description: { type: String, default: '' },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tag',
    },
  ],
  featured: { type: Boolean, default: false },
  url: { type: String, default: '' },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Project = model<IProjectModel>('project', ProjectSchema);

export default Project;

export interface IProject {
  image: Types.ObjectId;
  name: string;
  company: string;
  introduce: string;
  description: string;
  tags: Types.ObjectId[];
  featured: boolean;
  url: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageProps {
  url: string;
  public_id: string;
}
