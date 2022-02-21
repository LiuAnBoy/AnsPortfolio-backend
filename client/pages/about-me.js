import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import { theme } from '../styles/theme';
import Title from '../components/shared/Title';
import { loadProfile } from '../store/actions/profile';
import Helmet from '../components/shared/Helmet';
import Tag from '../components/shared/Tag';
import SocialLink from '../components/shared/SocialLink';
import AboutMeSkeleton from '../components/skeleton/AboutMeSkeleton';

const RootStyled = styled.div`
  width: 100vw;
  max-width: 100%;
  height: calc(100vh - 248px);
  padding: 120px 0 60px;
  background-color: #e0fcff;
  @media (max-width: 768px) {
    padding: 120px 0 30px;
    height: initial;
  }

  .about-container {
    width: 1200px;
    height: 500px;
    margin: 60px auto 0;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    padding: 10px 0;
    @media (max-width: 1024px) {
      width: 100vw;
      height: initial;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      width: 80vw;
      margin: 0 auto;
    }
  }

  .about-avatar-section {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 32px 0;
    @media (max-width: 768px) {
      width: 100%;
      padding: 0;
    }
    @media (max-width: 500px) {
      width: 80vw;
    }
  }

  .about-avatar {
    width: 100%;
    @media (max-width: 768px) {
      width: 60%;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
  }

  .about-info-section {
    width: 60%;
    padding: 32px 48px;
    height: 100%;
    @media (max-width: 768px) {
      width: 100%;
      padding: 0;
      & > div {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .about-info-name {
    font-weight: 500;
    letter-spacing: 1.2px;
    color: ${theme.palette.text.main};
    font-family: 'Roboto', sans-serif;
    margin-bottom: 8px;
    @media (max-width: 768px) {
      text-align: center;
      margin-bottom: 18px;
    }
  }

  .about-info-description {
    margin: 24px 0;
    font-size: 18px;
    letter-spacing: 1.4px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  .about-skills-title {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .about-skills-group > div {
    @media (max-width: 768px) {
      margin-bottom: 8px;
    }
  }
`;

const About = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    loadProfile(dispatch);
  }, [dispatch]);

  return (
    <>
      <Helmet
        subtitle="About Me"
        siteTitle="About Me"
        siteURL="about-me"
        siteImage="https://res.cloudinary.com/cla/image/upload/v1625750851/Portfolio/AN/hero-img-2_gj6mkz.png"
        siteDescription="我是一名熱愛學習新技術的前端工程師，透過幾個案子的經驗累積，學到了React, Vue, Python等程式語言，也透過觀看大量網站和學習Ai, PS等設計出符合客戶風格需求的網站。"
      />
      <RootStyled>
        <Title title="About Me" />
        {profile.loading ? (
          <AboutMeSkeleton />
        ) : (
          <div className="about-container">
            <div className="about-avatar-section">
              <img
                src={profile.payload.avatar}
                className="about-avatar"
                alt={profile.payload.name}
              />
            </div>
            <div className="about-info-section">
              <Typography variant="h2" className="about-info-name">
                {profile.payload.name}
              </Typography>
              <Tag text="freelancer" />
              <Typography variant="body1" className="about-info-description">
                {profile.payload.description}
              </Typography>
              <Typography variant="subtitle1" className="about-skills-title">
                SKILLS：
              </Typography>
              <div className="about-skills-group">
                {profile.payload.skills.map((skill) => (
                  <Tag key={skill} text={skill} />
                ))}
              </div>
              <SocialLink Line />
            </div>
          </div>
        )}
      </RootStyled>
    </>
  );
};

export default About;
