import { createTheme } from '@mui/material'
import { Theme } from '../../types'

export const LightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#306F54",
      light: "#1A9035",
    },
    common: {
      white: "#FCFCFC",
      black: "#777777",
    },
    secondary: {
      main: "rgba(69, 181, 73, 0.1)",
    },
    text: {
      primary: "#1A9035",
      secondary: "#777777",
    },
  },
});
