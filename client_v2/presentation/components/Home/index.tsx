import { Box } from '@mui/material';
import Marquee from 'react-fast-marquee';
import * as Scroll from 'react-scroll';
import styles from '../../../styles/components/Home.module.scss';

function Home() {
  const scroll = Scroll.scroller;

  const handleScrollDown = () => {
    scroll.scrollTo('featured-section', {
      duration: 800,
      smooth: true,
    });
  };

  return (
    <section className={styles.section}>
      <Box className={styles['container-md']}>
        <div className={styles['ani-container']}>
          <hr className={`${styles['ani-bg-line']} ${styles['line-top']}`} />
          <hr className={`${styles['ani-bg-line']} ${styles['line-mid']}`} />
          <hr className={`${styles['ani-bg-line']} ${styles['line-bottom']}`} />
        </div>
        <div className={styles['marquee-con']}>
          <Marquee speed={100} gradient={false} className={styles.marquee}>
            Front-End{' '}
            <span style={{ marginLeft: 120, marginRight: 160 }}>Developer</span>
          </Marquee>
          <Marquee
            speed={100}
            gradient={false}
            direction="right"
            className={styles.marquee}
          >
            Website<span style={{ marginLeft: 100 }}>Designer</span>
          </Marquee>
        </div>
        <div className={styles['logo-section']}>
          <img
            className={styles.logo}
            alt="favicon"
            src="https://res.cloudinary.com/cla/image/upload/v1646460171/Portfolio/favicon_hcp9q9.svg"
          />
        </div>
      </Box>
      <Box className={styles['container-sm']}>
        <div className={styles['logo-section']}>
          <img
            className={styles.logo}
            alt="favicon"
            src="https://res.cloudinary.com/cla/image/upload/v1646460171/Portfolio/favicon_hcp9q9.svg"
          />
        </div>
        <div className={styles['ani-container']}>
          <hr className={`${styles['ani-bg-line']} ${styles['line-top']}`} />
          <Marquee speed={100} gradient={false} className={styles.marquee}>
            Front-End{' '}
            <span style={{ marginLeft: 60, marginRight: 80 }}>Developer</span>
            Website{' '}
            <span style={{ marginLeft: 60, marginRight: 80 }}>Designer</span>
          </Marquee>
          <hr className={`${styles['ani-bg-line']} ${styles['line-bottom']}`} />
        </div>
      </Box>
      <div
        className={styles['chevron-container']}
        onClick={handleScrollDown}
        onKeyDown={handleScrollDown}
        role="button"
        tabIndex={0}
        style={{ width: 50, height: 50 }}
      >
        <div className={styles.chevron} />
        <div className={styles.chevron} />
        <div className={styles.chevron} />
      </div>
    </section>
  );
}

export default Home;
