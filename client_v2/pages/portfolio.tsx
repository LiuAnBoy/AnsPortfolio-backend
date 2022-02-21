import { useEffect, useState } from 'react';
import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Grow,
  ListSubheader,
  Stack,
  Skeleton,
  Modal,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from 'next/router';

import Layout from '../presentation/components/Layout';
import Title from '../presentation/layouts/Title';
import useGetPortfolio from '../applications/portfolio/useGetPortfolio';
import { PortfolioListProps } from '../domain/Portfolio/portfolioListProps';
import useDeviceSize from '../applications/util/useDeviceSize';

import styles from '../styles/pages/Portfolio.module.scss';
import Tag from '../presentation/layouts/Tag';
import PortfolioModal from '../presentation/layouts/PortfolioModal';

const tags = ['all', 'react', 'vue'];

function Portfolio() {
  const { portfolioList, getAllPortfolio, getFilterPortfolio } =
    useGetPortfolio();
  const { width } = useDeviceSize();

  const router = useRouter();

  const [isGrow, setIsGrow] = useState<boolean[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [portfolioData, setPortfolioData] =
    useState<PortfolioListProps | null>();

  useEffect(() => {
    setIsGrow(new Array(portfolioList?.data.length).fill(false));
  }, [portfolioList]);

  const handleMouseOver = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const updateGrowStatus = isGrow.map((item, idx) => {
      const items = idx === index ? !item : item;
      return items;
    });

    setIsGrow(updateGrowStatus);
  };

  const handleMouseLeave = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const updateGrowStatus = isGrow.map((item, idx) => {
      const items = idx === index ? !item : item;
      return items;
    });

    setIsGrow(updateGrowStatus);
  };

  const handlerFilterTag = (tag: string) => {
    if (tag !== 'all') {
      router.push({ query: { tags: tag } });
      getFilterPortfolio(tag);
    } else {
      router.push({ query: null });
      getAllPortfolio();
    }
  };

  const handleModalOpen = (item: PortfolioListProps) => {
    setIsModalOpen(true);
    setPortfolioData(item);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPortfolioData(null);
  };

  // TODO: Filter multiple Tag
  return (
    <section className={styles.layout}>
      <Container maxWidth="md">
        <Title text="Portfolio" />
        <ImageList cols={3}>
          <ImageListItem cols={3}>
            <ListSubheader component="div" disableSticky disableGutters>
              <Stack direction="row" spacing={1}>
                <Tag
                  name="Tags ："
                  size="small"
                  style={{ background: '#DFFCFE' }}
                />
                {tags.map((tag: string) => (
                  <Tag
                    key={tag}
                    size="small"
                    name={tag}
                    onClick={() => handlerFilterTag(tag)}
                  />
                ))}
              </Stack>
            </ListSubheader>
          </ImageListItem>
        </ImageList>
        <ImageList cols={width > 450 ? 3 : 1}>
          {portfolioList
            ? portfolioList.data.map(
                (item: PortfolioListProps, index: number) => (
                  <ImageListItem
                    component="div"
                    key={item.name}
                    onMouseOver={(e: React.MouseEvent<HTMLDivElement>) =>
                      handleMouseOver(index, e)
                    }
                    onMouseOut={(e: React.MouseEvent<HTMLDivElement>) =>
                      handleMouseLeave(index, e)
                    }
                  >
                    <img
                      src={item.image}
                      srcSet={item.image}
                      alt={item.name}
                      style={{ height: 230 }}
                      loading="lazy"
                    />
                    <Grow in={true}>
                      <ImageListItemBar
                        title={item.name}
                        subtitle={item.company}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.name}`}
                            onClick={() => handleModalOpen(item)}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </Grow>
                  </ImageListItem>
                )
              )
            : Array.from(new Array(9)).map((_v) => (
                <ImageListItem key={_v}>
                  <Skeleton width={281} height={230} variant="rectangular" />
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
