import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light blue for dark mode
    },
    secondary: {
      main: "#f48fb1", // Pink for dark mode
    },
    background: {
      default: "#121212",
    },
  },
  typography: {
    fontFamily: "SUSE, sans-serif",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Default blue for light mode
    },
    secondary: {
      main: "#d32f2f", // Default red for light mode
    },
    background: {
      default: "#f0f0f0",
    },
  },
  typography: {
    fontFamily: "SUSE, sans-serif",
  },
});
