import { styled, Box } from "@mui/material";
import { Theme } from "@mui/material";

namespace S {
  export const Layout = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "grid",
    gridAutoRows: "auto 1fr auto",
    backgroundColor: theme.palette.custom.backgroundLight,
    height: "100vh",
    width: "100%",
    position: "fixed",
    overflow: "hidden",

    // "div, table, ul, ol": {
    //   "&::-webkit-scrollbar": {
    //     width: "5px",
    //     backgroundColor: "#F5F5F5",
    //     borderRadius: "10px",
    //   },

    //   "&::-webkit-scrollbar-thumb": {
    //     borderRadius: "10px",
    //     backgroundColor: theme.palette.primary.light,
    //     height: "20px",
    //   },
    // },
  }));
}

export default S;
