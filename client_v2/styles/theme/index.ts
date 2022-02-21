import { createTheme } from '@mui/material/styles';
import colorTheme from './color';
import { red } from '@mui/material/colors';

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
    },
  },
  typography: {
    fontFamily: 'Roboto',
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
            color: '#bff8fd',
            boxShadow: '0 1px 3px rgb(0 0 0 / 20%)',
            ':hover': {
              color: colorTheme.palette.text.main,
              backgroundColor: '#88ebf2',
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
            fontSize: 48,
            fontWeight: 500,
            display: 'block',
            textAlign: 'center',
            position: 'relative',
            marginBottom: 60,
            letterSpacing: 1.2,
            ':after': {
              content: '""',
              display: 'block',
              border: `2.5px solid ${colorTheme.palette.primary.main}`,
              width: '120px',
              position: 'absolute',
              alignSelf: 'center',
              left: 'calc(50% - 60px)',
            },
            [colorTheme.breakpoints.down('sm')]: {
              fontSize: 42,
            },
          },
        },
      ],
    },
  },
});

export default theme;
