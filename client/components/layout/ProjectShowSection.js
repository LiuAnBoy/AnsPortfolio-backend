import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ProjectCard from '../shared/ProjectCard';

const RootStyled = styled.div`
  width: 1920px;
  display: flex;
  padding: 0;
  margin: auto;
  padding: 0 0 60px;
  @media (max-width: 1440px) {
    width: 1280px;
  }
  @media (max-width: 1024px) {
    width: 100vw;
  }

  .projects-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    padding: 0 20px;
    margin: 45px auto 30px;
    width: 100%;
    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  .projects-skeleton {
    background-color: #dae2ec;
    height: 400px;

    @media (max-width: 1440px) {
      height: 320px;
    }
    @media (max-width: 1024px) {
      height: 240px;
    }
  }
`;

const ProjectShowSection = ({ projects }) => {
  return (
    <RootStyled>
      <div className="projects-container">
        {projects.loading
          ? Array.from(new Array(9)).map(() => (
              <Skeleton className="projects-skeleton" variant="rect" />
            ))
          : projects.payload.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.name}
                img={project.image}
                company={project.company}
              />
            ))}
      </div>
    </RootStyled>
  );
};

ProjectShowSection.propTypes = {
  projects: PropTypes.object.isRequired,
};

export default ProjectShowSection;
