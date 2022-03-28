import {
  Dialog,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';

import ProjectsProps from '../../../domain/Projects';
import TagProps from '../../../domain/Tag';
import Tag from '../Tag';
import useDeviceSize from '../../../applications/util/useDeviceSize';

import styles from '../../../styles/layouts/PortfolioModal.module.scss';

interface PortfolioModalProps {
  data: ProjectsProps;
  isOpen: boolean;
  handleClose: () => void;
}

function PortfolioModal({ data, isOpen, handleClose }: PortfolioModalProps) {
  const isLoading = Object.keys(data).length === 0;

  const { width } = useDeviceSize();

  const img_empty = 'https://fakeimg.pl/1000x800/?text=Empty';
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={false}
      scroll="body"
      sx={{ margin: '0' }}
      fullScreen={width > 450 === false}
    >
      <IconButton
        sx={{ position: 'fixed', right: 10, top: 10, zIndex: 8 }}
        onClick={handleClose}
      >
        <CloseIcon sx={{ color: '#fff', fontSize: 30 }} />
      </IconButton>
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          position: 'relative',
          flexDirection: { xs: 'column', md: 'row' },
          borderRadius: { xs: 0 },
        }}
      >
        {isLoading ? (
          <CardContent>Loading</CardContent>
        ) : (
          <>
            <CardMedia
              component="img"
              image={data.image.length === 0 ? img_empty : data.image}
              className={styles.img}
            />
            <Box
              sx={{
                width: { xs: '100%', md: 500 },
              }}
            >
              <CardContent>
                {data.company ? (
                  <Typography variant="subtitle1" className={styles.client}>
                    <Divider textAlign="left">Client</Divider>
                  </Typography>
                ) : null}

                <Typography variant="h5" className={styles.company}>
                  {data.company}
                </Typography>

                <Typography variant="subtitle1" className={styles.client}>
                  <Divider textAlign="left">Name</Divider>
                </Typography>

                <Typography variant="h5" className={styles.name}>
                  {data.name}
                </Typography>
                <Divider sx={{ my: 2 }} />

                {data.introduce ? (
                  <>
                    <Typography variant="subtitle1" className={styles.subtitle}>
                      企業介紹
                      {data.url && (
                        <a
                          href={data.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkIcon />
                        </a>
                      )}
                    </Typography>
                    <Typography variant="body1" className={styles.description}>
                      {data.introduce}
                    </Typography>
                  </>
                ) : null}

                <Typography variant="subtitle1" className={styles.subtitle}>
                  設計
                </Typography>

                <Typography variant="body1" className={styles.description}>
                  {data.description}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  className={styles['tag-group']}
                >
                  {data.tags.map((tag: TagProps) => (
                    <Tag key={tag.name} name={tag.name} size="small" />
                  ))}
                </Stack>
              </CardContent>
            </Box>
          </>
        )}
      </Card>
    </Dialog>
  );
}

export default PortfolioModal;
