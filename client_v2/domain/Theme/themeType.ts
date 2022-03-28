import '@mui/material/Typography';
import '@mui/material/Fab';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}

declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    fab: true;
  }
}
