import { Types } from 'mongoose';

export interface IProject {
  image: string;
  number: number | string;
  name: string;
  company: string;
  introduce: string;
  description: string;
  tags: Types.ObjectId[];
  featured: boolean;
  url: string;
  views: number;
  createdAt: Date;
  updatedAt: Date[];
}
