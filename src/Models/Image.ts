import { model, Schema, Types } from 'mongoose';

export interface ImageModal extends ImageProps, Document {}

export const ImageSchema = new Schema<ImageModal>({
  public_id: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  url: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  folder: { type: String },
  of: [{ type: Schema.Types.ObjectId, ref: 'project' }],
});

const Image = model<ImageModal>('image', ImageSchema);

export default Image;

export interface ImageProps {
  public_id: string;
  createdAt: Date;
  url: string;
  user: Types.ObjectId;
  folder: string;
  of: Types.ObjectId[] | Types.ObjectId;
  updatedAt: Date;
}
