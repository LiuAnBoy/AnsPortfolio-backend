import { Button, Container } from '@mui/material';
import { useRouter } from 'next/router';

import Title from '../../layouts/Title';
import FeaturedProjectCard from '../../layouts/FeaturedProjectCard';
import styles from '../../../styles/components/Project.module.scss';
import useGetPortfolio from '../../../applications/portfolio/useGetPortfolio';
import LoadingPage from '../Loading';

function Projects() {
  const router = useRouter();
  const { portfolioList } = useGetPortfolio();

  const goPage = () => {
    router.push('/portfolio');
  };

  if (portfolioList.length === 0) {
    return <LoadingPage />;
  }

  return (
    <section className={styles.section} id="featured-section">
      <Container maxWidth="lg">
        <Title text="Portfolio" />
        {portfolioList.map((data, index) => {
          return (
            <FeaturedProjectCard key={data.name} data={data} index={index} />
          );
        })}
      </Container>
      <Button onClick={goPage} size="large" className={styles.button}>
        See More
      </Button>
    </section>
  );
}

export default Projects;
