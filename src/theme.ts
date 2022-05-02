import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      dark: '#1A374D',
      light: '#B1D0E0',
      main: '#406882',
      contrastText: '#FFFFFF',
    },
    secondary: {
      dark: '#9488ae',
      light: '#c7bbe1',
      main: '#BAABDA',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#C65D7B',
      dark: '#874356',
      light: '#F6E7D8',
      contrastText: '#FFFFFF',
    },
  },
});

export default theme;
