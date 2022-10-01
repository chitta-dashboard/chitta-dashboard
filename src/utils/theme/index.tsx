import { createTheme, Theme } from "@mui/material";

export const LightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#306F54",
      light: "#1A9035",
    },
    text: {
      primary: "#1A9035",
      primaryDark: "#306F54",
      secondary: "#686868",
      secondaryLight: "#777777",
      secondaryDark: "#1E1E1E",
    },
    warning: {
      main: "#FDCA17",
    },
    custom: {
      backgroundLight: "#DEEFE9",
      backgroundDark: "#C1E1D6",
      backdrop: "#deefe97f",
    },
    shadeOpacity: ".8",
  },
  typography: {
    fontFamily: "'Poppins', 'sans-serif'",
  },
  shape: {
    containerRadius: "20px",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        textPrimary: {
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
