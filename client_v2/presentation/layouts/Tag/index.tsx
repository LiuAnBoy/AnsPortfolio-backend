import { Chip, ChipProps } from '@mui/material';
import styles from '../../../styles/layouts/Tag.module.scss';

interface TagProps extends ChipProps {
  name: string;
}

function Tag({ name, ...props }: TagProps) {
  return (
    <Chip
      variant="outlined"
      color="primary"
      className={styles.tag}
      label={name}
      {...props}
    />
  );
}
export default Tag;
