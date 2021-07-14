import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#e0fcff',
      dark: '#2caeba',
    },
    secondary: {
      main: '#f1f5f8',
    },
    background: {
      primary: '#e0fcff',
      secondary: '#f1f5f8',
      default: '#fff',
    },
    text: {
      main: '#102a42',
      hover: '#2caeba',
    },
  },
});
