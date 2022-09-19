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
      secondary: "#686868",
      secondaryLight: "#777777",
      secondaryExtraLight: "#A4A4A4",
      secondaryDark: "#1E1E1E",
    },
    warning: {
      main: "#FDCA17",
    },
    custom: {
      backgroundLight: "#DEEFE9",
      backgroundDark: "#C1E1D6",
      backdrop: "rgba(222, 239, 233, .5)",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'sans-serif'",
  },
  shape: {
    borderRadius: "4px",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A9035",
          color: "white",
          textTransform: "capitalize",
          padding: ".4rem 1.2rem",
          borderRadius: "10px",
          whiteSpace: "nowrap",

          "&:hover": {
            backgroundColor: "#57ab5b",
          },
        },
      },
    },
  },
});
