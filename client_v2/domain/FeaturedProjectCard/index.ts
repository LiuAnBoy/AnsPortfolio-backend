import TagProps from '../Tag';

interface FeaturedProjectCardProps {
  image: string;
  name: string;
  number: number;
  views: number;
  _id: string;
  company: string;
  description: string;
  featured: boolean;
  url: string;
  tags: TagProps[];
}

export default FeaturedProjectCardProps;
