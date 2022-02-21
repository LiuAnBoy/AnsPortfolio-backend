import '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    light: string;
    dark: string;
    nav: string;
    footer: string;
  }

  interface TypeText {
    main: string;
  }
}
