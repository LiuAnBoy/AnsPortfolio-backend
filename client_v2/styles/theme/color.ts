import { createTheme } from '@mui/material';

// Create Color theme
const colorTheme = createTheme({
  palette: {
    primary: {
      // main: '#23A5B0',
      main: '#2caeba',
    },
    secondary: {
      main: '#DFFCFE',
    },
    background: {
      light: '#DFFCFE',
      dark: '#C6FAFF',
      nav: '#f8f9f9',
      footer: '#222',
      default: '#fff',
    },
    // error: {
    //   main: red.A400,
    // },
    text: {
      main: '#102A42',
    },
  },
});

export default colorTheme;
