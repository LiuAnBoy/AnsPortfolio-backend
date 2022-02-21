import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Title from '../components/shared/Title';
import ProjectShowSection from '../components/layout/ProjectShowSection';
import { loadProjects } from '../store/actions/project';
import Helmet from '../components/shared/Helmet';

const RootStyled = styled.div`
  width: 100vw;
  max-width: 100%;
  padding: 120px 0 60px;
  background-color: #e0fcff;
  @media (max-width: 768px) {
    padding: 120px 0 30px;
    height: initial;
  }
`;

const ProjectsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadProjects(dispatch);
  }, [dispatch]);

  const projects = useSelector((state) => state.projects);

  return (
    <>
      <Helmet subtitle="Projects" siteTitle="Projects" siteURL="projects" />
      <RootStyled>
        <Title title="Projects" />
        <ProjectShowSection projects={projects} />
      </RootStyled>
    </>
  );
};

export default ProjectsPage;
