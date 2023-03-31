import { Box, styled, Backdrop, Typography } from "@mui/material";

namespace S {
  export const FarmersDetailsContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    [theme.breakpoints.down("lg")]: {
      gap: "1.5rem",
    },
    [theme.breakpoints.down("md")]: {
      gap: "1rem",
    },
  }));

  export const InvisibleBox = styled(Box)(() => ({
    display: "none",
  }));

  export const CircularLoaderContainer = styled(Backdrop)(() => ({
    color: "#fff",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    ".MuiBox-root": {
      zIndex: "3",
      //backgroundColor: "white",
      borderRadius: "50%",
    },
  }));

  export const NoDataFound = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  }));
}

export default S;
