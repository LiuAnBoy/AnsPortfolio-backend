import TagProps from '../Tag';

export interface PortfolioListProps {
  _id: string;
  number?: number;
  image: string;
  name: string;
  description: string;
  company: string;
  view?: number;
  url?: string;
  createAt: string;
  tags: TagProps[];
}
