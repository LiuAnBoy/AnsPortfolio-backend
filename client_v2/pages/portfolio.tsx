import { useState } from 'react';
import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Stack,
  Divider,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/router';
import LinkIcon from '@mui/icons-material/Link';
import DetailsIcon from '@mui/icons-material/Details';

import Layout from '../presentation/components/Layout';
import useGetPortfolio from '../applications/portfolio/useGetPortfolio';
import ProjectProps from '../domain/Projects';
import useDeviceSize from '../applications/util/useDeviceSize';

import styles from '../styles/pages/Portfolio.module.scss';
import PortfolioModal from '../presentation/layouts/PortfolioModal';
import Helmet from '../presentation/components/Helmet';
import LoadingPage from '../presentation/components/Loading';

const tags = ['All', 'React', 'Vue'];

function Portfolio() {
  const { portfolioList, getAllPortfolio, getFilterPortfolio } =
    useGetPortfolio();
  const { width } = useDeviceSize();

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [portfolioData, setPortfolioData] = useState<ProjectProps>(Object);

  const handlerFilterTag = (tag: string) => {
    if (tag !== 'All') {
      router.push({ query: { tags: tag.toLowerCase() } });
      getFilterPortfolio(tag.toLowerCase());
    } else {
      router.push({ query: null });
      getAllPortfolio();
    }
  };

  const isLoading = portfolioList.length === 0;

  const handleModalOpen = (item: ProjectProps) => {
    setIsModalOpen(true);
    setPortfolioData(item);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPortfolioData(Object);
  };

  const strokeStyle = {
    strokeDasharray: '760',
    strokeWidth: '2px',
    strokeDashoffset: 0,
  };

  const matchTag = (index: number, tag: string) => {
    if (
      Object.keys(router.query).length === index &&
      router.query.tags === undefined
    ) {
      return strokeStyle;
    }
    if (router.query.tags === tag.toLowerCase()) {
      return strokeStyle;
    }
    return {};
  };

  const img_empty = 'https://fakeimg.pl/500x400/?text=Empty';

  if (isLoading) {
    return <LoadingPage />;
  }

  console.log(portfolioData);

  // TODO: Filter multiple Tag
  return (
    <section className={styles.layout}>
      <Helmet subtitle="Portfolio" siteURL="portfolio" />
      <Container maxWidth="md">
        <ImageList cols={3}>
          <ImageListItem cols={3}>
            <ListSubheader component="div" disableSticky disableGutters>
              <Stack direction="row" spacing={1} style={{ overflow: 'hidden' }}>
                {tags.map((tag: string, index: number) => (
                  <div
                    key={tag}
                    className={styles['tag-btn']}
                    onClick={() => handlerFilterTag(tag)}
                    onKeyPress={() => handlerFilterTag(tag)}
                    role="button"
                    tabIndex={index}
                  >
                    <svg
                      height="35"
                      width="100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        className={styles.shape}
                        height="35"
                        width="100"
                        style={matchTag(index, tag)}
                      />
                    </svg>
                    <div>{tag}</div>
                  </div>
                ))}
              </Stack>
            </ListSubheader>
          </ImageListItem>
        </ImageList>
        <Divider className={styles.divider} />
        <ImageList
          cols={width > 450 ? 3 : 1}
          gap={6}
          sx={{ overflow: 'hidden' }}
        >
          {portfolioList.map((item: ProjectProps, index: number) => (
            <ImageListItem
              component="div"
              key={item.name}
              className={styles.block}
              data-aos="fade-up"
              data-aos-delay={`${index * 2}00`}
              data-aos-once="true"
            >
              <img
                src={item.image ? item.image : img_empty}
                srcSet={item.image}
                alt={item.name}
                style={{ height: 230 }}
                loading="lazy"
              />
              <ImageListItemBar
                className={styles['list-bg']}
                title={
                  <Typography variant="h6" className={styles['list-bg-title']}>
                    {item.name}
                  </Typography>
                }
                subtitle={
                  <>
                    <Typography variant="subtitle1">{item.company}</Typography>
                    <Box className={styles['icon-group']}>
                      <Stack spacing={3} direction="row">
                        {item.url && (
                          <IconButton className={styles['icon-btn']}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              // className={styles.link}
                            >
                              <LinkIcon />
                            </a>
                          </IconButton>
                        )}
                        <IconButton
                          sx={{ transform: 'rotate(90deg)' }}
                          className={styles['icon-btn']}
                          onClick={() => handleModalOpen(item)}
                        >
                          <DetailsIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Stack>
                    </Box>
                  </>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <PortfolioModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        data={portfolioData}
      />
    </section>
  );
}

Portfolio.layout = Layout;

export default Portfolio;
