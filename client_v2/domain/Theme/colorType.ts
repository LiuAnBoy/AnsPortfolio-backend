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

  interface TypeButton {
    hover?: string;
    main?: string;
    text?: string;
  }

  interface Palette {
    button: TypeButton;
    fab: Palette['primary'];
  }

  interface PaletteOptions {
    button?: Partial<TypeButton>;
    fab?: PaletteOptions['primary'];
  }
}
