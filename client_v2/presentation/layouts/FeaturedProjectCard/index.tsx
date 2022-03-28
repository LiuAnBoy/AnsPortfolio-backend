import { CardContent, Typography, CardActions, Stack } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

import ProjectsProps from '../../../domain/Projects';
import Tag from '../Tag';

import styles from '../../../styles/layouts/FeaturedProjectCard.module.scss';

function FeaturedProjectCard({ index, data }: CardProps) {
  const { image, name, description, tags, company, url } = data;

  const img_empty = 'https://fakeimg.pl/500x400/?text=Empty';

  return (
    <div className={styles.card} data-aos="fade-up" data-aos-once="true">
      <div
        className={
          (index + 1) % 2 === 0
            ? styles.card_image_box_even
            : styles.card_image_box
        }
      >
        <img
          className={styles.card_image}
          alt={name}
          src={image.length !== 0 ? image : img_empty}
        />
      </div>
      <CardContent
        className={
          (index + 1) % 2 === 0 ? styles.card_info_even : styles.card_info
        }
      >
        <Typography variant="h6" className={styles['info-title']}>
          {`${company} - ${name}`}
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <LinkIcon />
            </a>
          ) : null}
        </Typography>

        <hr className={styles.hr} />

        <Typography variant="subtitle2" className={styles['info-description']}>
          {description}
        </Typography>

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            marginTop: 1,
          }}
        >
          <Stack
            spacing={{ xs: 0.4, md: 1 }}
            direction="row"
            className={styles.stack}
          >
            {tags.map((tag) => {
              return <Tag size="small" key={tag._id} name={tag.name} />;
            })}
          </Stack>
        </CardActions>
      </CardContent>
    </div>
  );
}

export default FeaturedProjectCard;

interface CardProps {
  index: number;
  data: ProjectsProps;
}
