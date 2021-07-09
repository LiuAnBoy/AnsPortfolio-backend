import React from "react";
import Home from "../components/sections/home";
import Experience from "../components/sections/experience";
import Project from "../components/sections/projects";
import Helmet from "../components/shared/helmet";

const HomePage = () => (
  <>
    <Helmet subtitle="Home" siteTitle="Home" />
    <Home />
    <Experience />
    <Project />
  </>
);

export default HomePage;
