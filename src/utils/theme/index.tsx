import { createTheme, Theme } from "@mui/material";

export const LightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#306F54",
      light: "#1A9035",
    },
    secondary: {
      main: "rgba(69, 181, 73, 0.1)",
    },
    text: {
      primary: "#1A9035",
      primaryLight: "#57AB90",
      primaryDark: "#306F54",
      secondary: "#777777",
      secondaryLight: "#A4A4A4"
    },
    warning: {
      main: "#FDCA17"
    },
    custom: {
      backgroundLight: "#DEEFE9",
      backgroundDark: "#C1E1D6",
      backdrop: "rgba(222, 239, 233, .5)",
    }
  },
  typography: {
    fontFamily: "'Poppins', 'sans-serif'",
  },
});
