import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../../../styles/components/Home.module.scss';

function Home() {
  return (
    <section className={styles.home_section}>
      <Container maxWidth="md" className={styles.home_container}>
        <div>
          <hr />
          <Typography variant="h2">Hi, I&apos;m Eric</Typography>
          <Typography variant="subtitle1">
            Freelance Front-End Developer and UI/UX Designer.
          </Typography>
          <Button variant="contained">Contact Me</Button>
        </div>
      </Container>
    </section>
  );
}

export default Home;
