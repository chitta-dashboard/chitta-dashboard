import { Box, Dialog, styled } from "@mui/material";

namespace S {
  export const FarmersDetailsContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    [theme.breakpoints.down("md")]: {
      gap: "1.5rem",
    },
    [theme.breakpoints.down("md")]: {
      gap: "1rem",
    },
  }));

  export const InvisibleBox = styled(Box)(() => ({
    display: "none",
  }));

  export const CircularLoaderContainer = styled(Dialog)(({ theme }) => ({
    ".MuiBackdrop-root": {
      // backgroundColor: "lightgreen",
    },
    ".MuiPaper-root": {
      backgroundColor: theme.palette.bg.light,
      borderRadius: "50%",
    },
  }));
}

export default S;
