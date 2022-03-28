import { createTheme } from '@mui/material';

// Create Color theme
const colorTheme = createTheme({
  palette: {
    primary: {
      main: '#1c1c20',
    },
    secondary: {
      main: '#3F3A40',
    },
    background: {
      light: '#F6F5F4',
      dark: '#1c1c20',
      nav: '#1c1c20',
      footer: '#1c1c20',
      default: '#fff',
    },
    text: {
      main: '#102A42',
      primary: '#102A42',
      secondary: '#102A42',
    },
    button: {
      main: '#1c1c20',
      hover: '#2b6cee',
    },
    fab: {
      main: '#00b0ff',
      dark: '#ffa726',
      light: '#66bb6a',
      contrastText: '#d32f2f',
    },
  },
});

export default colorTheme;
