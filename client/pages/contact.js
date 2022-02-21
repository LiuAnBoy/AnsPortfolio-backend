import React from 'react';
import styled from 'styled-components';

import Title from '../components/shared/Title';
import ContactForm from '../components/layout/contactForm';
import Helmet from '../components/shared/Helmet';

const RootStyled = styled.div`
  width: 100vw;
  max-width: 100%;
  height: calc(100vh - 248px);
  padding: 120px 0 60px;
  background-color: #e0fcff;
  @media (max-width: 500px) {
    padding: 120px 0 30px;
    height: initial;
  }
`;

const Contact = () => {
  return (
    <>
      <Helmet subtitle="Contact Me" siteTitle="Contact Me" siteURL="contact" />
      <RootStyled>
        <Title title="Contact Me" />
        <ContactForm />
      </RootStyled>
    </>
  );
};

export default Contact;
