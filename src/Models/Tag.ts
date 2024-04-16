import { model, Schema } from 'mongoose';

export interface TagModel extends TagProps, Document {}

export const TagSchema = new Schema<TagModel>({
  label: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  type: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: 'project' }],
});

const Tag = model<TagModel>('tag', TagSchema);

export default Tag;

export interface TagProps {
  label: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  projects: Schema.Types.ObjectId[];
}
