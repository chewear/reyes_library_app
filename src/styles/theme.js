import { createTheme } from '@mui/material/styles';

const libraryColors = {
  brown: {
    light: '#D4BEA7',
    main: '#8B6B4E',
    dark: '#3E2E1E',
  },
  red: {
    light: '#D4726A',
    main: '#A13F36',
    dark: '#782E27',
  },
  neutral: {
    light: '#F5EDE4',
    main: '#E6D5C7',
    dark: '#2C1810',
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: libraryColors.brown.main,
      light: libraryColors.brown.light,
      dark: libraryColors.brown.dark,
    },
    secondary: {
      main: libraryColors.red.main,
      light: libraryColors.red.light,
      dark: libraryColors.red.dark,
    },
    background: {
      default: libraryColors.neutral.light,
      paper: '#FFFFFF',
    },
    text: {
      primary: libraryColors.neutral.dark,
      secondary: libraryColors.brown.dark,
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: libraryColors.brown.light,
      light: '#E8D8C7',
      dark: libraryColors.brown.main,
    },
    secondary: {
      main: libraryColors.red.light,
      light: '#E8938C',
      dark: libraryColors.red.main,
    },
    background: {
      default: libraryColors.neutral.dark,
      paper: '#3E2E1E',
    },
    text: {
      primary: libraryColors.neutral.light,
      secondary: libraryColors.brown.light,
    },
  },
  typography: lightTheme.typography,
  components: lightTheme.components,
});