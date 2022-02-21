import React from 'react';

import Helmet from '../components/shared/Helmet';
import Home from '../components/home';
import Experience from '../components/experience';
import Project from '../components/projects';

function HomePage() {
  return (
    <>
      <Helmet subtitle="Home" siteTitle="Home" />
      <Home />
      <Experience />
      <Project />
    </>
  );
}

export default HomePage;
