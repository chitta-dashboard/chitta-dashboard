import { Box, styled } from "@mui/material";

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
}

export default S;
