import { Chip, ChipProps } from '@mui/material';
import styles from '../../../styles/layouts/Tag.module.scss';

interface TagProps extends ChipProps {
  name: string;
}

function Tag({ name, ...props }: TagProps) {
  return (
    <Chip variant="filled" className={styles.tag} label={name} {...props} />
  );
}
export default Tag;
