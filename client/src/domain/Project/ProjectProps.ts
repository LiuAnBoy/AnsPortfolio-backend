import { TagProps } from '../Tag/TagProps';

export interface ProjectProps {
  image?: string;
  name?: string;
  number?: string;
  views?: number;
  _id?: string;
  company?: string;
  introduce?: string;
  description?: string;
  featured?: boolean;
  url?: string;
  tags: TagProps[];
  createdAt?: string;
  updatedAt?: string;
}
