import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// import Link from '../src/Link';
// import ProTip from '../src/ProTip';
// import Copyright from '../src/Copyright';
import Layout from '../presentation/components/Layout';

function About() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        123
      </Box>
    </Container>
  );
}

About.layout = Layout;

export default About;
