import React from 'react';
import Container from '@mui/material/Container';

import Layout from '../presentation/components/Layout';
import Profile from '../presentation/components/About/Profile';

import styles from '../styles/pages/About.module.scss';
import Helmet from '../presentation/components/Helmet';

function About() {
  return (
    <section className={styles.layout}>
      <Helmet
        subtitle="About Me"
        siteDescription="走上前端工程師這一條路其實也是一件意想不到的事情。從大學畢業專題負責網頁部分開始就對網頁產生興趣。"
      />
      <Container maxWidth="md">
        <Profile />
      </Container>
    </section>
  );
}

About.layout = Layout;

export default About;
