import { createTheme } from '@mui/material/styles';
import colorTheme from './color';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      // main: '#23A5B0',
      main: colorTheme.palette.primary.main,
    },
    secondary: {
      main: colorTheme.palette.secondary.main,
    },
    background: {
      light: colorTheme.palette.background.light,
      dark: colorTheme.palette.background.dark,
      nav: colorTheme.palette.background.nav,
      footer: colorTheme.palette.background.footer,
      default: colorTheme.palette.background.default,
    },
    // error: {
    //   main: red.A400,
    // },
    text: {
      main: colorTheme.palette.text.main,
      primary: colorTheme.palette.text.primary,
      secondary: colorTheme.palette.text.secondary,
    },
    button: {
      main: colorTheme.palette.button.main,
      hover: colorTheme.palette.button.hover,
    },
  },
  typography: {
    fontFamily: "'neue-haas-grotesk-display', sans-serif",
    h2: {
      letterSpacing: '2px',
      fontWeight: 500,
      fontSize: '60px',
      lineHeight: 1.2,
    },
    subtitle1: {
      letterSpacing: '1px',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: 1.75,
      marginBottom: 12,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: '#fff',
            backgroundColor: colorTheme.palette.button.main,
            boxShadow: '0 1px 3px rgb(0 0 0 / 20%)',
            ':hover': {
              backgroundColor: colorTheme.palette.button.hover,
              boxShadow: '0 2px 5px rgb(0 0 0 / 20%)',
            },
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'title' },
          style: {
            width: '100%',
            color: colorTheme.palette.text.main,
            fontStyle: 'italic',
            fontSize: 48,
            fontWeight: 500,
            display: 'block',
            textAlign: 'center',
            position: 'relative',
            marginBottom: 60,
            letterSpacing: 2,
            ':after': {
              content: '""',
              display: 'block',
              border: `2.5px solid #53ADD1`,
              width: '100px',
              position: 'absolute',
              left: 'calc(50% - 50px)',
            },
            [colorTheme.breakpoints.down('sm')]: {
              fontSize: 42,
            },
          },
        },
      ],
    },
    MuiDivider: {
      variants: [
        {
          props: { textAlign: 'left' },
          style: {
            '&::before, &::after': {
              borderColor: '#1c1c20',
            },
          },
        },
        {
          props: { orientation: 'horizontal' },
          style: {
            // margin: '16px 0',
            borderColor: '#1c1c20',
          },
        },
        {
          props: { orientation: 'vertical' },
          style: {
            // margin: '16px 0',
            borderColor: '#1c1c20',
          },
        },
      ],
    },
  },
});

export default theme;
