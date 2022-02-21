import {
  CardContent,
  Typography,
  Collapse,
  CardActions,
  IconButton,
  IconButtonProps,
  Stack,
} from '@mui/material';
import styled from '@emotion/styled';
import { ExpandMoreOutlined } from '@mui/icons-material';

import theme from '../../../styles/theme';
import FeaturedProjectCardProps from '../../../domain/FeaturedProjectCard';
import Tag from '../Tag';

import styles from '../../../styles/layouts/FeaturedProjectCard.module.scss';

function FeaturedProjectCard({
  handleExpandClick,
  isExpand,
  index,
  data,
}: CardProps) {
  const { image, name, number, description, tags } = data;

  const ExpandMore = styled((props: ExpandMoreProps) => {
    /* eslint @typescript-eslint/no-unused-vars: ["off"] */
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    padding: 0,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <div className={styles.card}>
      <div
        className={
          (index + 1) % 2 === 0
            ? styles.card_image_box_even
            : styles.card_image_box
        }
      >
        <img className={styles.card_image} alt={name} src={image} />
      </div>
      <CardContent
        className={
          (index + 1) % 2 === 0 ? styles.card_info_even : styles.card_info
        }
      >
        <Typography variant="h6" className={styles.card_info_no}>
          {number}.
        </Typography>
        <Typography variant="h6" className={styles.card_info_title}>
          {name}
        </Typography>
        <Collapse in={isExpand} collapsedSize={60}>
          <Typography
            variant="subtitle2"
            style={{ letterSpacing: 1.5, fontWeight: 400 }}
            className={isExpand ? '' : styles.card_info_content}
          >
            {description}
          </Typography>
        </Collapse>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: 0,
            paddingRight: 0,
            marginTop: 1,
          }}
        >
          <Stack spacing={1} direction="row" className={styles.stack}>
            {tags.map((tag) => {
              return <Tag size="small" key={tag._id} name={tag.name} />;
            })}
          </Stack>
          <ExpandMore expand={isExpand} onClick={handleExpandClick}>
            <ExpandMoreOutlined />
          </ExpandMore>
        </CardActions>
      </CardContent>
    </div>
  );
}

export default FeaturedProjectCard;

interface CardProps {
  index: number;
  handleExpandClick: () => void;
  isExpand: boolean;
  data: FeaturedProjectCardProps;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
