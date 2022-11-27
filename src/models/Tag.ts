import { model, Schema } from 'mongoose';
import { ITag } from '../interfaces/models/Tag';

export interface ITagModel extends ITag, Document {}

export const TagSchema = new Schema<ITagModel>({
  name: { type: String, required: true },
});

const Tag = model<ITagModel>('tag', TagSchema);

export default Tag;
